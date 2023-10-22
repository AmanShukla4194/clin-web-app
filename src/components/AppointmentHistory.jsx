import React, { useEffect, useState } from "react";
import "./AppointmentHistory.css";
import AppointmentContentX from "./AppointmentContentX";
import { DOMAIN_NAME } from "./main-pages/config";
import Buffering from "./main-pages/Buffering";

export default function AppointmentHistory(props) {
  const [previousAppointments, setpreviousAppointments] = useState([]);
  const [pdfURL, setpdfURL] = useState("");
  const [buffering, setbuffering] = useState(false);

  useEffect(() => {
    if (!props.appointments) {
      setpreviousAppointments([]);
    } else {
      setpreviousAppointments(props.appointments);
    }

    // console.log(previousAppointments);
  }, [props]);

  async function handlePrint(appointment_id) {
    setbuffering(false); //set tis true to enable buffering
    try {
      const response = await fetch(
        DOMAIN_NAME + "/api/appointment/pdf/" + appointment_id
      );
      if (response.ok) {
        const pdf = await response.blob();
        setpdfURL(URL.createObjectURL(pdf));
        setbuffering(false);
      } else {
        const error = await response.json();
        console.log(error);
        setbuffering(false);
      }
    } catch (error) {
      console.error(error);
      setbuffering(false);
    }
  }

  const handleIFrameLoad = () => {
    const iframe = document.getElementById("if"); // Replace 'if' with the actual id of your iframe
    if (iframe) {
      iframe.contentWindow.print();
      URL.revokeObjectURL(pdfURL);
    }
  };

  return (
    <>
      {buffering ? (
        <Buffering />
      ) : (
        <div className="aparent">
          <iframe
            id="if"
            title="appointment pdf"
            style={{ display: "none" }}
            src={pdfURL}
            onLoad={handleIFrameLoad}
          ></iframe>
          <div className="appointment-history">
            <h4>Appointment History</h4>
            <div className="scrollbar">
              {previousAppointments.map((item, index) => {
                // console.log(item.Date,item.Time);
                return (
                  <AppointmentContentX
                    disableNote={item.Note === "" ? true : false}
                    handlePrint={() => {
                      handlePrint(item.id);
                    }}
                    handleNoteClick={() => props.handleNoteClick(item.id)}
                    key={index}
                    date={item.Date}
                    time={item.Time}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
