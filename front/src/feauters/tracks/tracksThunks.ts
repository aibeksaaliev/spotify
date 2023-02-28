import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumTracksType} from "../../types";
import axiosApi from "../../axiosApi";

export const getAlbumTracks = createAsyncThunk<AlbumTracksType, string>(
  "tracks/fetchTracksByAlbumId",
  async (id) => {
    const response = await axiosApi.get<AlbumTracksType>('/tracks?album=' + id);
    return response.data;
  }
);