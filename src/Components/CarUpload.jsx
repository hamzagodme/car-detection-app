import React, { useState } from "react";
import "./CarUpload.css";

const CarUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Set the selected file
    setResult(null); // Clear previous result

    // Use FileReader to convert file to a data URL
    // This is to display the image on screen after user uploads it
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result); // Set imageUrl to display the image
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file");

    console.log(file);
    setLoading(true); // Start loading
    setResult(null); // Clear previous result

    try {
      const response = await fetch("http://localhost:5000/analyze-car", {
        method: "POST",
        body: file,
      });
      const data = await response.json();
      setResult(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="app-container">
      <div className="upload-card">
        <h1>Car Image Analyzer</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="imgfile">Upload your image here </label>
          <input
            type="file"
            id="imgfile"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button type="submit">Analyze Image</button>
        </form>

        {/* Display the uploaded image */}
        {imageUrl && (
          <div>
            <h2>Uploaded Image:</h2>
            <img
              src={imageUrl}
              alt="Uploaded Car"
              style={{ width: "300px", marginTop: "20px" }}
            />
          </div>
        )}

        {/* Display the loading sign */}
        {loading && (
          <div>
            <p>Loading analysis...</p>
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          </div>
        )}

        {/* Display the analysis result */}
        {result && (
          <div className="result-container">
            <h2>Analysis Result:</h2>
            <p>
              <strong>Type:</strong> {result.type}
            </p>
            <p>
              <strong>Brand:</strong> {result.brand}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarUpload;
