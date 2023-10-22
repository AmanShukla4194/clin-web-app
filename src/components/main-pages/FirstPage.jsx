import React,{useState} from "react";
import "./FirstPage.css";
import checkup_logo from '../images/checkup_logo.png';
import Login from './Login';

export default function FirstPage() {
    const [loginpage,setloginpage]=useState(false);
   
  return (
    <>
    {loginpage ? <Login />:
      <div className="starting-page">
        <h1>Let's get started!</h1>
        <div className="rectangle">
          <img src={checkup_logo} alt="checkup" />
        </div>
        <h2>Checkup</h2>
        <button onClick={()=>setloginpage(true)}>Log In</button>
      </div>
    }
    </>
  );
}
