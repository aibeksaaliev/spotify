import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ArtistAlbumsType} from "../../types";

export const getArtistAlbums = createAsyncThunk<ArtistAlbumsType, string>(
  'albums/fetchAlbumsById',
  async (id) => {
    const response = await axiosApi.get<ArtistAlbumsType>('/albums?artist=' + id);
    return response.data;
  }
);