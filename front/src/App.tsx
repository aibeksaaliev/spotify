import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Artists from "./containers/Artists";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Artists/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
