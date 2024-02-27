import { Link } from "react-router-dom";
import "./searchItem.css";
import { Rating } from "@mui/material";
import React from "react";

const SearchItem = ({ searchResult }) => {
    const BASE_URL = "http://meokool-001-site1.ltempurl.com/";
    console.log(searchResult);
    const [value, setValue] = React.useState(4);
    return (
        <div className="search-result-content search-result-list search-result-card-list">
            {searchResult.map((item) => (
                <div key={item.id} className="result-card-wrapper small-12">
                    <Link to={`/hotels/${item.id}`}>
                        <div className="result-card">
                            <img className="result-card--photo" src={BASE_URL + item.photo} alt={item.name} />
                            <div className="result-card--info">
                                <h2 className="title-h2">
                                    <p>{item.name}</p>
                                </h2>
                                <div className="result-card--info_location">{item.location}</div>

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
            ))}
        </div>
    );
};

export default SearchItem;
// import { CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
// import { Link } from "react-router-dom";

// const SearchItem = ({ searchResult }) => {
//     const BASE_URL = "http://meokool-001-site1.ltempurl.com/";
//     return (
//         <div className="columns-right">
//             <Grid container spacing={2}>
//                 {searchResult.map((realestate) => (
//                     <Grid item key={realestate.id} xs={12}>
//                         <div>
//                             <CardActionArea
//                                 component={Link}
//                                 to={`/hotels/${realestate.id}`}
//                                 style={{ display: "flex", justifyContent: "space-between" }}
//                             >
//                                 <CardMedia
//                                     component="img"
//                                     image={BASE_URL + realestate.photo}
//                                     alt={realestate.name}
//                                     style={{ width: "200px", marginRight: "16px" }}
//                                 />
//                                 <CardContent>
//                                     <Typography variant="h6">{realestate.name}</Typography>
//                                     <Typography variant="body2">{realestate.location}</Typography>
//                                 </CardContent>
//                                 <Typography variant="body2">{realestate.price}/night</Typography>
//                             </CardActionArea>
//                         </div>
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// };

// export default SearchItem;
