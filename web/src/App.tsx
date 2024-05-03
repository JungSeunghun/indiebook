import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import MainPage from "./pages/Main";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import RecommendPage from "./pages/Recommend";
import { ThemeProvider } from "styled-components";
import { theme } from './style/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
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

          <Routes>
            <Route path="/recommend" element={<RecommendPage/>}/>
          </Routes>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
