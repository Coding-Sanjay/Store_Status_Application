
import React from "react";
import { Route, Routes } from "react-router-dom";
import GoogleMapComponent from "./components/GoogleMapComponent";
import AddStoreForm from "./components/AddStoreForm";
import StoreList from "./components/StoreList";

function App() {
  return (
    <div>
      <h1>Store Management System</h1>
      <Routes>
        <Route path="/" element={<GoogleMapComponent />} />
        <Route path="/add" element={<AddStoreForm />} />
        <Route path="/stores" element={<StoreList />} />
      </Routes>
    </div>
  );
}

export default App;


