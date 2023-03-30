import "./App.css";
import TabApp from "./components/Tab";
import React from "react";
import ReactDOM from "react-dom";
import ImageUploader from "./components/ImageUploader";

function App() {
  return (
    <div className="App">
      <TabApp />
      <ImageUploader />
    </div>
  );
}

export default App;
