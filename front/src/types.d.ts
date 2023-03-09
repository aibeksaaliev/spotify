export interface ArtistType {
  _id: string;
  name: string;
  photo: string | null;
  info: string;
}

export interface ArtistMutation {
  name: string;
  photo: File | null;
  info: string;
}

export interface AlbumType {
  _id: string;
  title: string;
  artist: string;
  releaseYear: number;
  cover: string | null;
  artistName: string;
  tracksAmount: number;
}

export interface AlbumMutation {
  title: string;
  artist: string;
  releaseYear: string;
  cover: File | null;
}

export type AlbumTypeExtended = Omit<AlbumType, "artist"> & {artist: ArtistType};

export interface ArtistAlbumsType {
  albums: AlbumType [],
  artist: {
    name: string;
    _id: string;
  };
}


export interface TrackType {
  _id: string;
  title: string;
  album: string;
  duration: string;
  number: number;
  videoId: string | null;
}

export interface TrackMutation {
  title: string;
  album: string;
  duration: string;
  number: string;
}

export interface AlbumTracksType {
  tracks: TrackType [],
  albumInfo: AlbumTypeExtended
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistoryType {
  _id: string;
  track: string;
  album: string;
  artist: string;
  datetime: Date;
}