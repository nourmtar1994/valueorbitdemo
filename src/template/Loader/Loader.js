import React from "react";

import "./Loader.css";
const Loader = () => {
  return (
    <div className="loaderContainer" align="center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const TurnSignal = () => {
  return (
    <div className="turn-signals">
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
