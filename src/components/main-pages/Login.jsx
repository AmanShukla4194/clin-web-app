import React, { useState } from 'react';
import './Login.css';
import login_image from '../images/login_image.png';
import Home from './Home';
import Buffering from './Buffering';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [ShowPassword,setShowPassword]=useState(false);
  const [HomePage,setHomePage]=useState(false);
  const [buffering,setbuffering]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbuffering(true);

    const data = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://127.0.0.1:8000//api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      // console.log(responseData)
      
      // Handle the API response
      if (response.ok) {
        setbuffering(false);
        localStorage.setItem('access_token',responseData['access_token'])
        localStorage.setItem('refresh_token',responseData['refresh_token'])
        setMessage('Login successful');
        setHomePage(true);
        
      } else {
        setbuffering(false);
        setMessage(responseData['error']);
      }
    } catch (error) {
      // console.error(error);
      setbuffering(false);
      setMessage("Server is Down!")
    }
  };

  return (
    <>
    {HomePage? <Home />:
    <div>
      
    <div> {buffering?<Buffering/>:null}</div>
    <div className="login">
      <img id="login-image" src={login_image} alt="login_image" />
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
      <div className="email-input">
        <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" required/>
      </div>
      <div className="pass-input">
        <input onChange={(e)=>setPassword(e.target.value)} type={ShowPassword ?"text" :"password"} placeholder="Password" required/>
        <span onClick={()=>setShowPassword(!ShowPassword)}>{ShowPassword?'Hide':'Show'}</span>
              
      </div>
      <span id="forgot">Forgot Password?</span>
      <button type='submit'>Log In</button>
      </form>
      <p style={{textAlign:'center',color:'red' ,fontSize:'20px'}}>{message}</p>
    </div>
    </div>
    }
    </>

  );
}

export default LoginForm;