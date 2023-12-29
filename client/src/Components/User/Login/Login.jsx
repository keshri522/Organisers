import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import { toast } from "react-toastify";
import Spinner from "../../Spinner/Spinner";
import axios from "axios"; // this is npm package for making the request ot an api call
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  // creating the instance of the naviage hooks

  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };
  // this function handles all the api call and froms validation on click
  const handleSubmit = async (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    e.preventDefault();
    try {
      if (formData.email.length === 0 || formData.password.length === 0) {
        toast.error("Please fill all the fields");
        return;
      }

      if (!emailRegex.test(formData.email)) {
        toast.error("Invalid email format");
        return;
      }

      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password should be at least 6 characters long and include at least one letter, one number, and one special character"
        );
        return;
      }

      setSpinner(true);
      let res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      setTimeout(() => {
        if (res.status === 200) {
          toast.success("User Registration Success");
          setSpinner(false);
          setFormData({
            password: "",
            email: "",
          });

          // sending the token to local Storage for further processing
          localStorage.setItem("toekn", res.data.User.token);
          // navigating to the home page once everything is done like validation
          navigate("/started");
        }
      }, 2000);
    } catch (error) {
      if (error && error.response && error.response.status === 400) {
        setTimeout(() => {
          toast.error("Invalid Credentials");
          setSpinner(false);
        }, 2000);
      }
    }
  };

  return (
    <div className={`${styles.center} ${styles.background}`}>
      <div className={`container `}>
        <div className="row justify-content-center">
          <div className="col-md-5 ">
            <div className="card ">
              <h2 className="card-title text-center mt-2 text-primary">
                Login
              </h2>
              <div className="card-body py-md-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      placeholder="Enter Your Email"
                      type="text"
                      className={`form-control p-2 ${styles.formControl}`}
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

                  <div className="mb-2 ">
                    <label
                      onClick={() => {
                        navigate("/signup");
                      }}
                      type="button"
                      className={`form-check-label text-primary ${styles.login}`}
                      htmlFor="subscribe"
                    >
                      Don't have an Account?
                    </label>
                  </div>
                  <button
                    disabled={
                      formData.email.length === 0 ||
                      formData.password.length === 0
                    }
                    type="submit"
                    className={`btn btn-primary w-100 p-2 ${styles.login}`}
                  >
                    {spinner ? <Spinner /> : "Login"}
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

export default Login;
