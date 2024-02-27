import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { CardMedia, Rating } from "@mui/material";
import "./hotel.css";
const Hotel = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(4);
    console.log(data);
    const BASE_URL = "http://meokool-001-site1.ltempurl.com/";
    useEffect(() => {
        const fetchRealEstateAPI = async () => {
            try {
                const reponse = await axios.get(
                    `http://meokool-001-site1.ltempurl.com/api/Realestates/GetbyRealestateID?id=${id}`,
                );
                if (reponse.data.data) {
                    setData(reponse.data.data);
                    setLoading(false);
                } else {
                    setLoading(true);
                }
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };

        fetchRealEstateAPI();
    }, [id]);

    return (
        <>
            <Navbar />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="hotel-container">
                    <div className="row">
                        <div className="columns">
                            <div className="row columns-wrapper">
                                <div className="columns left">
                                    <h1 className="hotel-title">{data.name}</h1>
                                    <h4 className="h4-rating">
                                        <Rating name="simple-controlled" value={value} readOnly />
                                        <div className="hotel-rating">{data.location}</div>
                                    </h4>
                                    <CardMedia
                                        component="img"
                                        image={BASE_URL + data.photo}
                                        alt={data.name}
                                        style={{ width: "500px", marginRight: "16px" }}
                                    />
                                    <div className="hotel-column-small">
                                        <div className="hotel-descript">
                                            <p className="hotel-descript-p">
                                                Whether you come to New York City to go to the theater, to museums, to
                                                Lincoln Center, to Carnegie Hall, to dine in fine restaurants, to shop
                                                'till you drop or just to walk in the park… the Manhattan Club's perfect
                                                midtown location makes it easy to get there!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hotel-column-facility">
                                        <hr className="hotel-column-hr" />
                                        {/* <div className="row"> */}
                                        <div className="hotel-column">
                                            <h2 className="bold">On-Site Features & Amenities</h2>
                                            <ul className="column-4">
                                                <li>Accessible units</li>
                                                <li>Bar</li>
                                                <li>Business center</li>
                                                <li>Clubhouse</li>
                                                <li>Concierge</li>
                                                <li>Conference facilities</li>
                                                <li>Elevator</li>
                                                <li>Fitness center</li>
                                                <li>Housekeeping available</li>
                                                <li>Internet access</li>
                                            </ul>
                                        </div>
                                        <div className="hotel-column gutter"></div>
                                        <div className="hotel-column gutter"></div>
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="hotel-column-right">
                                    <div>View all TImeshare</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Hotel;
