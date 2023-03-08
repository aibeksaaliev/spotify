import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ArtistMutation, ArtistType, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const createArtist = createAsyncThunk<void, ArtistMutation, {state: RootState, rejectValue: ValidationError}>(
  'artists/createOne',
  async (artist, {getState, rejectWithValue}) => {
    try {
      const user = getState().users.user;

      if (user) {
        const formData = new FormData();

        const keys = Object.keys(artist) as (keyof ArtistMutation)[];

        keys.forEach(key => {
          const value = artist[key];
          if (value !== null) {
            formData.append(key, value);
          }
        });

        await axiosApi.post('/artists', artist, {headers: {"Authorization": user.token}});
      }
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

