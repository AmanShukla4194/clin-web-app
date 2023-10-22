import React, { useState } from "react";
import "./FilterButton.css";
// import DateSelector from "./DateSelector";
import { DOMAIN_NAME } from "./main-pages/config";
import MyDatePicker from './MyDatePicker'

const FilterButton = ({setlistCallback}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDatePopupVisible, setDatePopupVisible] = useState(false);



  const handleDateSearchClick = () => {
    setDatePopupVisible(!isDatePopupVisible);
    setlistCallback([]);
    console.log("herre")
  };

  function reverse(str) {
    const [y, m, d] = str.split("-");
    return y + "-" + m + "-" + d;
  }

  const applyDateFilter = async () => {
    if (startDate !== "" && endDate !== "") {
      const s = reverse(startDate);
      const e = reverse(endDate);
      console.log(s, e);
      try {
        const res = await fetch(
          DOMAIN_NAME + "/api/appointments?date=" + s + "/" + e
        );
        const resData = await res.json();
        console.log(resData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleButtonClick = (filterType) => {
    // Generate the appropriate dates for "Today" and "Last 7 Days"
    if (filterType === "today") {
      const today = new Date();
      const todayDate = today.toISOString().slice(0, 16);
      setStartDate(todayDate);
      setEndDate("");
    } else if (filterType === "last7days") {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 16);
      const todayDate = today.toISOString().slice(0, 16);
      setStartDate(sevenDaysAgoDate);
      setEndDate(todayDate);
    }
    applyDateFilter();
  };

  return (
    <>
      <div className="filter-button">
        <button
          onClick={() => handleButtonClick("today")}
          className="btn btn-secondary"
          style={{ backgroundColor: "rgba(1, 198, 178, 1)" }}
        >
          Today
        </button>
        <button
          onClick={() => handleButtonClick("last7days")}
          className="btn btn-secondary mx-4"
          style={{ backgroundColor: "rgba(1, 198, 178, 1)" }}
        >
          Last 7 Days
        </button>
        <button
          className="btn btn-secondary"
          style={{
            backgroundColor: "rgba(1, 198, 178, 1)",
            position: "relative",
          }}
          onClick={handleDateSearchClick}
        >
          Search by Date
        </button>
      </div>
      {isDatePopupVisible ? <MyDatePicker /> : null}
    </>
  );
};

export default FilterButton;
