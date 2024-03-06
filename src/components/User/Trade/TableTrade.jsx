import React, { useEffect, useState } from "react";
import { BASE_URL, GetAllRealestatesByMemberID } from "../../API/APIConfigure";
import "./tabletrade.css";
import { useParams, useNavigate } from "react-router-dom";
const TableTrade = ({ idUser }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllRealestatesByMemberID(idUser);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleRowClick = (itemId) => {
    navigate(`/trade/confirm/${itemId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Hình ảnh</th>
          <th>Tên</th>
          <th>Địa điểm</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} onClick={() => handleRowClick(item.id)}>
            <td>
              <img
                className="img-trade"
                src={BASE_URL + item.photo.split(",")[0]}
                alt={item.name}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTrade;
