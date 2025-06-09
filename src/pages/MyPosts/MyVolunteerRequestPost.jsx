import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyVolunteerRequestPost = () => {
    const {user} = useContext(AuthContext);
    const [myRequests, setMyRequests] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/my-volunteer-requests?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyRequests(data));
  }, [user.email]);

  return <div>
    <h1>my request = {myRequests.length}</h1>
  </div>;
};

export default MyVolunteerRequestPost;
