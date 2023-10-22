import React, { useEffect, useState } from "react";
import Content from "./Content";
import "./AppointmentsList.css";
import search_image from "../components/images/search_image.png";
import {DOMAIN_NAME} from "./main-pages/config";
import Buffering from "../components/main-pages/Buffering";
import FilterButton from "../components/FilterButton";

function convertTo24HourFormat(time) {
  const [hour, minute] = String(time).slice(0, -2).split(":");
  const period = String(time).slice(-2);
  let hourIn24Format = parseInt(hour);

  if (period.toLowerCase() === "pm" && hourIn24Format !== 12) {
    hourIn24Format += 12;
  }

  return hourIn24Format.toString().padStart(2, "0") + ":" + minute;
}

function AppointmentsList(props) {
  const [list, setlist] = useState([]);
  const [filteredlist, setfilteredlist] = useState(list);
  const [cardColor, setcardColor] = useState("white");
  const [buffering, setbuffering] = useState(false);
  const [regularCount, setregularCount] = useState(false);
  const [urgentCount, seturgentCount] = useState(false);
  const [veryUrgentCount, setveryUrgentCount] = useState(false);

  function onContentClick(appointment_id, patient_id) {
    props.onContentClick(appointment_id, patient_id);
  }

  const handleSearch = (e) => {
    let query = e.target.value;
    // console.log(query);
    let name = "";
    let temp = list.filter((item) => {
      if (item.Patient.Middle_name === "") {
        name = item.Patient.First_name + " " + item.Patient.Last_name;
      } else {
        name =
          item.Patient.First_name +
          " " +
          item.Patient.Middle_name +
          " " +
          item.Patient.Last_name;
      }
      if (name.toLowerCase().startsWith(query.toLowerCase())) {
        return item;
      }
      return null;
    });
    setfilteredlist(temp);
  };

  const fetchAppointments = async () => {
    setbuffering(true);
    try {
      const currentdate = new Date();
      let date =
        currentdate.getFullYear().toString() +
        "-" +
        (currentdate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        currentdate.getDate().toString().padStart(2, "0");
      // date="2023-06-23";
      const d = date + "/" + date;
      console.log(d);
      const response = await fetch(DOMAIN_NAME + "/api/appointments?date=" + d);
      const resData = await response.json();
      // console.log(resData);
      const sortedAppointments = [];
      if (response.ok) {
        let temp = resData["success"];
        // console.log(temp[0].appointments)
        temp.forEach((element) => {
          console.log(element);
          if (element.Priority === 2) {
            sortedAppointments.push(...element.appointments);
            console.log(...element.appointments);
            setveryUrgentCount(element.appointments_count);
          } else if (element.Priority === 1) {
            sortedAppointments.push(...element.appointments);
            console.log(...element.appointments);
            seturgentCount(element.appointments_count);
          } else {
            sortedAppointments.push(...element.appointments);
            console.log(...element.appointments);
            setregularCount(element.appointments_count);
          }
        });

        // console.log(sortedAppointments)

        setbuffering(false);

        setlist(sortedAppointments);
        setfilteredlist(sortedAppointments);
        // console.log(sortedAppointments);

        if (sortedAppointments.length !== 0) {
          if (sessionStorage.getItem("first_loaded") === "true") {
            sessionStorage.setItem(
              "defaultPatient",
              sortedAppointments[0].Patient.id
            );
            sessionStorage.setItem("appointment_id", sortedAppointments[0].id);

            sessionStorage.setItem("first_loaded", false);
          }
        } else {
          console.log("No Appointments Today");
        }
      } else {
        setbuffering(false);
        console.log(resData["error"]);
      }
    } catch (error) {
      setbuffering(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <div className="filter-pos">
        <div className="search-bar">
          <img src={search_image} alt="search" />
          <input
            spellCheck="false"
            type="search"
            placeholder="Search by Patient's name..."
            onChange={handleSearch}
          />
        </div>
        <FilterButton setlistCallback={setfilteredlist} />
      </div>
      <div className="titles">
        <span>Time</span>
        <span>Date</span>
        <span>Patient Name</span>
        <span>ID</span>
        <span>Condition</span>
      </div>
      {buffering ? (
        <Buffering />
      ) : (
        <div>
          {filteredlist.length === 0 ? (
            <h1 id="empty-array-msg">No Appointments!</h1>
          ) : (
            <div className="container">
              {filteredlist.map((item, index) => (
                <Content
                priority={item.Priority}
                  appointments_list={list}
                  fetchAppointments={fetchAppointments}
                  onContentClick={onContentClick}
                  key={index}
                  name={
                    item.Patient.First_name +
                    " " +
                    item.Patient.Middle_name +
                    " " +
                    item.Patient.Last_name
                  }
                  time={item.Time}
                  date={item.Date}
                  id={item.id}
                  patient_id={item.Patient.id}
                  Unique_Id={item.Patient.Unique_Id}
                  condition={item.Condition}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default AppointmentsList;
export { convertTo24HourFormat };
