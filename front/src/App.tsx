import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes, useLocation} from "react-router-dom";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Error from "./components/Error/Error";
import Register from "./containers/Users/Register";
import Login from "./containers/Users/Login";
import TrackHistory from "./containers/TrackHistory";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {clearYouTubeUrl} from "./feauters/tracks/tracksSlice";
import NewArtist from "./containers/Artists/NewArtist";
import NewAlbum from "./containers/Albums/NewAlbum";
import NewTrack from "./containers/Tracks/NewTrack";
import {selectUser} from "./feauters/users/usersSlice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(selectUser);

  if (location.pathname !== "/albums:id") {
    dispatch(clearYouTubeUrl());
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Artists/>}/>
          <Route path="/artists/:id" element={<Albums/>}/>
          <Route path="/add_new_artist" element={(
            <ProtectedRoute isAllowed={!!user}>
              <NewArtist/>
            </ProtectedRoute>
          )}/>
          <Route path="/albums/:id" element={<Tracks/>}/>
          <Route path="/add_new_album" element={(
            <ProtectedRoute isAllowed={!!user}>
              <NewAlbum/>
            </ProtectedRoute>
          )}/>
          <Route path="/add_new_track" element={(
            <ProtectedRoute isAllowed={!!user}>
              <NewTrack/>
            </ProtectedRoute>
          )}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/track_history" element={<TrackHistory/>}/>
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
