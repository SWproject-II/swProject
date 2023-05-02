import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "./Table";
import ImageUploader from "./ImageUploader";
import ContactPage from "./Contact";
import AboutUsPage from "./AboutUs";
import LoanReturn from "./LoanReturn";
import ReservationTable from "./ReservationTable";

export default function TabApp() {
  const [tab, setTab] = useState("Home");

  const handleChange = (_, value) => {
    setTab(value);
  };
  return (
    <div>
      <Tabs value={tab} onChange={handleChange}>
        <Tab value="Home" label="Home" />
        <Tab value="Reservations" label="Reservations" />
        <Tab value="Image" label="Image upload" />
        <Tab value="Contact" label="Contact us" /> {/* Updated value here */}
        <Tab value="AboutUs" label="About us" />
        <Tab value="Res" label="Res" />
      </Tabs>
      {tab === "Home" && <LoanReturn />}
      {tab === "Reservations" && <Table />}
      {tab === "Image" && <ImageUploader />}
      {tab === "Contact" && <ContactPage />}
      {tab === "AboutUs" && <AboutUsPage />}
      {tab === "Res" && <ReservationTable />}
    </div>
  );
}
