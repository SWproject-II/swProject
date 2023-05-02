import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRef } from "react";
import Webcam from "react-webcam";
import ReturnButton from "./ReturnButton";

const GameReservation = (props) => {
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", capturedImage);
    console.log("FORMDATA " + formData);
    setScreenshot(null);
    fetch("http://localhost:5002/game_auth", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data.game);
      })
      .catch((error) => {
        console.error(error);
      });
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

  const handleCapture = async () => {
    if (showWebcam) {
      const newScreenshot = webcamRef.current.getScreenshot();
      setScreenshot(newScreenshot);
      setShowWebcam(false);
      const file = dataURItoBlob(newScreenshot);
      setCapturedImage(file);
    } else {
      setShowWebcam(true);
      setScreenshot(null); // reset the screenshot when the camera is opened again
      setCapturedImage(null);
    }
  };

  return (
    <div>
      <h1>Game Return</h1>
      <p>Scan the game to return it.</p>
      <div>
        {showWebcam && (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        )}
        {screenshot && (
          <img src={screenshot} alt="screenshot" style={{ maxWidth: "100%" }} />
        )}
      </div>
      <div>
        <Button variant="contained" color="success" onClick={handleCapture}>
          {showWebcam ? "Take Picture" : "Capture Game"}
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={capturedImage === null}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
      {result && (
        <div>
          <h2>Game to be returned: {result} </h2>

          <ReturnButton personName={props.personName} gameName={result} />
          {console.log(props.personName)}
        </div>
      )}
    </div>
  );
};

export default GameReservation;
