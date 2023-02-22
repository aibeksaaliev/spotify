import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {ArtistType} from "../../types";
import {getArtists} from "./artistsThunks";

interface ArtistsState {
  artists: ArtistType[];
  artistsLoading: boolean;
  artistsError: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsLoading: false,
  artistsError: false
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.artistsLoading = true;
      state.artistsError = false;
    }).addCase(getArtists.fulfilled, (state, {payload: data}) => {
      state.artistsLoading = false;
      state.artists = data;
    }).addCase(getArtists.rejected, (state) => {
      state.artistsLoading = false;
      state.artistsError = true;
    })
  }
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) => state.artists.artistsLoading;