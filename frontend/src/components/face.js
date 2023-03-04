import React, { useState, useEffect } from "react";
import { API_getDetection } from "../constants";

export default function Fce() {
  const [detection, setDetection] = useState([]);

  useEffect(() => {
    fetch(API_getDetection)
      .then((response) => response.json())
      .then((data) => setDetection(data.detection))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {detection.map((item, index) => (
        <div key={index}>
          <p>ID: {item[0]}</p>
          <p>Name: {item[1]}</p>
          <p>Age: {item[2]}</p>
          <p>Medicine: {item[3]}</p>
        </div>
      ))}
    </>
  );
}
