import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AlbumMutation, ArtistAlbumsType, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const createAlbum = createAsyncThunk<void, AlbumMutation, {state: RootState, rejectValue: ValidationError}>(
  'albums/createOne',
  async (album, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        const formData = new FormData();

        const keys = Object.keys(album) as (keyof AlbumMutation)[];

        keys.forEach(key => {
          const value = album[key];
          if (value !== null) {
            formData.append(key, value);
          }
        });

        await axiosApi.post('/albums', formData, {headers: {"Authorization": user.token}});
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
)

export const getArtistAlbums = createAsyncThunk<ArtistAlbumsType, string>(
  'albums/fetchAlbumsById',
  async (id) => {
    const response = await axiosApi.get<ArtistAlbumsType>('/albums?artist=' + id);
    return response.data;
  }
);