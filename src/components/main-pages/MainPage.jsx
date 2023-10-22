import React, { useEffect, useState } from "react";
import FirstPage from "./FirstPage";
import Home from "./Home";
import ServerError from "./ServerError";
import Buffering from "./Buffering";

function MainPage() {
  const [firstPage, setfirstPage] = useState(false);
  const [servererror, setservererror] = useState(false);
  const [buffering, setbuffering] = useState(true);

  // setfirstPage(false);
  const fetchdata = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      // const resdata = await response.json();
      if (response.ok) {
        setbuffering(false);
        setfirstPage(false);
        // console.log(resdata);
      } else {
        const response2 = await fetch("http://127.0.0.1:8000/api/token", {
          method: "GET",
          headers: {
            "X-Refresh-Token": localStorage.getItem("refresh_token"),
          },
        });
        const res2data = await response2.json();
        if (response2.ok) {
          localStorage.setItem("access_token", res2data["access_token"]);
          setbuffering(false);
          setfirstPage(false);
        } else {
          setbuffering(false);
          setfirstPage(true);
        }
      }
    } catch (error) {
      console.log(error);
      setbuffering(false);
      setservererror(true);
      // console.log(error);
    }
  };
  
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      setbuffering(false);
      setfirstPage(true);
    } else {
      setbuffering(true);
      fetchdata();
    }
  }, []);

  return (
    <>
      {buffering ? (
        <Buffering />
      ) : (
        <div>
          {servererror ? (
            <ServerError />
          ) : (
            <div>{firstPage ? <FirstPage /> : <Home />}</div>
          )}
        </div>
      )}
    </>
  );
}
export default MainPage;
