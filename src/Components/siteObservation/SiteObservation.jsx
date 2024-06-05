import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import Sidebar from "../sidebar/sidebar";
import { backendurl } from "../../Backendlink";

const siteSchema = yup.object({
  project: yup.string().required("Enter project"),
  problem: yup.string().required("Enter write proper problem"),
  targetData: yup.date().required("Enter the targetData"),
  status: yup.string().required("Enter  the status"),
  person: yup.string().required("Enter  the responeable person"),
  correction: yup.string().required("Enter  the correction"),
  action: yup.string().required("Enter the action"),
});

function SiteObservation() {
const navigate=useNavigate();


async function adddata({siteobj}){
  console.log(siteobj)
  try {
    const response = await axios.post(`${backendurl}/site/create`, siteobj);
    console.log(response)
    if (response.data.rd === true) {
      toast.success(response.data.message);
      navigate("/dashboard");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error)
  }
}

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        project: "",
        problem: "",
        targetData: "",
        person: "",
        correction: "",
        action: "",
        status: "true",
      },
      validationSchema: siteSchema,
      onSubmit: (siteobj) => {
        console.log(siteobj);
        adddata({siteobj});
      },
    });

  return (
    <Sidebar>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header" style={{ textAlign: "left" }}>
              <h2>site observation</h2>
            </div>
            <div className="card-body" style={{ textAlign: "left" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>project</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="project"
                      value={values.project}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.project && errors.project ? (
                  <p style={{ color: "crimson" }}>{errors.project}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>problem</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="problem"
                      value={values.problem}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.problem && errors.problem ? (
                  <p style={{ color: "crimson" }}>{errors.problem}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>TargetData</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="date"
                      name="targetData"
                      value={values.targetData}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.targetData && errors.targetData ? (
                  <p style={{ color: "crimson" }}>{errors.targetData}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Action</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="action"
                      value={values.action}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.action && errors.action ? (
                  <p style={{ color: "crimson" }}>{errors.action}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>person</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="person"
                      value={values.person}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.person && errors.person ? (
                  <p style={{ color: "crimson" }}>{errors.person}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Correction</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="correction"
                      value={values.correction}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                {touched.correction && errors.correction ? (
                  <p style={{ color: "crimson" }}>{errors.correction}</p>
                ) : (
                  ""
                )}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>status</label>
                    <select
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="Boolean"
                      name="status"
                      value={values.status}
                    >
                      <option selected value={true}>
                        true{" "}
                      </option>
                      <option value={false}>false</option>
                    </select>
                  </div>
                </div>
                {touched.status && errors.status ? (
                  <p style={{ color: "crimson" }}>{errors.status}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: "left" }}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>{" "}
              |
              <Link className="btn btn-danger" to={"/dashboard"}>
                Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}

export default SiteObservation;
