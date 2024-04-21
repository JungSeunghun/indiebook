import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import MainPage from "./pages/Main";
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta property="og:title" content="글조명" />
        <meta property="og:description" content="글을 조명하다." />
        <meta property="og:image" content="/logo.png" />
      </Helmet>
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
