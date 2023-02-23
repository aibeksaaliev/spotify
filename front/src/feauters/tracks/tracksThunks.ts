import {createAsyncThunk} from "@reduxjs/toolkit";
import {TrackType} from "../../types";
import axiosApi from "../../axiosApi";

export const getAlbumTracks = createAsyncThunk<TrackType[], string>(
  "tracks/fetchTracksByAlbumId",
  async (id) => {
    const response = await axiosApi.get<TrackType[]>('/tracks?album=' + id);
    return response.data;
  }
);