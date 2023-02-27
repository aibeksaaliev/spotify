import {configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../feauters/artists/artistsSlice";
import {albumsReducer} from "../feauters/albums/albumsSlice";
import {tracksReducer} from "../feauters/tracks/tracksSlice";
import {usersReducer} from "../feauters/users/usersSlice";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: usersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;