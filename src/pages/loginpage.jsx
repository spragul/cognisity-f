import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { backendurl } from "../Backendlink";

const userSchema = yup.object({
  email: yup.string().required("Enter your email"),
  password: yup.string().required("Enter your password"),
});

export default function Loginpage() {
  const [showpassword, setShowpassword] = useState("password");
  const [popup, setPopup] = useState("none");
  const [organizationName, setOrganizationName] = useState("");
  const[name,setName]=useState("");
  const [contactNumber,setContactNumber]=useState(0);
  const [email,setEmail]=useState("");
  const [address,setAddress]=useState("")
  const [password,setPassword]=useState("");
  console.log(popup);
  const navigate = useNavigate();

  //login backend
  const loginuser = async ({ userdata }) => {
    try {
      const response = await axios.post(`${backendurl}/user/login`, userdata);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("myname", response.data.myname);
        sessionStorage.setItem("myOrgination", response.data.myOrgination);
        sessionStorage.setItem("myid", response.data.myid);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }
  };

  //formik controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: (userdata) => {
        console.log(userdata);
        loginuser({ userdata });
      },
    });

  //signup
  const signhandle = async(e) => {
    e.preventDefault();
    const data={organizationName,name,password,contactNumber,email,address}
    console.log(data);
    try {
      const response = await axios.post(`${backendurl}/user/signup`, data);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }
    setPopup("none");

   
  };

  return (
    <>
      <div
        className="login-container"
        style={{ opacity:`${popup === "none" ? "100%" : "50%"}`}}
      >
        <div className="image-container">
          <img
            className="login-img"
            src="https://cognisite-cs-image-prod.s3.amazonaws.com/landingpage.png"
            title="logimg"
            alt="logimg"
          />
        </div>
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="cog-logo-img">
            <img
              className="cog-logo"
              src="https://cognisite-cs-image-prod.s3.amazonaws.com/logo1.jpg"
              title="log"
              alt="log"
            />
          </div>
          <ul className="text-part">
            <li className="log-content">
              <h3>Sign in to account</h3>
              <p className="top-header">Enter your email & password to login</p>
            </li>
            <li className="log-content">
              <label >Email Address</label>
              <input
                
                placeholder="Enter Your Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                name="email"
                className="login-input"
              />
              {touched.email && errors.email ? (
                <p style={{ color: "crimson", margin: "0px" }}>
                  {errors.email}
                </p>
              ) : (
                ""
              )}
            </li>
            <li className="log-content">
              <div className="for-btn">
                <label htmlFor="password">Password </label>
                <span>
                  <Link to="/forgotpassword">Forgot password?</Link>
                </span>
              </div>

              <div className="buttonIn">
                <input
                  id="password"
                  name="password"
                  type={showpassword}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Your Password"
                  className="login-input "
                />
                {showpassword === "text" ? (
                  <button type="button"
                    onClick={() => setShowpassword("password")}
                    className="input-button"
                  >
                    hide
                  </button>
                ) : (
                  <button type="button"
                    onClick={() => setShowpassword("text")}
                    className="input-button"
                  >
                    show
                  </button>
                )}
                {touched.password && errors.password ? (
                  <p style={{ color: "crimson" }}>{errors.password}</p>
                ) : (
                  ""
                )}
              </div>
            </li>
            <li className="log-content-btn">
              <button className="log-dum-btn" type="submit">
                SIGN IN
              </button>
            </li>
            <li className="log-content">
              <p className="mb-0 sig-btn">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setPopup("block")}
                  style={{ color: "blue" }}
                >
                  Create Account
                </button>
              </p>
            </li>
          </ul>
        </form>
      </div>
      <div style={{ display: `${popup}` }} className="signup-page-container">
        <h2 className="sign-heading">Signup Form</h2>
        <form onSubmit={signhandle}>
          <ul className="sign-text">
            <li className="signup-li">
              <label>
                <span className="star-icon">*</span>Organization Name
              </label>
              <input
                className="sign-input"
                type="text"
                required
                name="organizationName"
                placeholder="Enter Organization Name"
                value={organizationName}
                onChange={(e) =>
                  setOrganizationName(e.target.value)
                }
              />
            </li>

            <li className="signup-li">
              <label>
                <span className="star-icon">*</span>Name
              </label>
              <input
                type="text"
                required
                className="sign-input"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </li>
            <li className="signup-li">
              <label>
                <span className="star-icon">*</span>Contact Number
              </label>
              <input
                type="number"
                required
                className="sign-input"
                name="contactNumber"
                placeholder="Enter contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </li>
            <li className="signup-li">
              <label>
                <span className="star-icon">*</span>Email
              </label>
              <input
                type="email"
                required
                className="sign-input"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li className="signup-li">
              <label>
                <span className="star-icon">*</span>Password
              </label>
              <input
                type="password"
                required
                className="sign-input"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li className="signup-li">
              <label>
                <span className="star-icon">*</span>Address
              </label>
              <input
                type="text"
                required
                className="sign-input"
                name="address"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
          </ul>
          <div className="sign-buton-container">
            <button className="sign-button" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
