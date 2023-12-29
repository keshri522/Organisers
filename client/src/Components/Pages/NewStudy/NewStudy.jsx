import React, { useState } from "react";
import styles from "../NewStudy/NewStudy.module.css";
import { useNavigate } from "react-router-dom";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";

const NewStudy = () => {
  const navigate = useNavigate();

  const [study, setStudy] = useState("");
  const [rows, setRows] = useState([{ visit: "", date: "" }]);

  const onChange: DatePickerProps["onChange"] = (date, dateString, index) => {
    const newRows = [...rows];
    newRows[index].date = dateString;
    setRows(newRows);
  };

  const StudyChange = (e) => {
    setStudy(e.target.value);
  };

  const handleVisitChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].visit = e.target.value;
    setRows(newRows);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const AddMoreRows = () => {
    setRows([...rows, { visit: "", date: "" }]);
  };

  const Savevisits = (e) => {
    e.preventDefault();

    setStudy("");
    setRows([
      {
        visit: " ",
        date: " ",
      },
    ]);
  };

  return (
    <>
      <div className={`${styles.box} mt-5`}>
        <div className="col-md-12 text-center">
          <h3 className="text-white">Add new study Here </h3>
          <hr />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <button className="btn btn-danger btn-block">My Studies</button>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className={`form-group`}>
              <label className={`${styles.text} mb-1 mx-1 text-white`}>
                Name of Study
              </label>
              <input
                type="text"
                onChange={StudyChange}
                value={study}
                className={`form-control p-2 ${styles.tansparent}`}
                placeholder="Enter your new Study"
              />
            </div>
          </div>
        </div>

        {rows.map((row, index) => (
          <div className="row mt-4 d-flex justify-content-between " key={index}>
            <div className="col-md-5">
              <label className="mb-2 mt-2 text-white">Visits</label>
              <select
                className={`form-control p-2 ${styles.tansparent}`}
                name="visit"
                value={row.visit}
                onChange={(e) => handleVisitChange(e, index)}
              >
                <option value="">Select Visit</option>
                <option value="Visit 1">Visit 1</option>
                <option value="Visit 2">Visit 2</option>
              </select>
            </div>

            <div className="col-md-5">
              <label className="mb-2 mt-2 text-white">Date</label>
              <DatePicker
                className={`form-control p-2 ${styles.tansparent}`}
                onChange={(date, dateString) =>
                  onChange(date, dateString, index)
                }
              />
            </div>

            <div className="col-md-1 mt-5 h4">
              {rows.length > 1 && (
                <label
                  className="text-danger"
                  onClick={() => handleDeleteRow(index)}
                >
                  <i className="fa-solid fa-trash"></i>
                </label>
              )}
            </div>
          </div>
        ))}
        <div className="row d-flex justify-content-between">
          <div className="col-md-6 mt-5">
            <button className="btn btn-primary  w-100   " onClick={AddMoreRows}>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
              More
            </button>
          </div>
          <div className="col-md-6 mt-5">
            <button onClick={Savevisits} className="btn btn-primary w-100 ">
              Save visits
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewStudy;
