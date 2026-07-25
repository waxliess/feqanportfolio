import { useState, useEffect } from "react";
import { DiscordUser, SpotifyData } from "../types";

const DISCORD_ID = import.meta.env.VITE_discord_id;

const DEFAULT_BADGES = [
  { id: 'nitro' },
  { id: 'active_developer' },
  { id: 'verified_developer' },
];

// Lanyard'ın döndürdüğü ham "spotify" objesini bizim SpotifyData tipimize çeviriyoruz.
// Discord hesabı Spotify'a bağlı değilse veya şu an bir şey çalmıyorsa Lanyard bu alanı
// null döndürür; biz de bunu "isPlaying: false" olarak ele alıyoruz.
const parseSpotify = (raw: any): SpotifyData => {
  if (!raw) {
    return { isPlaying: false };
  }

  return {
    isPlaying: true,
    trackId: raw.track_id,
    songName: raw.song,
    artistName: raw.artist,
    albumName: raw.album,
    albumArt: raw.album_art_url,
    songUrl: raw.track_id ? `https://open.spotify.com/track/${raw.track_id}` : undefined,
    startTimestamp: raw.timestamps?.start,
    endTimestamp: raw.timestamps?.end,
  };
};

export const useLanyard = () => {
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({ isPlaying: false });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerFromDiscordLookup = async () => {
      try {
        const response = await fetch(
          `https://discordlookup.mesalytic.moe/v1/user/${DISCORD_ID}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch banner from discordlookup: ${response.statusText}`
          );
        }

        const data = await response.json();
        return data.banner?.link || null;
      } catch (err) {
        return null;
      }
    };

    const fetchLanyardData = async () => {
      try {
        const [lanyardResponse, bannerUrl] = await Promise.all([
          fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`),
          fetchBannerFromDiscordLookup(),
        ]);

        if (!lanyardResponse.ok) {
          throw new Error(
            `Failed to fetch Discord data from Lanyard: ${lanyardResponse.statusText}`
          );
        }

        const lanyardData = await lanyardResponse.json();

        if (lanyardData.success) {
          const user = lanyardData.data.discord_user;
          setDiscordUser({
            username: user.username || "Bilinmeyen Kullanıcı",
            discriminator: user.discriminator || "0",
            id: user.id,
            avatar: user.avatar || null,
            banner_url: bannerUrl,
            about:
              lanyardData.data.activities?.find((a: any) => a.type === 4)?.state ||
              null,
            status: lanyardData.data.discord_status || "offline",
            activities:
              lanyardData.data.activities?.map((activity: any) => ({
                type: activity.type,
                name: activity.name,
                details: activity.details || null,
                state: activity.state || null,
                timestamps: activity.timestamps || null,
                assets: activity.assets || null,
              })) || [],
            badges: DEFAULT_BADGES,
          });

          setSpotifyData(parseSpotify(lanyardData.data.spotify));
        } else {
          throw new Error("Lanyard API returned unsuccessful response");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchLanyardData();

    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    let heartbeatInterval: ReturnType<typeof setInterval> | null = null;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_ids: [DISCORD_ID],
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.op === 1) {
        const interval = data.d.heartbeat_interval;
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        heartbeatInterval = setInterval(() => {
          ws.send(
            JSON.stringify({
              op: 3,
            })
          );
        }, interval);
      }

      if (
        data.op === 0 &&
        data.t === "PRESENCE_UPDATE" &&
        data.d.user_id === DISCORD_ID
      ) {
        const user = data.d.discord_user;
        setDiscordUser((prev) => ({
          username: user.username || prev?.username || "Bilinmeyen Kullanıcı",
          discriminator: user.discriminator || prev?.discriminator || "0",
          id: user.id || prev?.id,
          avatar: user.avatar || prev?.avatar || null,
          banner_url: prev?.banner_url || null,
          about:
            data.d.activities?.find((a: any) => a.type === 4)?.state || prev?.about || null,
          status: data.d.discord_status || "offline",
          activities:
            data.d.activities?.map((activity: any) => ({
              type: activity.type,
              name: activity.name,
              details: activity.details || null,
              state: activity.state || null,
              timestamps: activity.timestamps || null,
              assets: activity.assets || null,
            })) || [],
          badges: prev?.badges || DEFAULT_BADGES,
        }));

        setSpotifyData(parseSpotify(data.d.spotify));
      }
    };

    ws.onerror = () => {
      setError("WebSocket connection error");
    };

    ws.onclose = () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    };

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      ws.close();
    };
  }, []);

  return { discordUser, spotifyData, loading, error };
};
