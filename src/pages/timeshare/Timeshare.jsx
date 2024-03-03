import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import './TimeShare.css';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
const Timeshare = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const BASE_URL = 'http://meokool-001-site1.ltempurl.com/';
  const [realEstateData, setRealEstateData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://meokool-001-site1.ltempurl.com/api/Timeshares/GetbyRealestateID?id=${id}`
        );

        if (response.data.data === null) {
          throw new Error('Network response was not ok');
        } else {
          setData(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    // Fetch data
    fetchData();
    // Retrieve real estate data from localStorage only once when the component mounts
    const realEstateDataString = localStorage.getItem('Realestate');
    const realData = JSON.parse(realEstateDataString);
    console.log(realData);
    setRealEstateData(realData);
  }, [id]);

  const imageReal = JSON.parse(localStorage.getItem('imageReal'));

  //format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        {realEstateData && (
          <div key={realEstateData.id} className="searchItem">
            <img src={BASE_URL + imageReal[0]} alt="Real Estate" className="siImg" />
            <div className="siDesc">
              <h1 className="siTitle">{realEstateData.name}</h1>
              <span className="siDistance">Cách 500m tới trung tâm thành phố</span>
              <span className="siTaxiOp">Miễn phí taxi từ sân bay</span>
              <span className="siLocation">Địa chỉ: {realEstateData.location}</span>
              <span className="siRating">
                <div className="siValue">Đánh giá:</div>
                <Rating name="size-large" defaultValue={5} precision={0.5} readOnly />
              </span>
            </div>
            <div className="siDetails">
              <div className="siDetailTexts">
                <button className="siCheckButton">Trao đổi kỳ nghỉ</button>
              </div>
            </div>
          </div>
        )}
        <div className="table-container">
          <div>
            <table className="table">
              <tr>
                <th></th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Đêm</th>
                <th>Giá</th>
                <th>Số lượng khách</th>
                <th></th>
              </tr>
              {data.map((item) => {
                // Log item.status
                console.log('item.status:', item.status);
                const className = item.status ? 'itemStatus-active' : 'itemStatus-inactive';
                console.log('Class name applied:', className);
                return (
                  <tr key={item.id} className={className}>
                    <td>{item.status ? <div className="tb_new">Mới!</div> : null}</td>
                    <td>{formatDate(item.startDay)}</td>
                    <td>{formatDate(item.endDay)}</td>
                    <td>
                      {item.endDay && item.startDay
                        ? Math.ceil(
                            (new Date(item.endDay) - new Date(item.startDay)) /
                              (1000 * 60 * 60 * 24)
                          )
                        : 'Invalid date'}
                    </td>
                    <td>{item.price.toLocaleString()}/VNĐ</td>
                    <td>{item.status}</td>
                    <td>
                      <button className="tb_btn">
                        <Link className="tb_link" to={`/posting/${item.id}`}>
                          Bấm để thuê
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Timeshare;
