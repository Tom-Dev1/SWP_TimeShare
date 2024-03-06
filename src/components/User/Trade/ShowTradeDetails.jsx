import React, { useEffect, useState } from "react";
import {
  BASE_URL,
  GetTradeByID,
  GetUserByID,
  GetbyRealestateID,
} from "../../API/APIConfigure";
import "./tabletrade.css";
import { useParams } from "react-router-dom";
import ConfirmTrade from "../Trade/ConfirmTrade";
import UpdateStatus from "./UpdateStatus";

const ShowTradeDetails = () => {
  const { id } = useParams();
  const [trade, setTrade] = useState(null);
  const [dataReal1, setDataReal1] = useState(null);
  const [dataReal2, setDataReal2] = useState(null);
  const [member1, setMember1] = useState(null);
  const [member2, setMember2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tradeResponse = await GetTradeByID(id);
        setTrade(tradeResponse);

        if (tradeResponse) {
          const real1Response = await GetbyRealestateID(
            tradeResponse.timeshareId1
          );
          setDataReal1(real1Response);

          const real2Response = await GetbyRealestateID(
            tradeResponse.timeshareId2
          );
          setDataReal2(real2Response);

          const member1Response = await GetUserByID(tradeResponse.memberId1);
          setMember1(member1Response);

          const member2Response = await GetUserByID(tradeResponse.memberId2);
          setMember2(member2Response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  function getStatus(status) {
    switch (status) {
      case "1":
        return "Chờ xác nhận";
      case "2":
        return "Đã xác nhận";
      case "3":
        return "Hủy";
      default:
        return "Trạng thái không xác định";
    }
  }

  return (
    <div>
      <div>
        {trade && (
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
                  {dataReal1 && (
                    <img
                      className="img-trade"
                      src={BASE_URL + dataReal1.photo.split(",")[0]}
                      alt={trade.name}
                    />
                  )}
                </td>
                <td>{dataReal1 && dataReal1.name}</td>
                <td>{dataReal1 && dataReal1.location}</td>
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
                {dataReal2 && (
                  <img
                    className="img-trade"
                    src={BASE_URL + dataReal2.photo.split(",")[0]}
                    alt={dataReal2.name}
                  />
                )}
              </td>
              <td>{dataReal2 && dataReal2.name}</td>
              <td>{dataReal2 && dataReal2.location}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        Trạng thái: {trade && getStatus(trade.status)}
        {trade && trade.status === "2" && member1 && member2 && (
          <div>
            <div>Thông tin trao đổi:</div>
            <div>Thông tin chủ của : {dataReal1.name}</div>
            <div>Tên: {member1.fullName}</div>
            <div>Tên: {member1.phone}</div>
            <div>Địa chỉ: {member1.address}</div>
            <div>Thông tin chủ của : {dataReal2.name}</div>
            <div>Tên: {member2.fullName}</div>
            <div>Tên: {member2.phone}</div>
            <div>Địa chỉ: {member2.address}</div>
          </div>
        )}
      </div>
      <UpdateStatus
        idTrade={id}
        status={trade && trade.status}
        datamem2={member2}
      />
    </div>
  );
};

export default ShowTradeDetails;
