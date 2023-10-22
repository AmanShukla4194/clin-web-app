import React, { useState, useEffect } from "react";
import "./Content.css";
import delete_button from "../components/images/delete.png";
import {
  DOMAIN_NAME,
  PRIORITY_URGENT,
  PRIORITY_REGULAR,
  PRIORITY_VERY_URGENT,
} from "./main-pages/config";
import Buffering from "./main-pages/Buffering";

function Content(props) {
  const [buffering, setbuffering] = useState(false);

  function onContentClick() {
    props.onContentClick(props["id"], props.patient_id);
    // console.log(props.patient_id);
  }
  useEffect(() => {
    console.log(props);
  }, []);

  const cancelAppointment = async (id) => {
    setbuffering(true);
    if (props.appointments_list.length === 1) {
      sessionStorage.setItem("first_loaded", false);
      sessionStorage.removeItem("defaultPatient"); //this is done so last patient id is remved so patientdetails page dont use deleted patient id
    } else {
      sessionStorage.setItem("first_loaded", true);
    }
    try {
      const response = await fetch(
        DOMAIN_NAME + "/api/appointment/cancel?id=" + id,
        { method: "DELETE" }
      );
      const res = await response.json();
      if (response.ok) {
        // console.log(res["success"]);
        // window.location.reload();
        props.fetchAppointments();
        setbuffering(false);
        // window.location.replace("/");
      } else {
        setbuffering(false);
        console.log(res["error"]);
      }
    } catch (error) {
      setbuffering(false);
      console.log(error);
    }
  };

  return (
    <>
      {buffering ? <Buffering /> : null}
      <div
        className="content"
        style={
          props.priority === 0
            ? { backgroundColor: PRIORITY_REGULAR }
            : props.priority === 1
            ? { backgroundColor: PRIORITY_URGENT }
            : { backgroundColor: PRIORITY_VERY_URGENT}
        }
        onClick={onContentClick}
      >
        <span id="time">{props["time"]}</span>
        <span id="date">{props["date"]}</span>
        <span id="name">{props["name"]}</span>
        <span id="id">{props["Unique_Id"]}</span>
        <span id="condition">{props["condition"]}</span>

        <img
          src={delete_button}
          alt="delete"
          onClick={(e) => {
            e.stopPropagation();
            cancelAppointment(props.id);
          }}
        />
      </div>
    </>
  );
}
export default Content;
