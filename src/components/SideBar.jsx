import React, { useEffect,useState } from "react";
import "./SideBar.css";
import calendar from "../components/images/calendar.png";
import person from "../components/images/person.png";
import { useMediaQuery } from 'react-responsive';

const SideBar = ({ onAppointmentButton, onDetailsButton ,setDetailButtonState}) => {
  //sessionStorage.getItem('AppointmentPage')==="true" is done so when refreshing the page the button active state not jumps and stays more focused
  const [activeButton, setactiveButton] = useState((sessionStorage.getItem('AppointmentPage')==="true" || !sessionStorage.getItem('AppointmentPage')));
  const isMobile = useMediaQuery({ maxWidth: 520 });
  useEffect(()=>{
    setDetailButtonState(setactiveButton);
    if(sessionStorage.getItem('AppointmentPage')==="false"){
      setactiveButton(false);
    }
  },[setDetailButtonState]);

  const handleAppointmentButton = () => {
    setactiveButton(true);
    sessionStorage.setItem('AppointmentPage',true);
    onAppointmentButton();
  };
  const handleDetailsButton = () => {
    setactiveButton(false);
    sessionStorage.setItem('AppointmentPage',false);
    onDetailsButton();
  };
  return (
    <div className="sidebar" style={isMobile?{display:"none"}:{display:"auto"}}>
      <div
        style={
          activeButton
            ? { backgroundColor: "white", boxShadow: "0px 0px 10px" }
            : null
        }
        onClick={handleAppointmentButton}
        className="appointments"
      >
        <img id="calendar" src={calendar} alt="img"></img>
        <p>Appointments</p>
      </div>
      <div
      
        style={
          !(activeButton)
            ? { backgroundColor: "white", boxShadow: "0px 0px 10px" }
            : null
        }
        onClick={handleDetailsButton}
        className="patient-details"
      >
        <img id="person" src={person} alt="img" />
        <p>Patient Details</p>
      </div>
    </div>
  );
};

export default SideBar;
