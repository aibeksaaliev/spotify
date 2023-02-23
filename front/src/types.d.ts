export interface ArtistType {
  _id: string;
  name: string;
  photo: string;
  info: string;
}

export interface AlbumType {
  _id: string;
  title: string;
  artist: string;
  releaseYear: number;
  cover: string;
  artistName: string;
  tracksAmount: number;
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
}

export interface AlbumTracksType {
  tracks: TrackType [],
  albumInfo: AlbumTypeExtended
}