import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../User/Login/Login";
import SignUp from "../User/SignUp/SignUp";
import AddStudy from "../Pages/AddStudy/AddStudy";
import NewStudy from "../Pages/NewStudy/NewStudy";
const Paths = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/started" element={<AddStudy />}></Route>
        <Route path="/newStudy" element={<NewStudy />}>
          {" "}
        </Route>
      </Routes>
    </>
  );
};

export default Paths;
