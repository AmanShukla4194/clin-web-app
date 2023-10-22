import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import checkup from "../components/images/checkup.png";
import up from "../components/images/up-arrow.png";
import down from "../components/images/down-arrow.png";
import profile from "../components/images/Profile-pic.png";

const NavBar = () => {
  const [state, setstate] = useState(false);
  const [image_url, setImage_url] = useState(up);
  const menuRef=useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleMouseDown = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setstate(false);
      setImage_url(up);
    }
  };

  const openmenu = () => {
    if (state) {
      setImage_url(up);
    } else {
      setImage_url(down);
    }
    setstate(!state);
  };
  const logout = () => {
    openmenu();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.replace("/");
  };

  return (
    <div>
      <div className="navbar">
        <img id="logo" src={checkup} alt="checkup" />
        <div className="child">
          <img id="profile-pic" src={profile} alt="profile-pic" />
          <p>Sanjeev Kumar</p>
          <img id="menu-arrow" onClick={openmenu} src={image_url} alt="Menu" />
        </div>
      </div>

      <div className="menu">
        {state && (
          <ul ref={menuRef}>
            <li onClick={logout}>Log Out</li>
            <hr />
            <li onClick={openmenu}>Edit Profile</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
