// SignUp.js

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../SignUp/SignUp.module.css";
import Spinner from "../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const SignUp = () => {
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [spinner, Setspinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // for showing the toogle effect of password
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpassword: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // this function will responsible for form validation and others stuff like making api call
  const handleSubmit = async (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    e.preventDefault();
    try {
      if (
        formData.name.length === 0 ||
        formData.email.length === 0 ||
        formData.password.length === 0 ||
        formData.cpassword.length === 0
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      // this is for the email format validation
      if (!emailRegex.test(formData.email)) {
        toast.error("Invalid email format");
        return;
      }
      // this is for password check validation
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password should be at least 6 characters long and include at least one letter, one number, and one special character"
        );
        return;
      }
      // matches both passwords arre same then only go
      if (formData.password !== formData.cpassword) {
        toast.error("Password and confirm Password should be same");
        return;
      }
      // the perform api request after validation
      // this will hash the password so no can see in payload
      Setspinner(true);
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
      });

      setTimeout(() => {
        if (res.status === 200) {
          toast.success("User Registration Success");
          Setspinner(false);
          setFormData({
            name: "",
            password: "",
            cpassword: "",
            email: "",
          });
        }
      }, 2000);

      // setting the response  then redircts to login page once i got the response
    } catch (error) {
      if (error && error.response && error.response.status === 400) {
        setTimeout(() => {
          toast.error("Email already register");
          Setspinner(false);
        }, 1000);
      }

      // console.log(error);
    }
  };

  return (
    <div className={`${styles.center} ${styles.background}`}>
      <div className={`container`}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-title text-center mt-2 text-primary">
                Registration
              </h2>
              <div className="card-body py-md-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className={`form-control p-2 ${styles.formControl}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder="Enter Your Email"
                      type="text"
                      className={`form-control p-2 ${styles.formControl}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        className={`form-control p-2 ${styles.formControl}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`btn btn-link ${styles.togglePassword}`}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className={`form-control p-2 ${styles.formControl}`}
                        name="cpassword"
                        value={formData.cpassword}
                        onChange={handleChange}
                        required
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className={`btn btn-link ${styles.togglePassword}`}
                        >
                          <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      type="button"
                      onClick={() => navigate("/login")}
                      className={`text-primary ${styles.SignUp}`}
                    >
                      Already have an Account?
                    </label>
                  </div>
                  <button
                    disabled={
                      formData.password.length === 0 ||
                      formData.cpassword.length === 0 ||
                      formData.name.length === 0 ||
                      formData.email.length === 0
                    }
                    type="submit"
                    className={`btn btn-primary w-100 p-2 ${styles.SignUp}`}
                  >
                    {spinner ? <Spinner /> : "SignUp"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
