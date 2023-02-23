import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";
import Tracks from "./containers/Tracks";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Artists/>}/>
          <Route path="/artist/:id" element={<Albums/>}/>
          <Route path="/album/:id" element={<Tracks/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
