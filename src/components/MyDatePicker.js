import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./DateSelector.css";
import { DOMAIN_NAME } from "./main-pages/config";

function reverse(str) {
  const [y, m, d] = str.split("-");
  return y + "-" + m + "-" + d;
}

const MyDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

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
        <DatePicker className='datepicker'
          showIcon
          closeOnScroll={true}
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          isClearable
          placeholderText="Select start date"
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker className='datepicker'
          showIcon
          closeOnScroll={true}
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          isClearable
          placeholderText="Select end date"
        />
      </div>
      <button onClick={applyDateRangeFilter}>Apply</button>
      </div>
    </>
  );
};

export default MyDatePicker;
