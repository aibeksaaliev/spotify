export interface Artist {
  id: string;
  name: string;
  photo: string | null;
  info: string | null;
}

export type ArtistWithoutId = Omit<Artist, "id">;

export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseYear: number;
  cover: string | null;
}

export type AlbumWithoutId = Omit<Album, "id">;

export interface Track {
  id: string;
  title: string;
  album: string;
  duration: string | null;
}

export type TrackWithoutId = Omit<Track, "id">;

export interface IUser {
  username: string;
  password: string;
  token: string;
}