import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ArtistMutation, ArtistType, ValidationError} from "../../types";
import {isAxiosError} from "axios";

export const createArtist = createAsyncThunk<void, ArtistMutation, {rejectValue: ValidationError}>(
  'artists/createOne',
  async (artist, {rejectWithValue}) => {
    try {
        const formData = new FormData();

        const keys = Object.keys(artist) as (keyof ArtistMutation)[];

        keys.forEach(key => {
          const value = artist[key];
          if (value !== null) {
            formData.append(key, value);
          }
        });

        await axiosApi.post('/artists', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  }
);

export const getArtists = createAsyncThunk<ArtistType[]>(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<ArtistType[]>('/artists');
    return response.data;
  }
);

