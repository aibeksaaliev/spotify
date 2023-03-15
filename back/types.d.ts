import {ObjectId} from "mongoose";

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
  artist: ObjectId;
  releaseYear: number;
  cover: string | null;
  isPublished: boolean;
  addedBy: ObjectId;
}

export type AlbumWithoutId = Omit<Album, "id">;

export interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  number: number;
  videoId: string;
}

export type TrackWithoutId = Omit<Track, "id">;

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  avatar?: string;
}

export interface ITrackHistory {
  user: ObjectId;
  track: ObjectId;
  datetime: Date;
}