import { Link } from "react-router-dom";
import "./searchItem.css";
import { Rating } from "@mui/material";
import React from "react";

const SearchItem = ({ searchResult }) => {
  const BASE_URL = "http://meokool-001-site1.ltempurl.com/";
  const [value, setValue] = React.useState(4);

  return (
    <div className="search-result-content search-result-list search-result-card-list">
      {searchResult
        .filter((item) => item.status === "1")
        .map((item) => {
          const photoUrls = item.photo ? item.photo.split(",") : [];
          return (
            <div key={item.id} className="result-card-wrapper small-12">
              <Link to={`/hotels/${item.id}`}>
                <div className="result-card">
                  <img
                    className="result-card--photo"
                    src={BASE_URL + photoUrls[0]}
                    alt={item.name}
                  />
                  <div className="result-card--info">
                    <h2 className="title-h2">
                      <p>{item.name}</p>
                    </h2>
                    <div className="result-card--info_location">
                      {item.location}
                    </div>

                    <Rating name="simple-controlled" value={value} readOnly />
                  </div>
                  <div className="result-card--cta">
                    <div className="result-card--cta_item">
                      <span>{item.price}/Night</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default SearchItem;
