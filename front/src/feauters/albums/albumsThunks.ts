import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AlbumType} from "../../types";

export const getArtistAlbums = createAsyncThunk<AlbumType[], string>(
  'albums/fetchAlbumsById',
  async (id) => {
    const response = await axiosApi.get<AlbumType[]>('/albums?artist=' + id);
    return response.data;
  }
);