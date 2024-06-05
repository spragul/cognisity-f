import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { backendurl } from "../../Backendlink";
import { toast } from "react-toastify";
import Sidebar from "../sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function ListSiteObservation() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  async function getdata() {
    try {
      const response = await axios.get(`${backendurl}/site`);
      console.log(response);
      if (response.data.rd === true) {
        toast.success(response.data.message);
        setData(response.data.site);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  async function deletedata(ids){
    try {
        const response = await axios.delete(`${backendurl}/site/delete/${ids}`);
        console.log(response);
        if (response.data.rd === true) {
          toast.success(response.data.message);
          let mydata=data.filter((item)=>item._id!==ids);
          setData(mydata)
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
  }
  useEffect(() => {
    getdata();
  }, []);
  return (
    <Sidebar>
      <div className="site-container">
        <h1> Show Site Observation</h1>
        <div className="top-btn">
          <button
            type="button"
            className="new-sit-btn"
            onClick={() => navigate("/site/add")}
          >
            +NEW SITE OBSERVATION
          </button>
        </div>
        <div className="table-data">
          <Table
            responsive
            striped
            bordered
            hover
            variant="dark"
            className="order-table"
          >
            <thead>
              <tr>
                <th>project</th>
                <th>problem</th>
                <th>targetData</th>
                <th>person</th>
                <th>correction</th>
                <th>action</th>
                <th>status</th>
                <th>button</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.project}</td>
                  <td>{item.problem}</td>
                  <td>{item.targetData}</td>
                  <td>{item.person}</td>
                  <td>{item.correction}</td>
                  <td>{item.action}</td>
                  <td>{item.status == true ? "true" : "false"}</td>
                  <td><button className="btn bg-success" onClick={()=>deletedata(item._id)}><MdDelete/></button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Sidebar>
  );
}

export default ListSiteObservation;
