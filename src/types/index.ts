export interface DiscordActivity {
  type: number;
  name: string;
  details?: string | null;
  state?: string | null;
  timestamps?: {
    start?: number;
    end?: number;
  } | null;
}

export interface DiscordUser {
  username: string;
  discriminator: string;
  id: string;
  avatar: string | null;
  banner_url: string | null;
  about: string | null;
  status: string;
  activities: DiscordActivity[];
  badges: { id: string; name?: string; icon?: string }[];
}

export interface Badge {
  name: string;
  icon: string;
}

export interface Activity {
  name: string;
  type: number;
  state?: string | null;
  details?: string | null;
  timestamps?: {
    start?: number;
    end?: number;
  } | null;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface SpotifyData {
  isPlaying: boolean;
  trackId?: string;
  songName?: string;
  artistName?: string;
  albumName?: string;
  albumArt?: string;
  songUrl?: string;
  /** Şarkının başladığı unix ms zaman damgası (ilerleme çubuğunu canlı hesaplamak için) */
  startTimestamp?: number;
  /** Şarkının biteceği unix ms zaman damgası */
  endTimestamp?: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  private: boolean;
  updated_at: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'other';
}

export type ThemeMode = 'light' | 'dark' | 'system';