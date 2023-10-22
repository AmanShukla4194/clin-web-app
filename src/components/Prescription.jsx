import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const Prescription = () => {
  const [editable, setEditable] = useState(false);
  const [symptoms, setSymptoms] = useState('Patient symptoms go here');
  const [diagnosis, setDiagnosis] = useState('Diagnosis goes here');
  const [medications, setMedications] = useState(['']);

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    setEditable(false);
  };

  const handleSymptomsChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
  };

  const handleMedicationChange = (index, e) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = e.target.value;
    setMedications(updatedMedications);
  };

  const handleAddMedication = () => {
    setMedications([...medications, '']);
  };

  const handlePrintClick = () => {
    const doc = new jsPDF();
    doc.text('Prescription Report', 10, 10);
    doc.text('Symptoms:', 10, 20);
    doc.text(symptoms, 20, 30);
    doc.text('Diagnosis:', 10, 40);
    doc.text(diagnosis, 20, 50);

    medications.forEach((medication, index) => {
      doc.text(`Medication ${index + 1}:`, 10, 60 + index * 20);
      doc.text(medication, 20, 70 + index * 20);
    });

    doc.save('prescription.pdf');
  };

  return (
    <div>
      <h2>Prescription Report</h2>
      <div>
        <h3>Symptoms:</h3>
        {editable ? (
          <textarea
            rows="4"
            cols="50"
            value={symptoms}
            onChange={handleSymptomsChange}
          />
        ) : (
          <p>{symptoms}</p>
        )}
        {editable && <button onClick={handleSaveClick}>Save</button>}
        {!editable && <button onClick={handleEditClick}>Edit</button>}
      </div>
      <div>
        <h3>Diagnosis:</h3>
        {editable ? (
          <textarea
            rows="4"
            cols="50"
            value={diagnosis}
            onChange={handleDiagnosisChange}
          />
        ) : (
          <p>{diagnosis}</p>
        )}
        {editable && <button onClick={handleSaveClick}>Save</button>}
        {!editable && <button onClick={handleEditClick}>Edit</button>}
      </div>
      <div>
        <h3>Medications:</h3>
        {medications.map((medication, index) => (
          <div key={index}>
            {editable ? (
              <input
                type="text"
                value={medication}
                onChange={(e) => handleMedicationChange(index, e)}
              />
            ) : (
              <p>{medication}</p>
            )}
          </div>
        ))}
        {editable && <button onClick={handleAddMedication}>+</button>}
      </div>
      <div>
        {!editable && <button onClick={handlePrintClick}>Print</button>}
      </div>
    </div>
  );
};

export default Prescription;
