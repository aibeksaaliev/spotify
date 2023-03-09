import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {AlbumTracksType, ValidationError} from "../../types";
import {createTrack, getAlbumTracks} from "./tracksThunks";

interface TracksState {
  tracks: AlbumTracksType | null;
  tracksLoading: boolean;
  tracksError: boolean;
  videoId: string | null;
  trackCreateLoading: boolean;
  trackCreateError: ValidationError | null;
}

const initialState: TracksState = {
  tracks: null,
  tracksLoading: false,
  tracksError: false,
  videoId: null,
  trackCreateLoading: false,
  trackCreateError: null
};

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    getYouTubeUrl: (state, action) => {
      state.videoId = action.payload;
    },
    clearYouTubeUrl: (state) => {
      state.videoId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTrack.pending, (state) => {
      state.trackCreateLoading = true;
      state.trackCreateError = null;
    }).addCase(createTrack.fulfilled, (state) => {
      state.trackCreateLoading = false;
    }).addCase(createTrack.rejected, (state, {payload: error}) => {
      state.trackCreateLoading = false;
      state.trackCreateError = error || null;
    });

    builder.addCase(getAlbumTracks.pending, (state) => {
      state.tracksLoading = true;
      state.tracksError = false;
    }).addCase(getAlbumTracks.fulfilled, (state, {payload: data}) => {
      state.tracks = data;
      state.tracksLoading = false;
    }).addCase(getAlbumTracks.rejected, (state) => {
      state.tracksLoading = false;
      state.tracksError = true;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;
export const {getYouTubeUrl, clearYouTubeUrl} = tracksSlice.actions;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.tracksLoading;
export const selectYouTubeVideoId = (state: RootState) => state.tracks.videoId;
export const selectTrackCreateLoading = (state: RootState) => state.tracks.trackCreateLoading;
export const selectTrackCreateError = (state: RootState) => state.tracks.trackCreateError;