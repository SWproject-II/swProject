import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Face from "./Face";
import Table from "./Table";
import ImageUploader from "./ImageUploader";
import ContactPage from "./Contact";
import AboutUsPage from "./AboutUs";
import LoanReturn from "./LoanReturn";

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
        <Tab value="Contact" label="Contact us" /> {/* Updated value here */}
        <Tab value="AboutUs" label="About us" />
      </Tabs>
      {tab === "Home" && (
        <div>
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
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {/* Normal text added below */}
            <p>This is some normal text under the homepage text.</p>
          </div>
          <LoanReturn />
        </div>
      )}
      {tab === "Face" && <Face />}
      {tab === "Test" && <Table />}
      {tab === "Image" && <ImageUploader />}
      {tab === "Contact" && <ContactPage />}
      {tab === "AboutUs" && <AboutUsPage />}
    </div>
  );
}