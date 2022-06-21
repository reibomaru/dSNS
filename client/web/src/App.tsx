import React from "react";
import { Routes, Route } from "react-router-dom";
import Web3Provider from "./components/contexts/Web3Provider";
import ThemeProvider from "./components/contexts/ThemeProvider";
import Header from "./components/organisms/Header";
import TopPage from "./components/pages/TopPage";
import AccountPage from "./components/pages/AccountPage";

function App() {
  return (
    <Web3Provider>
      <ThemeProvider>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/:accountId" element={<AccountPage />} />
        </Routes>
      </ThemeProvider>
    </Web3Provider>
  );
}

export default App;
