import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumTracksType} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

export const getAlbumTracks = createAsyncThunk<AlbumTracksType, string>(
  "tracks/fetchTracksByAlbumId",
  async (id) => {
    const response = await axiosApi.get<AlbumTracksType>('/tracks?album=' + id);
    return response.data;
  }
);

export const submitTrackHistory = createAsyncThunk<void, string, {state: RootState}>(
  "tracks/postTrackHistory",
  async (trackID, {getState}) => {
    const user = getState().users.user;

    if (user) {
      return axiosApi.post('/track_history', {track: trackID}, {headers: {"Authorization": user.token}});
    }
  }
);