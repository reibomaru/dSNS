import React from "react";
import { Routes, Route } from "react-router-dom";
import Web3Provider from "./components/contexts/Web3Provider";
import Header from "./components/organisms/Header";
import TopPage from "./components/pages/TopPage";
import AccountPage from "./components/pages/AccountPage";

function App() {
  return (
    <div className="App">
      <Web3Provider>
        <Header />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/:accountId" element={<AccountPage />} />
        </Routes>
      </Web3Provider>
    </div>
  );
}

export default App;
