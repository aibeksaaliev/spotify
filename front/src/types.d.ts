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

}