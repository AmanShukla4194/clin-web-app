import React from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "./Export.css";

const appointmentData = [
  // appointment data here
];

// const exportToCSV = () => {
//   const priority = appointmentData.success[0].Priority;

//   const csvData = appointmentData.success[0].appointments.map((appointment) => ({
//     'Priority': priority,
//     'ID': appointment.id,
//     'Patient ID': appointment.Patient.id,
//     'First Name': appointment.Patient.First_name,
//     'Middle Name': appointment.Patient.Middle_name || '',
//     'Last Name': appointment.Patient.Last_name || '',
//     'Unique ID': appointment.Patient.Unique_Id,
//     'Date': appointment.Date,
//     'Time': appointment.Time,
//     'Condition': appointment.Condition,
//     'Note': appointment.Note || '',
//   }));

//   return csvData;
// };

const exportToCSV = () => {
  const csvData = appointmentData.map((appointment) => ({
    // Map your appointment data to CSV format
    // Example: name: appointment.name, date: appointment.date, ...
  }));

  return csvData;
};

const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text("Appointment List", 10, 10);

  // Add appointment data to the PDF document
  appointmentData.forEach((appointment, index) => {
    const yPosition = 20 + index * 10;
    doc.text(appointment.name, 20, yPosition);
    // Add other appointment data as needed
  });
  doc.save("appointments.pdf");
};

const ExportData = () => {
  // Your appointment list rendering code here

  return (
    <div className="export">
      {/* ... Your appointment list rendering */}
      <CSVLink data={exportToCSV()} filename={"appointments.csv"}>
        <button
          className="btn btn-secondary mx-4"
          style={{ backgroundColor: "rgba(1, 198, 178, 1)" }}
        >
          Export as CSV
        </button>
      </CSVLink>
      <button
        className="btn btn-secondary mx-4"
        style={{ backgroundColor: "rgba(1, 198, 178, 1)" }}
        onClick={exportToPDF}
      >
        Export as PDF
      </button>
    </div>
  );
};
export default ExportData;
