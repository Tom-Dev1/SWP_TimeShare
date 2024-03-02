import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Timeshare = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTimeshare = async () => {
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
    fetchTimeshare();
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <div>
              <p>Start Day: {item.startDay}</p>
              <p>End Day: {item.endDay}</p>
            </div>
            <button>
              <Link to={`/posting/${item.id}`}>View Book</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeshare;
