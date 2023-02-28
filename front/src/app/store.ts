import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {artistsReducer} from "../feauters/artists/artistsSlice";
import {albumsReducer} from "../feauters/albums/albumsSlice";
import {tracksReducer} from "../feauters/tracks/tracksSlice";
import {usersReducer} from "../feauters/users/usersSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import {trackHistoryReducer} from "../feauters/trackHistory/trackHistorySlice";

const usersPersistConfig = {
  key: 'shop.users',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: trackHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;