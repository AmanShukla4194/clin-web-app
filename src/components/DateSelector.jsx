import React, { useState } from "react";
import "./DateSelector.css";
import { DOMAIN_NAME } from "./main-pages/config";

function reverse(str) {
  const [y, m, d] = str.split("-");
  return y + "-" + m + "-" + d;
}

export default function TableDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const applyDateRangeFilter = async () => {
    if (startDate !== "" && endDate !== "") {
      // console.log(startDate,endDate);
      // console.log(reverse(startDate),reverse(endDate));
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
 
  return (
    <>
      <div className="date-filter-popup">
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={applyDateRangeFilter}>Apply</button>
      </div>
    </>
  );
}
