import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumTracksType, TrackMutation, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const createTrack = createAsyncThunk<void, TrackMutation, {state: RootState, rejectValue: ValidationError}>(
  "tracks/createOne",
  async (track, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        await axiosApi.post('/tracks', track, {headers: {"Authorization": user.token}});
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
)

export const getAlbumTracks = createAsyncThunk<AlbumTracksType, string>(
  "tracks/fetchTracksByAlbumId",
  async (id) => {
    const response = await axiosApi.get<AlbumTracksType>('/tracks?album=' + id);
    return response.data;
  }
);