import React from "react";
import "./ServerError.css";

const ServerError = () => {
  return (
    <div className="server-error">
      <h1>We are sorry,</h1>
      <h1 id="msg">Server is Down</h1>
    </div>
  );
};

export default ServerError;
