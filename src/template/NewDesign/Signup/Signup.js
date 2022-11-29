import React from "react";
import * as classes from "./Signup.module.css";
import salesforce from "../../../assets/images/Salesforce_logo.png";
import Hubspot from "../../../assets/images/HubSpot_Logo.png";

const Signup = () => {
  return (
    <div className={classes.container}>
      <div className={classes.cardcontainer}>
        <h3 align="center">CREATE ACCOUNT</h3>
        <h2 align="center">Get started with Salesforce / Hubspot</h2>
        <div className={classes.card}>
          <div align="center" className={classes.cardItem}>
            <div>
              <img width={"130px"} src={salesforce}></img>
            </div>
            <p>Continue with Salesforce</p>
          </div>
          <div align="center" className={classes.cardItem}>
            <div>
              <img width={"200px"} src={Hubspot}></img>
            </div>
            <p>Continue with HubSpot</p>
          </div>
        </div>
        <div className={classes.footer}>
          <p align="center">
            By continuing. you're agreeing to the ValueOrbit
            <a> Terms of Conditions</a> and <a>Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
