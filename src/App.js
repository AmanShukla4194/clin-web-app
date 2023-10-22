import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Error from './components/Error';

// import MainPage from './components/main-pages/MainPage';
import Home from './components/main-pages/Home';
// import AppointmentList from './components/AppointmentsList';
// import TextEditor from './components/main-pages/TextEditor';
// import PatientDetail from './components/PatientDetail';
function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' Component={Home}/>     
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>

  );
}

export default App;

