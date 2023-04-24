import React from "react";
import { Button }  from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";

const LoanReturn = () => {

  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    console.log("TÄSSÄ ON IMAGE "  + capturedImage)
    event.preventDefault();
    console.log("MOI")
    const formData = new FormData();
    formData.append("image", capturedImage);

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

  const handleLoan = async () => {
    if (showWebcam) {
      const newScreenshot = webcamRef.current.getScreenshot();
      setScreenshot(newScreenshot);
      setShowWebcam(false);
       setCapturedImage(newScreenshot);
      //  handleSubmit();
    }else {
      setShowWebcam(true);
      setScreenshot(null); // reset the screenshot when the camera is opened again
    }
  };

  const handleReturn = () => {
    setShowWebcam(false);

  }


  return (
    <div>
      <h1>Loan or return a board game</h1>
      <p>
        You can loan a board game here or return one. 
      </p>

      {showWebcam && <Webcam audio={false} ref={webcamRef} />}
      {screenshot && (
        <img src={screenshot} alt="screenshot" style={{ maxWidth: "100%" }} />
      )}

      <Button variant="contained" color="success" onClick={handleLoan}>
        {showWebcam ? "Take Picture" : "Loan"}
      </Button>
      {/* <Button variant="contained" color="error" onPress={handleReturn}>Return</Button> */}
      <Button variant="contained" color="success" onClick={handleSubmit}> SEND</Button>
      {result && (
        <ul>
          {result.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LoanReturn;