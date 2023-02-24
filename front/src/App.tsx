import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Artists from "./containers/Artists";
import Albums from "./containers/Albums";
import Tracks from "./containers/Tracks";
import Error from "./components/Error/Error";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Artists/>}/>
          <Route path="/artists/:id" element={<Albums/>}/>
          <Route path="/albums/:id" element={<Tracks/>}/>
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
