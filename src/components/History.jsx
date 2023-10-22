import React from "react";
import "./History.css";

function History(props) {
  
  return (
    <div className="history">
      <p id="his-name">{props.name}</p>
      <br />

      <p id="his-id">{props.unique_id}</p>
      <br />
      <span id="his-appointments">Appointments</span>
      <br />
      <div className="inner-history">
        <div className="past">
          <span id="his-num">{props.past}</span>
          <br />
          <span id="his">Past</span>
        </div>
        <div className="vertical"></div>
        <div className="upcoming">
          <span id="his-num">{props.upcoming}</span>
          <br />
          <span id="his">Upcoming</span>
        </div>
      </div>
    </div>
  );
}
export default History;
