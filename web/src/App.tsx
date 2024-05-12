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
        <Router>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/recommend" element={<RecommendPage/>}/>
          </Routes>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
