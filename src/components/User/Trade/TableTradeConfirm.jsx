import React, { useEffect, useState } from "react";
import { BASE_URL, GetbyRealestateID } from "../../API/APIConfigure";
import "./tabletrade.css";
import { useParams } from "react-router-dom";
import ConfirmTrade from "../Trade/ConfirmTrade";

const TableTradeConfirm = () => {
  const { id } = useParams();
  const [dataReal, setDataReal] = useState(null);
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const Realestate = JSON.parse(localStorage.getItem("Realestate"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetbyRealestateID(id);
        setDataReal(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDay") {
      setStartDay(value);
    } else if (name === "endDay") {
      setEndDay(value);
    }
  };

  return (
    <div>
      <div>
        {dataReal && (
          <table>
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên</th>
                <th>Địa điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    className="img-trade"
                    src={BASE_URL + dataReal.photo.split(",")[0]}
                    alt={dataReal.name}
                  />
                </td>
                <td>{dataReal.name}</td>
                <td>{dataReal.location}</td>
              </tr>
            </tbody>
          </table>
        )}
        <table>
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Địa điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  className="img-trade"
                  src={BASE_URL + Realestate.photo.split(",")[0]}
                  alt={Realestate.name}
                />
              </td>
              <td>{Realestate.name}</td>
              <td>{Realestate.location}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="form-group-date">
        <label htmlFor="startDay">Ngày bắt đầu: </label>
        <input
          type="date"
          id="startDay"
          name="startDay"
          value={startDay}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group-date">
        <label htmlFor="endDay">Ngày kết thúc: </label>
        <input
          type="date"
          id="endDay"
          name="endDay"
          value={endDay}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <ConfirmTrade
        yourReal={dataReal}
        theirReal={Realestate}
        startDay={startDay}
        endDay={endDay}
      />
    </div>
  );
};

export default TableTradeConfirm;
