import React, { useEffect, useState } from "react";
import "./Notes.css";
import { DOMAIN_NAME } from "./main-pages/config";

function Notes({ APPOINTMENT_ID ,NoteForAppointment,NoteChanged,handleNoteSave}) {
  // console.log(NoteClickedForAppointmentId);
  const [content, setcontent] = useState("");

  useEffect(()=>{
    setcontent(NoteForAppointment);
    // console.log(NoteForAppointment);
  },[NoteForAppointment,NoteChanged]);

  const handleSave = async () => {
    handleNoteSave();
    try {
      let data = content;
      data = data
        .replace(/ /g, "&nbsp;")
        .replace(/\t/g, "&#9;")
        .replace(/\n/g, "<br>");
      let appointment_id = APPOINTMENT_ID;
      if (!appointment_id) {
        //handle if its first run or user not click on any appointment
        appointment_id = sessionStorage.getItem("appointment_id");
      }
      const response = await fetch(
        DOMAIN_NAME + "/api/appointment/note/save/" + appointment_id,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: data }),
        }
      );
      const resData = await response.json();
      if (response.ok) {
        // console.log(resData["success"]);
      } else {
        console.log(resData["error"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notes">
      <h4>Notes</h4>
      <textarea
        onChange={(e) => setcontent(e.target.value)}
        value={content}
        placeholder="Write notes..."
      ></textarea>
      <button id="save" onClick={handleSave}>
        save note
      </button>
    </div>
  );
}
export default Notes;
