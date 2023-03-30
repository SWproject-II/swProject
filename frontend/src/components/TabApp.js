import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Face from "./Face";
import Table from "./Table";
import ImageUploader from "./ImageUploader";

export default function TabApp() {
  const [tab, setTab] = useState("Home");

  const handleChange = (_, value) => {
    setTab(value);
  };
  return (
    <div>
      <Tabs value={tab} onChange={handleChange}>
        <Tab value="Home" label="Home" />
        <Tab value="Face" label="Facial recognition" />
        <Tab value="Test" label="Test data" />
        <Tab value="Image" label="Image upload" />
      </Tabs>
      {tab === "Home" && (
        <div
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: "black",
            height: "80px",
            top: 0,
            fontSize: 40,
          }}
        >
          {" "}
          This is homepage{" "}
        </div>
      )}
      {tab === "Face" && <Face />}
      {tab === "Test" && <Table />}
      {tab === "Image" && <ImageUploader />}
    </div>
  );
}
