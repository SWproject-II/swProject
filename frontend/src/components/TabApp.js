import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "./Table";
import AboutUsPage from "./About";
import LoanReturn from "./LoanReturn";

const TabApp = () => {
  const [tab, setTab] = useState("Home");

  const handleChange = (_, value) => {
    setTab(value);
  };
  return (
    <div>
      <Tabs value={tab} onChange={handleChange}>
        <Tab value="Home" label="Home" />
        <Tab value="Reservations" label="Reservations" />
        <Tab value="AboutUs" label="About" />
      </Tabs>
      {tab === "Home" && <LoanReturn />}
      {tab === "Reservations" && <Table />}
      {tab === "AboutUs" && <AboutUsPage />}
    </div>
  );
};

export default TabApp;
