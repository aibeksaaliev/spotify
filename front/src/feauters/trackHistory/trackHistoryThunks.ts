import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {TrackHistoryType} from "../../types";

export const submitTrackHistory = createAsyncThunk<void, string, {state: RootState}>(
  "tracks/postTrackHistory",
  async (trackID, {getState}) => {
    const user = getState().users.user;

    if (user) {
      return axiosApi.post('/track_history', {track: trackID}, {headers: {"Authorization": user.token}});
    }
  }
);

export const getTrackHistory = createAsyncThunk<TrackHistoryType[], void, {state: RootState}>(
  "trackHistory/fetchTrackHistory",
  async (_, {getState}) => {
    const user = getState().users.user;

    if (user) {
      const response = await axiosApi.get('/track_history', {headers: {"Authorization": user.token}});
      return response.data;
    }
  }
);