// import "./list.css";
// import Navbar from "../../components/navbar/Navbar";
// import Header from "../../components/header/Header";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { DateRange } from "react-date-range";
// import SearchItem from "../../components/searchItem/SearchItem";
// import axios from "axios";

// const List = () => {
//     const location = useLocation();
//     const [destination, setDestination] = useState(location.state.destination);
//     console.log(destination);
//     const [date, setDate] = useState(location.state.date);
//     const [openDate, setOpenDate] = useState(false);
//     const [options, setOptions] = useState(location.state.options);
//     const [searchResult, setSearchResult] = useState([]);

//     const keepDiacritics = (str) => {
//         return str.normalize("NFD");
//     };

//     const getData = async () => {
//         try {
//             const reponse = await axios.get("http://meokool-001-site1.ltempurl.com/api/Realestates/GetAll");
//             if (reponse.data.data === null) {
//                 throw new Error("Network response was not ok");
//             }

//             const normalizedDestination = keepDiacritics(destination.toLowerCase());
//             const filteredResults = reponse.data.data.filter((item) =>
//                 keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
//             );
//             setSearchResult(filteredResults);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     const handleSearch = () => {
//         getData();
//     };
//     return (
//         <div>
//             <Navbar />
//             <Header type="list" />
//             <div className="listContainer">
//                 <div className="listWrapper">
//                     <div className="search-result-header">
//                         <div className="listSearch">
//                             <h1 className="lsTitle">Search</h1>
//                             <div className="lsItem">
//                                 <label>Destination</label>
//                                 <input
//                                     placeholder={destination}
//                                     type="text"
//                                     onChange={(e) => setDestination(e.target.value)}
//                                 />
//                             </div>
//                             <div className="lsItem">
//                                 <label>Check-in Date</label>
//                                 <span onClick={() => setOpenDate(!openDate)}>{`${format(
//                                     date[0].startDate,
//                                     "MM/dd/yyyy",
//                                 )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
//                                 {openDate && (
//                                     <DateRange
//                                         onChange={(item) => setDate([item.selection])}
//                                         minDate={new Date()}
//                                         ranges={date}
//                                     />
//                                 )}
//                             </div>
//                             <div className="lsItem">
//                                 <label>Options</label>
//                                 <div className="lsOptions">
//                                     <div className="lsOptionItem">
//                                         <span className="lsOptionText">
//                                             Min price <small>per night</small>
//                                         </span>
//                                         <input type="number" className="lsOptionInput" />
//                                     </div>
//                                     <div className="lsOptionItem">
//                                         <span className="lsOptionText">
//                                             Max price <small>per night</small>
//                                         </span>
//                                         <input type="number" className="lsOptionInput" />
//                                     </div>
//                                     <div className="lsOptionItem">
//                                         <span className="lsOptionText">Adult</span>
//                                         <input
//                                             type="number"
//                                             min={1}
//                                             className="lsOptionInput"
//                                             placeholder={options.adult}
//                                         />
//                                     </div>
//                                     <div className="lsOptionItem">
//                                         <span className="lsOptionText">Children</span>
//                                         <input
//                                             type="number"
//                                             min={0}
//                                             className="lsOptionInput"
//                                             placeholder={options.children}
//                                         />
//                                     </div>
//                                     <div className="lsOptionItem">
//                                         <span className="lsOptionText">Room</span>
//                                         <input
//                                             type="number"
//                                             min={1}
//                                             className="lsOptionInput"
//                                             placeholder={options.room}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <button onClick={handleSearch}>Search</button>
//                         </div>
//                     </div>
//                     <div className="listResult">
//                         <SearchItem searchResult={searchResult} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default List;
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";

const List = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    console.log(destination);
    const [date, setDate] = useState(location.state.date);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [searchResult, setSearchResult] = useState([]);

    const keepDiacritics = (str) => {
        return str.normalize("NFD");
    };

    const getData = async () => {
        try {
            const response = await axios.get("http://meokool-001-site1.ltempurl.com/api/Realestates/GetAll");

            if (response.data.data === null) {
                throw new Error("Network response was not ok");
            }

            const normalizedDestination = keepDiacritics(destination.toLowerCase());
            const filteredResults = response.data.data.filter(
                (item) => item.location && keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
            );

            setSearchResult(filteredResults);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSearch = () => {
        getData();
    };
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="main-content full-width">
                <div className="mt-20"></div>
                <div className="row full-width">
                    <div className="small-12 columns main-well main-well-large">
                        <div className="row full-width columns-wrapper">
                            <div className="small-12 large-4 columns search-result rw-sticky-parent">
                                <div className="listSearch">
                                    <h1 className="lsTitle">Search</h1>
                                    <div className="lsItem">
                                        <label>Destination</label>
                                        <input
                                            placeholder={destination}
                                            type="text"
                                            onChange={(e) => setDestination(e.target.value)}
                                        />
                                    </div>
                                    <div className="lsItem">
                                        <label>Check-in Date</label>
                                        <span onClick={() => setOpenDate(!openDate)}>{`${format(
                                            date[0].startDate,
                                            "MM/dd/yyyy",
                                        )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                                        {openDate && (
                                            <DateRange
                                                onChange={(item) => setDate([item.selection])}
                                                minDate={new Date()}
                                                ranges={date}
                                            />
                                        )}
                                    </div>
                                    <div className="lsItem">
                                        <label>Options</label>
                                        <div className="lsOptions">
                                            <div className="lsOptionItem">
                                                <span className="lsOptionText">
                                                    Min price <small>per night</small>
                                                </span>
                                                <input type="number" className="lsOptionInput" />
                                            </div>
                                            <div className="lsOptionItem">
                                                <span className="lsOptionText">
                                                    Max price <small>per night</small>
                                                </span>
                                                <input type="number" className="lsOptionInput" />
                                            </div>
                                            <div className="lsOptionItem">
                                                <span className="lsOptionText">Adult</span>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    className="lsOptionInput"
                                                    placeholder={options.adult}
                                                />
                                            </div>
                                            <div className="lsOptionItem">
                                                <span className="lsOptionText">Children</span>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    className="lsOptionInput"
                                                    placeholder={options.children}
                                                />
                                            </div>
                                            <div className="lsOptionItem">
                                                <span className="lsOptionText">Room</span>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    className="lsOptionInput"
                                                    placeholder={options.room}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleSearch}>Search</button>
                                </div>
                            </div>
                            <div className="small-12 large-8 columns list-result">
                                <SearchItem searchResult={searchResult} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
