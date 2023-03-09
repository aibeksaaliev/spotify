import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {ArtistAlbumsType, ValidationError} from "../../types";
import {createAlbum, getArtistAlbums} from "./albumsThunks";

interface AlbumsState {
  albums: ArtistAlbumsType | null;
  albumsLoading: boolean;
  albumsError: boolean;
  albumCreateLoading: boolean;
  albumCreateError: ValidationError | null;
}

const initialState: AlbumsState = {
  albums: null,
  albumsLoading: false,
  albumsError: false,
  albumCreateLoading: false,
  albumCreateError: null
};

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAlbum.pending, (state) => {
      state.albumCreateLoading = true;
      state.albumCreateError = null;
    }).addCase(createAlbum.fulfilled, (state) => {
      state.albumCreateLoading = false;
    }).addCase(createAlbum.rejected, (state, {payload: error}) => {
      state.albumCreateLoading = false;
      state.albumCreateError = error || null;
    });

    builder.addCase(getArtistAlbums.pending, (state) => {
      state.albumsLoading = true;
      state.albumsError = false;
    }).addCase(getArtistAlbums.fulfilled, (state, {payload: data}) => {
      state.albums = data;
      state.albumsLoading = false;
    }).addCase(getArtistAlbums.rejected, (state) => {
      state.albumsLoading = false;
      state.albumsError = true;
    });
  }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;
export const selectAlbumCreateLoading = (state: RootState) => state.albums.albumCreateLoading;
export const selectAlbumCreateError = (state: RootState) => state.albums.albumCreateError;