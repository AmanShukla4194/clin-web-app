import React, { useRef, useState, useEffect } from "react";
import "./PatientDetail.css";
import History from "./History";
import Details from "./Details";
import Notes from "./Notes";
import AppointmentHistory from "./AppointmentHistory";
import TextEditor from "./main-pages/TextEditor";
import { convertTo24HourFormat } from "./AppointmentsList";
import { DOMAIN_NAME } from "./main-pages/config";
import Buffering from "./main-pages/Buffering";
import { useMediaQuery } from "react-responsive";
import ServerError from "./main-pages/ServerError";

export default function PatientDetail(props) {
  const [isTextEditorVisible, setIsTextEditorVisible] = useState(false);
  const [patientDetails, setpatientDetails] = useState(props.patientDetails);
  const [servererror, setservererror] = useState(false);
  const [NoteForAppointment,setNoteForAppointment]=useState('');
  const [NoteChanged,setNoteChanged]=useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  

  const [appointment_history, setappointment_history] = useState(
    props.appointment_history
  );
  // eslint-disable-next-line
  const [isAppointmentsEmpty, setisAppointmentsEmpty] = useState(false);
  const [buffering, setbuffering] = useState(false);
  const textEditorRef = useRef(null);

  
  const handleClick = () => {
    setIsTextEditorVisible(true);
  };

  const fetchData = async (patient_id) => {
    let past = 0;
    let upcoming = 0;
    try {
      const response = await fetch(DOMAIN_NAME + "/api/patient/" + patient_id);
      const resData = await response.json();
      if (response.ok) {
        setpatientDetails(resData["success"]);
        let temp_list = resData["success"]["appointments"];
        for (let i = 0; i < temp_list.length; i++) {
          let appointment_date = new Date(
            temp_list[i].Date + " " + convertTo24HourFormat(temp_list[i].Time)
          );
          if (appointment_date.getTime() <= new Date().getTime()) {
            past++;
          } else {
            upcoming++;
          }
        }
        setbuffering(false);
        // console.log(past,upcoming);
        setappointment_history({
          upcomingAppointments: upcoming,
          pastAppointments: past,
        });
      } else {
        setbuffering(false);
        // console.log(resData["error"]);
        setservererror(true);
      }
    } catch (error) {
      setbuffering(false);
      // console.log(error);
      setservererror(true);
    }
  };

  useEffect(() => {
    if (!props.patient_id) {
      //props is null when we directly click on content button ain appointments list
      const patient_id = sessionStorage.getItem("defaultPatient");
      // const appointment_id=sessionStorage.getItem('appointment_id');
      // console.log(patient_id);
      if (patient_id) {
        setbuffering(true);
        fetchData(patient_id);
      } else {
        setisAppointmentsEmpty(true);
      }
    }

    const handleUnload = () => {
      // console.log(props.setAppointmentPage);
      props.setAppointmentPage(false);

      // sessionStorage.setItem("first_loaded", true); //it is done so everytime on refreshing the page appointment list comes again and filters also
      // sessionStorage.setItem('AppointmentPage',false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [props]);

  const handleMouseDown = (event) => {
    if (
      textEditorRef.current &&
      !textEditorRef.current.contains(event.target)
    ) {
      setIsTextEditorVisible(false);
    }
  };

  const handleNoteClick=async (appoinment_id)=>{
    setNoteChanged(!NoteChanged);
    let id=appoinment_id;
    try{
      // console.log(appointment_id);
    const response=await fetch(DOMAIN_NAME+'/api/appointment/note/get/'+id);
    const resData=await response.json();
    if(response.ok){
      let temp=resData['success'];
      
      temp = temp
        .replace(/&nbsp;/g, " ")
        .replace(/&#9;/g, "\t")
        .replace(/<br>/g, "\n");
      setNoteForAppointment(temp);
    }
    else{
      console.log(resData['error']);
    }
  }catch(error){
    console.log(error);
  }
}

const handleNoteSave=()=>{
  //do here stuff when note save button is clicked
}

const handleSaveTextEditor =async (prescription) => {
  setIsTextEditorVisible(false);
  try{
    let id=props.appointment_id
    console.log(prescription);
    // console.log(id);
    if(!id){
    id=sessionStorage.getItem("appointment_id");
    }
    const response=await fetch(DOMAIN_NAME+"/api/save/prescription/"+id,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({prescription:prescription})
    });
    const resdata=await response.json();
    if(response.ok){
      console.log(resdata["success"]);
    }
    else{
      console.log(resdata["error"]);
    }
  }catch(error){
    console.error(error);
  }
};


  return (
    <>
      {servererror ? (
        <ServerError />
      ) : (
        <>
          {isTextEditorVisible && (
            <div ref={textEditorRef}>
              <TextEditor onSave={(prescription)=>{
                handleSaveTextEditor(prescription)}} />
            </div>
          )}
          {buffering ? (
            <Buffering />
          ) : (
            <>
              {isAppointmentsEmpty ? (
                <h1 id="no-appointments-msg">
                  No Appointments!
                  <br />
                  Patient Not Found
                </h1>
              ) : (
                <div
                  style={isTextEditorVisible ? { filter: "blur(5px)" } : null}
                  className="parent"
                >
                  {isMobile ? (
                    <div className="buttons-on-top">
                      <button
                        id="button1"
                        onClick={() => props.setAppointmentPage(true)}
                      >
                        Go Back
                      </button>
                      <button id="button2" onClick={handleClick}>
                        Add Prescription
                      </button>
                    </div>
                  ) : (
                    <button onClick={handleClick}>Add Prescription</button>
                  )}
                  <div>
                    <div className="two">
                      <History
                        name={String(
                          patientDetails.First_name + patientDetails.Last_name
                        )}
                        unique_id={patientDetails.Unique_Id}
                        upcoming={appointment_history.upcomingAppointments}
                        past={appointment_history.pastAppointments}
                      />
                      <Details details={patientDetails} />
                      <Notes handleNoteSave={handleNoteSave} APPOINTMENT_ID={props.appointment_id} NoteChanged={NoteChanged} NoteForAppointment={NoteForAppointment} />
                    </div>
                    <AppointmentHistory
                    handleNoteClick={(id)=>handleNoteClick(id)}
                      appointments={patientDetails.appointments}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
