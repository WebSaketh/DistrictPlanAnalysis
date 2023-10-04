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
    <div>
      <h1>About Page</h1>
      <button className="btn btn-accent" onClick={handleGoBack}>
        Go Back
      </button>

      <h3>Subscribe to our newsletter today!</h3>

      <TextField
        id="filled-basic"
        label="Email"
        variant="filled"
        onChange={(e) => handleTextFieldChange(e)}
      />
      <Button variant="contained" onClick={clickSubmit}>
        Submit
      </Button>

      {message !== null && <h3>{message}</h3>}
    </div>
  );
};

export default About;
