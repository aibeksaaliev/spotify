import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {TrackHistoryType} from "../../types";
import {getTrackHistory} from "./trackHistoryThunks";

interface TrackHistoryState {
  history: TrackHistoryType[];
  historyLoading: boolean;
  historyError: boolean;
}

const initialState: TrackHistoryState = {
  history: [],
  historyLoading: false,
  historyError: false,
};

export const TrackHistorySlice = createSlice({
  name: "trackHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrackHistory.pending, (state) => {
      state.historyLoading = true;
      state.historyError = false;
    }).addCase(getTrackHistory.fulfilled, (state, {payload: data}) => {
      state.history = data;
      state.historyLoading = false;
    }).addCase(getTrackHistory.rejected, (state) => {
      state.historyLoading = false;
      state.historyError = true;
    })
  }
});

export const trackHistoryReducer = TrackHistorySlice.reducer;
export const selectTrackHistory = (state: RootState) => state.trackHistory.history;
export const selectTrackHistoryLoading = (state: RootState) => state.trackHistory.historyLoading;