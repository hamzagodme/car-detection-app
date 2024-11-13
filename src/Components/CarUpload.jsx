import React, { useState } from "react";
import "./CarUpload.css";

const CarUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/analyze-car", {
        method: "POST",
        body: file,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="upload-card">
        <h1>Car Image Analyzer</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit">Analyze Image</button>
        </form>
        {result && (
          <div className="result-container">
            <h2>Analysis Result:</h2>
            <p>
              <strong>Type:</strong> {result.type}
            </p>
            <p>
              <strong>Brand:</strong> {result.brand}
            </p>
            <p>
              <strong>Model:</strong> {result.model}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarUpload;
