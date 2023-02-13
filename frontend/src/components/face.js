import React, { useState, useEffect } from "react";
import { API_getDetection } from "../constants"; 


export default function Fce() {

    const [detection, setDetection] = useState("");

  useEffect(() => {
    fetch(API_getDetection)
      .then((response) => response.json())
      .then((data) => setDetection(data.detection))
      .catch((error) => console.error(error));
  }, []);

    return(
    <>
    <div> <p>{detection}</p>
    </div></>
    );



}