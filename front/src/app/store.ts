import {configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../feauters/artists/artistsSlice";

export const store = configureStore({
  reducer: {
    artists: artistsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;