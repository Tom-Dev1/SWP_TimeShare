// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
// import { Slider } from "@mui/material";
// const SearchForm = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [destination, setDestination] = useState("");
//     const [searchResult, setSearchResult] = useState([]);

//     const handleSearch = async () => {
//         navigate("/hotels", { state: { destination } });
//     };

//     // const keepDiacritics = (str) => {
//     //     return str.normalize("NFD");
//     // };
//     // const getData = async () => {
//     //     try {
//     //         const response = await axios.get("http://meokool-001-site1.ltempurl.com/api/Realestates/GetAll");

//     //         if (response.data.data === null) {
//     //             throw new Error("Network response was not ok");
//     //         }
//     //         const normalizedDestination = keepDiacritics(destination.toLowerCase());
//     //         const filteredResults = response.data.data.filter(
//     //             (item) => item.location && keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
//     //         );

//     //         setSearchResult(filteredResults);
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };

//     // useEffect(() => {
//     //     getData();
//     // }, []);

//     // const handleSearch = () => {
//     //     getData();
//     // };

//     return (
//         <>
//             <div className="search-form ">
//                 <div className="fresnel-container">
//                     <div className="max-w-screen-2xl m-auto py-5">
//                         <div className="fresnel-container-form">
//                             <div className="SearchForm_searchForm SearchForm_isRow">
//                                 <div className="flex-grow w-full px-1 h-15 rounded-l-md">
//                                     <div className="searchForm_w-full">
//                                         <div className="searchForm_w-full_focus-within">
//                                             <div className="iconSearch_form">
//                                                 <span className="icon_search">
//                                                     <SearchIcon fontSize="large" />
//                                                 </span>
//                                             </div>
//                                             <span className="inputSearch_form">
//                                                 <label className="text_search">Destination</label>
//                                                 <input
//                                                     className="input_search"
//                                                     placeholder={destination}
//                                                     type="text"
//                                                     onChange={(e) => setDestination(e.target.value)}
//                                                 />
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <button onClick={handleSearch} className="searchButton_button">
//                                     <span className="AnimatedContent">
//                                         <span>Search</span>
//                                     </span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SearchForm;

// Search.js

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBed } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Search = () => {
//     const navigate = useNavigate();
//     const [destination, setDestination] = useState("");
//     const handleSearch = () => {
//         navigate(`/hotels?destination=${destination}`);
//         // setDestination(destination);
//     };
//     return (
//         <div className="headerSearch">
//             {/* Search input for destination */}
//             <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faBed} className="headerIcon" />
//                 <input
//                     type="text"
//                     placeholder="Bạn muốn đến đâu ?"
//                     value={destination}
//                     className="headerSearchInput"
//                     onChange={(e) => setDestination(e.target.value)}
//                 />
//             </div>

//             <div className="headerSearchItem">
//                 <button className="headerBtn" onClick={handleSearch}>
//                     Search
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Search;
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBed } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState } from "react";

// const Search = ({ onSearch }) => {
//     const [searchValue, setSearchValue] = useState("");

//     const handleSearch = () => {
//         onSearch(searchValue);
//     };
//     useEffect(() => {
//         const storedSearchTerm = localStorage.getItem("searchkey");
//         if (storedSearchTerm) {
//             const searchTerm = JSON.parse(storedSearchTerm);
//             setSearchValue(searchTerm.destination);
//         }
//     }, []);
//     return (
//         <div className="headerSearch">
//             {/* Ô search */}
//             <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faBed} className="headerIcon" />
//                 <input
//                     type="text"
//                     placeholder="Bạn muốn đến đâu ?"
//                     value={searchValue}
//                     className="headerSearchInput"
//                     onChange={(e) => setSearchValue(e.target.value)}
//                 />
//             </div>

//             {/* Nút tìm kiếm */}
//             <div className="headerSearchItem">
//                 <button className="headerBtn" onClick={handleSearch}>
//                     Search
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Search;
import SearchIcon from "@mui/icons-material/Search";

import { useEffect } from "react";

const Search = ({ onSearch, searchValue, setSearchValue }) => {
    useEffect(() => {
        const storedSearchTerm = localStorage.getItem("searchkey");
        if (storedSearchTerm) {
            setSearchValue(JSON.parse(storedSearchTerm).destination);
        }
    }, []);

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        localStorage.setItem("searchkey", JSON.stringify({ destination: value }));
    };

    return (
        <>
            <div className="search-form ">
                <div className="fresnel-container">
                    <div className="max-w-screen-2xl m-auto py-5">
                        <div className="fresnel-container-form">
                            <div className="SearchForm_searchForm SearchForm_isRow">
                                <div className="flex-grow w-full px-1 h-15 rounded-l-md">
                                    <div className="searchForm_w-full">
                                        <div className="searchForm_w-full_focus-within">
                                            <div className="iconSearch_form">
                                                <span className="icon_search">
                                                    <SearchIcon fontSize="large" />
                                                </span>
                                            </div>
                                            <span className="inputSearch_form">
                                                <label className="text_search">Điểm đến</label>
                                                <input
                                                    placeholder="Bạn muốn đến đâu ?"
                                                    type="text"
                                                    value={searchValue}
                                                    className="input_search"
                                                    onChange={handleChange}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleSearch} className="searchButton_button">
                                    <span className="AnimatedContent">
                                        <span>Search</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // <div className="headerSearch">
        //     <div className="headerSearchItem">
        //         <FontAwesomeIcon icon={faBed} className="headerIcon" />
        //         <input
        //             type="text"
        //             placeholder="Bạn muốn đến đâu ?"
        //             value={searchValue}
        //             className="headerSearchInput"
        //             onChange={handleChange}
        //         />
        //     </div>

        //     <div className="headerSearchItem">
        //         <button className="headerBtn" onClick={handleSearch}>
        //             Search
        //         </button>
        //     </div>
        // </div>
    );
};
export default Search;
