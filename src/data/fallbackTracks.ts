// Spotify şu an bir şey çalmıyorken (isPlaying: false) gösterilecek öneri listesi.
// Gerçek albüm kapağı çekmek ekstra bir API anahtarı gerektireceği için burada
// sadece isim/sanatçı tutuyoruz; link Spotify aramasına gidiyor (gerçek olmayan
// track_id uydurmamak için — yanlış şarkıya yönlendirmemek adına en güvenlisi bu).
export interface FallbackTrack {
  songName: string;
  artistName: string;
}

export const FALLBACK_TR_TRACKS: FallbackTrack[] = [
  { songName: 'Aşk Sana Benzer', artistName: 'Sezen Aksu' },
  { songName: 'Islak Islak', artistName: 'Mabel Matiz' },
  { songName: 'Beni Benimle Bırak', artistName: 'Melek Mosso' },
  { songName: 'Cambaz', artistName: 'Duman' },
  { songName: 'Bu Akşam', artistName: 'Athena' },
  { songName: 'Öp', artistName: 'Tarkan' },
  { songName: 'Aman Aman', artistName: 'Sertab Erener' },
  { songName: 'Sen Ağlama', artistName: 'MFÖ' },
  { songName: 'Zor', artistName: 'Model' },
  { songName: 'Sarhoş Bir Yaz', artistName: 'Simge' },
  { songName: 'Sil Baştan', artistName: 'Teoman' },
  { songName: 'Kolpa', artistName: 'Ceza' },
  { songName: 'Zamane Sevmesi', artistName: 'İlyas Yalçıntaş' },
  { songName: 'Bihaber', artistName: 'Şevval Sam' },
  { songName: 'Adını Sen Koy', artistName: 'Aleyna Tilki' },
];

export const getRandomFallbackTrack = (): FallbackTrack => {
  const index = Math.floor(Math.random() * FALLBACK_TR_TRACKS.length);
  return FALLBACK_TR_TRACKS[index];
};
