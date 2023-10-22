import React ,{useState} from "react";
import './AppointmentContentX.css';
import AppointmentContent from "./AppointmentContent";
import ellipse from '../components/images/Ellipse 7.png';
import line from '../components/images/Line 4.png';
import ellipse2 from '../components/images/Ellipse 8.png';


export default function AppointmentContentX({date,time,handleNoteClick,disableNote=false,handlePrint}){
    const [ellipse_image,setImage]=useState(ellipse);
    return (
        <div onMouseOver={()=>setImage(ellipse2)} onMouseOut={()=>setImage(ellipse)} className="appoinment-content-x">
            <div className="effect-img">
            <img id="line" src={line} alt="line"/>
            <img id="ellipse" src={ellipse_image} alt="elippse"/>
            <img id="line" src={line} alt="line"/>
            </div> 
            <AppointmentContent handlePrint={handlePrint} disableNote={disableNote} handleNoteClick={handleNoteClick} date={date} time={time}/>
        </div>
    );
}