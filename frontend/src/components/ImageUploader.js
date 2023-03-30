import React, { useState } from "react";
import { Button } from "@mui/material/";

export default function ImageUploader(props) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
      <h1>Upload image for recognition</h1>
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
