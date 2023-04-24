import React, { useState, useEffect,  } from "react";
import { Button } from "@mui/material/";

export default function ImageUploader2({ image }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  useEffect(() => {
    if (image) {
      // const formData = new FormData();
      // formData.append("image", dataURLtoFile(image)); // convert the data URL to a file
      setFile(image);
      setFileName("captured-image.jpg"); // set a default filename for the captured image
      console.log("TÄSSÄ ON FILE " + file)
    }
  }, [image]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("MOI")
    const formData = new FormData();
    formData.append("image", file);

    fetch("http://localhost:5002/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data.names);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Upload image for FDFSDFDSSFrecognition</h1>
      {/* <Input type="file" placeholder="Select image" onChange={handleFileChange}>
        Select image
      </Input> */}
      <Button variant="contained" color="info" component="label">
        Select image
        <input type="file" onChange={handleFileChange} hidden />
      </Button>
      <p>Selected file: {fileName}</p>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Upload
      </Button>
      {result && (
        <ul>
          {result.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
