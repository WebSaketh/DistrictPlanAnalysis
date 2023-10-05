"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import React, { useState } from "react";
import aboutApis from "../Api/About/index.js";

const About = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleTextFieldChange = (e) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleGoBack = () => {
    setEmail("");
    setMessage(null);
    props.goBack();
  };

  const clickSubmit = async () => {
    let obj = {
      email: email,
    };
    let res = await aboutApis.registerEmail(obj);
    let message = res.data;
    setMessage(message);
  };
  return (
    
    <div style={{ paddingLeft: "40px", paddingTop: "40px" }}>
  <div
    className="flex flex-1 text-center w-full"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "grey", // Change text color to grey
      fontFamily: "Helvetica-Bold", // Use Roboto font
      fontSize: "24px", // Set font size to 24 pixels
      marginBottom: "29px", // Add bottom margin to create padding
    }}
  >
    <p>Welcome to The Chiefs, Subscribe Now!</p>
  </div>

  <div style={{ display: "flex", marginBottom: "5px" }}>
    <TextField
      hiddenLabel
      id="filled-hidden-label-small"
      variant="filled"
      size="Normal"
      label="Email"
      onChange={(e) => handleTextFieldChange(e)}
      style={{
        borderRadius: "80px",
        color: "white", // Adjust the border radius as needed
        marginRight: "10px", // Add right margin to create spacing
      }}
    />
    <Button variant="contained" onClick={clickSubmit} style={{ fontSize: "16px", padding: "8px 16px", backgroundColor: "#990000", color: "white" }}>
      Submit
    </Button>
    <div style={{ width: "10px" }}></div> {/* Add a small gap */}
    <Button variant="contained" onClick={handleGoBack} style={{ fontSize: "16px", padding: "8px 16px", backgroundColor: "#fecaca", color: "black" }}>
      Go Back
    </Button>
  </div>

  {message !== null && <h3>{message}</h3>}
</div>

  
  );
};

export default About;
