import React, { useState, useEffect } from "react";

const App = () => {
  const [detection, setDetection] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/detection")
      .then((response) => response.json())
      .then((data) => setDetection(data.detection))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>{detection}</h1>
    </div>
  );
};

export default App;
