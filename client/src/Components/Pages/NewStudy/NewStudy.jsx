import React, { useState, useEffect } from "react";
import styles from "../NewStudy/NewStudy.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const NewStudy = () => {
  const navigate = useNavigate();
  // thease are the states to manage the local of the components
  const [selectedCustomVisitRow, setSelectedCustomVisitRow] = useState(null); // storing the index
  const [study, setStudy] = useState(""); // storing the study of the template
  const [loading, setLoading] = useState(false); // shjowing some effect based on the loading
  const [isCustomVisit, setIsCustomVisit] = useState(false); // count the current index of the applicatiuons
  const [customVisitValues, setCustomVisitValues] = useState(Array(1).fill("")); // handling the dropdown for the all the rows means based on the seelcted
  const [rows, setRows] = useState([
    { visit: "", day: "", plus: "", minus: "" },
  ]); // state for the rowsvand all the data of the components
  // this functio will change the study
  const [token, Settoken] = useState("");
  const StudyChange = (e) => {
    setStudy(e.target.value);
  };
  // when ever page reload this useffect will run
  useEffect(() => {
    // getting the token from the local Storage
    const tokens = localStorage.getItem("token");
    if (tokens) {
      Settoken(tokens);
    }
  }, []);

  // this will mange the Visit changes if anty changes happens this functio will ead and run
  const handleVisitChange = (e, index) => {
    const { name, value } = e.target;

    if (value === "Custom Visit") {
      setCustomVisitValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = ""; // Clear custom visit value for other rows
        return newValues;
      });
      setIsCustomVisit(true);
    } else {
      setIsCustomVisit(false);
    }
    // assigning the index of that rows later on will be using this
    setSelectedCustomVisitRow(index);
    // handing mutation in that state
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };
  // this functio will delete all the rows based on the index values i have used
  const handleDeleteRow = (index) => {
    const filteredRows = rows.filter((row, i) => i !== index);
    setRows(filteredRows);
    setCustomVisitValues((prevValues) => {
      const newValues = [...prevValues];
      newValues.splice(index, 1);
      return newValues;
    });
  };
  // this functio wi9ll changs all the rows value
  const handleChanges = (e, index) => {
    const { name, value } = e.target;

    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);

    setCustomVisitValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };
  // this function will add the extra rows and all the rows
  const addMoreRows = () => {
    setRows([...rows, { visit: "", day: "", plus: "", minus: "" }]);
    setCustomVisitValues((prevValues) => [...prevValues, ""]);
  };
  // this functio will save all the data in the backend this is async function

  const saveVisits = async (e) => {
    e.preventDefault();
    try {
      // add all the logic  here in the try block like makig api calls and reset all the things.
      setLoading(true);

      // making an api call to the endpoints
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/allstudydata`,
        // this is body sending to Server side
        {
          studyName: study,
          studyData: rows,
        },
        // this is the token jwt toekn sending in the response as headers
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        // making some delay in the applicatio of submit button to show some effect like loadin of spinners
        setTimeout(() => {
          setLoading(false);
          setRows([{ day: "", plus: "", minus: "", visit: "" }]);
          setStudy("");
          setIsCustomVisit(false);
          setCustomVisitValues(Array(rows.length).fill(""));
          toast.success("Study Added Successfully");
          navigate("/started");
        }, 2000);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
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
        {rows.length === 0 ? (
          <div className="text-center mt-5">
            <h5 className="text-primary">
              No rows selected. Please add rows to continue.
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
                      className={`form-control p-2`}
                      name="visit"
                      value={row.visit}
                      onChange={(e) => handleVisitChange(e, index)}
                    >
                      <option value="h">Select Visit</option>
                      <option value="Visit 1">Visit 1</option>
                      <option value="Visit 2">Visit 2</option>
                      <option value="Visit 3">Visit 3</option>
                      <option value="Visit 4">Visit 4</option>
                      <option value="Visit 5">Visit 5</option>
                      <option value="Custom Visit">Custom Visit</option>
                      <option value={customVisitValues[index]}>
                        {customVisitValues[index]}
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
                          onChange={(e) => handleChanges(e, index)}
                        />
                        <div className="">
                          <label
                            className="text-danger h5 mt-2 mx-3"
                            type="button"
                            onClick={() => {
                              setSelectedCustomVisitRow(null);
                              setIsCustomVisit(false);
                              setCustomVisitValues((prevValues) => {
                                const newValues = [...prevValues];
                                newValues[index] = ""; // Clear custom visit value for the current row
                                return newValues;
                              });
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
        {/* this will add new rows on click of the button  */}
        <div className="row d-flex justify-content-between">
          <div className="col-md-3 ">
            <button
              className={`btn btn-primary ${styles.buttons}`}
              onClick={addMoreRows}
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
              onClick={saveVisits}
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
