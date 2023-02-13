export interface Artist {
  id: string;
  name: string;
  photo: string | null;
  info: string | null;
}

export type ArtistWithoutId = Omit<Artist, "id">;