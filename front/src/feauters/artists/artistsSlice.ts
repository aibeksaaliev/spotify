import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {ArtistType, ValidationError} from "../../types";
import {createArtist, deleteArtist, getArtists, publishArtist} from "./artistsThunks";

interface ArtistsState {
  artists: ArtistType[];
  artistsLoading: boolean;
  artistsError: boolean;
  artistCreateLoading: boolean;
  artistCreateError: ValidationError | null;
  artistPublishLoading: boolean;
  artistDeleteLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsLoading: false,
  artistsError: false,
  artistCreateLoading: false,
  artistCreateError: null,
  artistPublishLoading: false,
  artistDeleteLoading: false
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createArtist.pending, (state) => {
      state.artistCreateError = null;
      state.artistCreateLoading = true;
    }).addCase(createArtist.fulfilled, (state) => {
      state.artistCreateLoading = false;
    }).addCase(createArtist.rejected, (state, {payload: error}) => {
      state.artistCreateError = error || null;
      state.artistCreateLoading = false;
    });

    builder.addCase(getArtists.pending, (state) => {
      state.artistsLoading = true;
      state.artistsError = false;
    }).addCase(getArtists.fulfilled, (state, {payload: data}) => {
      state.artistsLoading = false;
      state.artists = data;
    }).addCase(getArtists.rejected, (state) => {
      state.artistsLoading = false;
      state.artistsError = true;
    });

    builder.addCase(publishArtist.pending, (state) => {
      state.artistPublishLoading = true;
    }).addCase(publishArtist.fulfilled, (state) => {
      state.artistPublishLoading = false;
    }).addCase(publishArtist.rejected, (state) => {
      state.artistPublishLoading = false;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.artistDeleteLoading = true;
    }).addCase(deleteArtist.fulfilled, (state) => {
      state.artistDeleteLoading = false;
    }).addCase(deleteArtist.rejected, (state) => {
      state.artistDeleteLoading = false;
    });
  }
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) => state.artists.artistsLoading;
export const selectArtistCreateLoading = (state: RootState) => state.artists.artistCreateLoading;
export const selectArtistCreateError = (state: RootState) => state.artists.artistCreateError;
export const selectArtistPublishLoading = (state: RootState) => state.artists.artistPublishLoading;
export const selectArtistDeleteLoading = (state: RootState) => state.artists.artistDeleteLoading;