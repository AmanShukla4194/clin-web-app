import React, { useEffect, useState, useRef } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import "./Home.css";
import AppointmentsList from "../AppointmentsList";
import PatientDetails from "../PatientDetail";
import { convertTo24HourFormat } from "../AppointmentsList";
import { DOMAIN_NAME } from "./config";
import Buffering from "./Buffering";
import ExportData from "../ExportData";

const Home = () => {
  const [AppointmentPage, setAppointmentPage] = useState(true);
  const [ContentData, setContentData] = useState({});
  const [patientData, setpatientData] = useState({});
  const [pastAppointments, setpastAppointments] = useState(0);
  const [upcomingAppointments, setupcomingAppointments] = useState(0);
  const [buffering, setbuffering] = useState(false);
  let DetailButtonState = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem("first_loaded")) {
      sessionStorage.setItem("first_loaded", true);
    }
    if (sessionStorage.getItem("AppointmentPage") === null) {
      setAppointmentPage(true);
    } else {
      setAppointmentPage(sessionStorage.getItem("AppointmentPage") === "true");
    }
  }, []);

  useEffect(() => {
    // console.log(DOMAIN_NAME);
    const handleUnload = () => {
      sessionStorage.setItem("AppointmentPage", AppointmentPage);
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [AppointmentPage]);

  const fetchData = async (patient_id) => {
    let past = 0;
    let upcoming = 0;
    try {
      const response = await fetch(DOMAIN_NAME + "/api/patient/" + patient_id);
      const resData = await response.json();
      if (response.ok) {
        setpatientData(resData["success"]);
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
        // console.log(past,upcoming);

        setbuffering(false);
        setpastAppointments(past);
        setupcomingAppointments(upcoming);
      } else {
        setbuffering(false);
        console.log(resData["error"]);
      }
    } catch (error) {
      setbuffering(false);
      console.log(error);
    }
  };

  const onContentClick = async (appointment_id, patient_id) => {
    // console.log(appointment_id,patient_id);
    setContentData({ appointment_id: appointment_id, patient_id: patient_id });
    setbuffering(true);
    await fetchData(patient_id);
    sessionStorage.setItem("defaultPatient", patient_id);
    handleDetailsButton();
  };

  const handleDetailButtonState = (changeState) => {
    DetailButtonState = changeState; //changestate is a function which controls the state of active button in sidebar
    // console.log(changeState);
  };

  const handleAppointmentButton = () => {
    setAppointmentPage(true);
  };

  const handleDetailsButton = () => {
    // console.log(patientData);
    setAppointmentPage(false);

    // console.log(DetailButtonState)
    if (DetailButtonState.current !== null) {
      DetailButtonState(false); //false here means to set the appointment button to false and setting details button active
    }
  };

  return (
    <>
      <NavBar />
      <div className="PATIENT-DETAILS">
        <SideBar
          setDetailButtonState={handleDetailButtonState}
          onAppointmentButton={handleAppointmentButton}
          onDetailsButton={handleDetailsButton}
        />
        {AppointmentPage ? (
          <>
            {buffering ? <Buffering /> : null}
            <AppointmentsList onContentClick={onContentClick} />
          </>
        ) : (
          <PatientDetails
            setAppointmentPage={setAppointmentPage}
            appointment_id={ContentData.appointment_id}
            patient_id={ContentData.patient_id}
            patientDetails={patientData}
            appointment_history={{
              upcomingAppointments: upcomingAppointments,
              pastAppointments: pastAppointments,
            }}
          />
        )}
      </div>
      <ExportData />
    </>
  );
};
export default Home;
