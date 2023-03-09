import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {TrackHistoryType} from "../../types";

export const submitTrackHistory = createAsyncThunk<void, string>(
  "tracks/postTrackHistory",
  async (trackID) => {
    await axiosApi.post('/track_history', {track: trackID});
  }
);

export const getTrackHistory = createAsyncThunk<TrackHistoryType[], void>(
  "trackHistory/fetchTrackHistory",
  async () => {
    const response = await axiosApi.get('/track_history');
    return response.data;
  }
);