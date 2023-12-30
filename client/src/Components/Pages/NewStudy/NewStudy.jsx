import React, { useState } from "react";
import styles from "../NewStudy/NewStudy.module.css";
import { useNavigate } from "react-router-dom";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";

const NewStudy = () => {
  // Add a state variable to keep track of the selected row for custom visit
  const [selectedCustomVisitRow, setSelectedCustomVisitRow] = useState(null);

  const navigate = useNavigate();
  const [study, Setstudy] = useState("");
  const [loading, Setloading] = useState(false);
  const [isCustomVisit, setIsCustomVisit] = useState(false); // THIS IS FOR CUSTOM VISIT LIKE ONCE USER CLICKED ON THE CUSTOM VISIT I INPUT BOX WILL OPEN
  const [customVisitValue, setcustomVisitValue] = useState("");
  const [rows, setRows] = useState([
    { visit: "", day: "", plus: "", minus: "" },
  ]);

  // const onChange: DatePickerProps["onChange"] = (date, dateString, index) => {
  //   const newRows = [...rows];
  //   newRows[index].date = dateString;
  //   setRows(newRows);
  // };
  const StudyChange = (e) => {
    Setstudy(e.target.value);
  };
  // this functio will handle the change based on the rows data onchange
  const handleVisitChange = (e, index) => {
    const { name, value } = e.target;

    // first check if the index is there then worksd
    setIsCustomVisit(value === "Custom Visit");
    setSelectedCustomVisitRow(index);
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };
  const handleDeleteRow = (index) => {
    const FilteredRows = rows.filter((row, i) => i !== index);
    setRows(FilteredRows);
  };
  // this will add new dynamic rows based on the clicked
  const AddMoreRows = () => {
    setRows([...rows, { visit: "", day: "", plus: "", minus: "" }]);
  };
  // thsi function will will save all the visits
  const Savevisits = (e) => {
    // console.log(rows, study);
    Setloading(true);
    e.preventDefault();

    setTimeout(() => {
      Setloading(false);
      setRows([
        {
          day: "",
          plus: "",
          minus: "",
          visit: "",
        },
      ]);
      Setstudy("");
      setIsCustomVisit(false);
    }, 2000);
    // Reset rows to have a single object with empty values

    // Reset study to an empty string
  };
  // thsi function will handle all the chanes in the custom visit make it to the state

  const handlechanges = (e, index) => {
    const { name, value } = e.target;
    const newRows = [...rows];

    newRows[index][name] = value;
    setRows(newRows);

    // If you want to set the value to some other state variable, you can do that too
    setcustomVisitValue(value);
  };

  return (
    <>
      <div className={`${styles.box} mt-5`}>
        <div className="col-md-12 text-center">
          <h3 className="text-dark">Add new study Here </h3>
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
              <label className={`${styles.text} mb-1 mx-1 text-dark`}>
                Name of Study
              </label>
              <input
                type="text"
                onChange={StudyChange}
                value={study}
                className={`form-control p-2 `}
                placeholder="Enter your new Study"
                name="study"
              />
            </div>
          </div>
        </div>
        {/* // adding some  conditional rendering */}
        {rows.length === 0 ? (
          <div className="text-center mt-5">
            <h5 className="text-primary">
              No rows selected please add rows to Continue
            </h5>
          </div>
        ) : (
          <>
            {rows.map((row, index) => (
              <>
                <div
                  className="row mt-4 d-flex justify-content-between "
                  key={index}
                >
                  <div className="col-md-3">
                    <label className="mb-2 mt-2 text-dark">Visits</label>
                    <select
                      className={`form-control p-2 `}
                      name="visit"
                      value={row.visit}
                      onChange={(e) => handleVisitChange(e, index)}
                    >
                      <option value="">Select Visit</option>
                      <option value="Visit 1">Visit 1</option>
                      <option value="Visit 2">Visit 2</option>
                      <option value="Visit 3">Visit 1</option>
                      <option value="Visit 4">Visit 2</option>
                      <option value="Visit 5">Visit 2</option>
                      <option value="Custom Visit">Custom Visit</option>
                      <option value={customVisitValue}>
                        {customVisitValue}
                      </option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label className="mb-2 mt-2 text-dark">Day</label>

                    <input
                      onChange={(e) => handleVisitChange(e, index)}
                      type="number"
                      className={`form-control p-2`}
                      name="day"
                      value={row.day}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="mb-2 mt-2 text-dark">Minus</label>

                    <input
                      onChange={(e) => handleVisitChange(e, index)}
                      type="number"
                      name="minus"
                      value={row.minus}
                      className={`form-control p-2 `}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="mb-2 mt-2 text-dark">Plus</label>

                    <input
                      onChange={(e) => handleVisitChange(e, index)}
                      name="plus"
                      type="number"
                      value={row.plus}
                      className={`form-control p-2`}
                    />
                  </div>

                  <div className="col-md-1 mt-5 h4">
                    <label
                      className="text-danger"
                      onClick={() => handleDeleteRow(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </label>
                  </div>
                </div>
                {/* // for showing the custom visit optios based on the states */}
                {isCustomVisit && selectedCustomVisitRow === index && (
                  <div className="row mt-4">
                    <div className="col-md-3">
                      <div className="input-group">
                        <input
                          name="visit"
                          style={{ width: "160px" }}
                          type="text"
                          className={`form-control p-2`}
                          placeholder="Enter custom visit"
                          onChange={(e) => handlechanges(e, index)}
                        />
                        <div className="">
                          <label
                            className="text-danger h5 mt-2 mx-3"
                            type="button"
                            onClick={() => {
                              setSelectedCustomVisitRow(null);
                              setIsCustomVisit(false);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </>
        )}

        <div className="row d-flex justify-content-between">
          <div className="col-md-3 ">
            <button
              className={`btn btn-primary ${styles.buttons}`}
              onClick={AddMoreRows}
            >
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
              More
            </button>
          </div>
          <div className="col-md-3 ">
            <button
              disabled={
                study.length === 0 ||
                rows.some(
                  (row) =>
                    row.visit.length === 0 ||
                    row.day.length === 0 ||
                    row.plus.length === 0 ||
                    row.minus.length === 0
                )
              }
              onClick={Savevisits}
              className={`btn btn-primary ${styles.buttons}`}
            >
              {loading ? "...Saving" : "Save Visit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewStudy;
