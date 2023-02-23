import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {ArtistAlbumsType} from "../../types";
import {getArtistAlbums} from "./albumsThunks";

interface AlbumsState {
  albums: ArtistAlbumsType | null;
  albumsLoading: boolean;
  albumsError: boolean;
}

const initialState: AlbumsState = {
  albums: null,
  albumsLoading: false,
  albumsError: false
};

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtistAlbums.pending, (state) => {
      state.albumsLoading = true;
      state.albumsError = false;
    }).addCase(getArtistAlbums.fulfilled, (state, {payload: data}) => {
      state.albums = data;
      state.albumsLoading = false;
    }).addCase(getArtistAlbums.rejected, (state) => {
      state.albumsLoading = false;
      state.albumsError = true;
    })
  }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;