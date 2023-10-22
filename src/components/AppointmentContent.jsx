import React from "react";
import "./AppointmentContent.css";
import paper from "../components/images/paper.png";
import print from "../components/images/print.png";

export default function AppointmentContent({
  date,
  time,
  handleNoteClick,
  disableNote=false,
  handlePrint
}) {
  return (
    <div className="appointment-content">
      <div className="datetime">
        <span id="appointment-date">{date}</span>
        <span id="appointment-time">{time}</span>
      </div>
      <div className="treatment">
        <span id="treat">Treatment</span>
        <span id="open">Open Access</span>
      </div>
      <div className="note-print">
            <img id="paper" src={paper} alt="paper" style={disableNote?{display:"none"}:null} />
            <span
              style={disableNote?{display:"none"}:null}
              id="note"
              onClick={() => {
                handleNoteClick();
              }}
            >
              Note
            </span>
        <img onClick={()=>{
          handlePrint()
        }} style={disableNote?{width:"80%"}:null} id="print" src={print} alt="print" />
      </div>
    </div>
  );
}
