import React from "react";
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import WelcomePage from "./WelcomePage";

const LoanReturn = () => {
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [welcomePage, setWelcomePage] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", capturedImage);
    console.log("FORMDATA " + formData);
    setScreenshot(null);
    fetch("http://localhost:5002/auth", {
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
    setWelcomePage(true);
  };

  // Convert base64 image string to file object
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleLoan = async () => {
    if (showWebcam) {
      const newScreenshot = webcamRef.current.getScreenshot();
      setScreenshot(newScreenshot);
      setShowWebcam(false);
      const file = dataURItoBlob(newScreenshot);
      setCapturedImage(file);
      //  handleSubmit();
    } else {
      setShowWebcam(true);
      setScreenshot(null); // reset the screenshot when the camera is opened again
      setCapturedImage(null);
    }
  };

  const handleReturn = () => {
    setShowWebcam(false);
  };

  return (
    <div>
      <h1>Loan or return a board game</h1>
      <p>You can loan a board game here or return one.</p>
      <div>
        {showWebcam && (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        )}
        {screenshot && (
          <img src={screenshot} alt="screenshot" style={{ maxWidth: "100%" }} />
        )}
      </div>
      <div>
        <Button variant="contained" color="success" onClick={handleLoan}>
          {showWebcam ? "Take Picture" : "Authenticate"}
        </Button>
        {/* <Button variant="contained" color="error" onPress={handleReturn}>Return</Button> */}
        <Button
          variant="contained"
          color="success"
          disabled={capturedImage === null}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
      {/* {result && (
        <ul>
          {result.map((name, index) => (
            <li key={index}> Tervetuloa {name}</li>
          ))}
        </ul>
      )} */}
      {welcomePage && <WelcomePage name={result} />}
    </div>
  );
};

export default LoanReturn;
