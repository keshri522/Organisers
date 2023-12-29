import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../AddStudy/AddStudy.module.css";
const AddStudy = () => {
  const navigate = useNavigate();
  // first protect the routes  means only logged in user can visit this routes not any once  if some want to enter the routes then first it validates the token
  //   useEffect(() => {
  //     const token = localStorage.getItem("toekn");
  //     if (token) {
  //       navigate("/started");
  //     } else {
  //       navigate("/");
  //     }
  //   });

  return (
    <>
      <div className={`${styles.box}`}>
        <div className="col-md-12 text-center">
          <h2 className="text-white">Welcome to Arya's Project</h2>
          <br />
          <button
            onClick={() => navigate("/newStudy")}
            className="btn btn-outline-warning p-2"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default AddStudy;
