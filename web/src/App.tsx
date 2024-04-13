import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import MainPage from "./pages/Main";
import SubscribePage from "./pages/SubscribePage";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/subscribe" element={<SubscribePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
