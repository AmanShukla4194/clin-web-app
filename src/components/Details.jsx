import React from "react";
import './Details.css';

function Details(props){
    return(
        <div className="details">
        <div className="upper">
            <div className="left">
            <span className="titles-color">Age</span><br/>
            <p className="detail-content" >{props.details.Age} years</p>
            </div>
            <div className="middle">
                <span className="titles-color">Gender</span><br/>
                <p id="gender" className="detail-content">{props.details.Gender}</p>
            </div>
            <div className="right">
                <span className="titles-color">D.O.B</span><br/>
                <p className="detail-content">{props.details.Date_Of_Birth}</p>
            </div>
        </div>
        <div className="lower">
            <div className="left">
                <span  className="titles-color" >Ph. Number</span><br/>
                <p  className="detail-content">{props.details.Phone}</p>
            </div>
            <div className="middle">
                <span className="titles-color">Address</span><br/>
                <p className="detail-content">{props.details.Address}</p>
            </div>
            <div className="right">
                <span className="titles-color">Email</span><br/>
                <p className="detail-content">{props.details.Email}</p>
            </div>
        </div>
    </div>
    
    );

}
export default Details;