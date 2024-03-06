// import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./header.css";
// import { DateRange } from "react-date-range";
// import { useEffect, useRef, useState } from "react";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import SearchForm from "../Search/Search";

// export default function Header({ type }) {
//     const navigate = useNavigate();

//     const [destination, setDestination] = useState("");
//     const handleSearch = async () => {
//         navigate("/hotels", { state: { destination } });
//     };
//     return (
//         <div className="header">
//             <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
//                 <div className="headerList">
//                     <div className="headerListItem active">
//                         <FontAwesomeIcon icon={faBed} />
//                         <span>Lưu Trú</span>
//                     </div>
//                     <div className="headerListItem">
//                         <FontAwesomeIcon icon={faPlane} />
//                         <span>Chuyến Bay</span>
//                     </div>
//                     <div className="headerListItem">
//                         <FontAwesomeIcon icon={faCar} />
//                         <span>Thuê Xe </span>
//                     </div>
//                     <div className="headerListItem">
//                         <FontAwesomeIcon icon={faTaxi} />
//                         <span>Taxi</span>
//                     </div>
//                 </div>
//                 {type !== "list" && (
//                     <>
//                         <h1 className="headerTitile">Tìm chỗ nghỉ tiếp theo</h1>
//                         <p className="headerDesc">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</p>
//                         <button className="headerBtn">Đăng nhập / đăng ký </button>
//                         <div className="headerSearch"></div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }
// // import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import "./header.css";
// // import { DateRange } from "react-date-range";
// // import { useEffect, useRef, useState } from "react";
// // import "react-date-range/dist/styles.css"; // main css file
// // import "react-date-range/dist/theme/default.css"; // theme css file
// // import { format } from "date-fns";
// // import { useNavigate } from "react-router-dom";

// // export default function Header({ type }) {
// //     const navigate = useNavigate();
// //     const [openDate, setOpenDate] = useState(false);
// //     const [destination, setDestination] = useState("");
// //     // handleClickOoutside
// //     const optionsRef = useRef(null);
// //     const handleClickOutside = (event) => {
// //         if (optionsRef.current && !optionsRef.current.contains(event.target)) {
// //             setOpenOptions(false);
// //         }
// //     };

// //     useEffect(() => {
// //         document.addEventListener("mousedown", handleClickOutside);
// //         return () => {
// //             document.removeEventListener("mousedown", handleClickOutside);
// //         };
// //     }, []);
// //     const [date, setDate] = useState([
// //         {
// //             startDate: new Date(),
// //             endDate: new Date(),
// //             key: "selection",
// //         },
// //     ]);
// //     const [openOptions, setOpenOptions] = useState(false);
// //     const [options, setOptions] = useState({
// //         adult: 1,
// //         children: 0,
// //         room: 1,
// //     });
// //     const handleOpion = (name, operation) => {
// //         setOptions((prev) => {
// //             return {
// //                 ...prev,
// //                 [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
// //             };
// //         });
// //     };

// //     const handleSearch = async () => {
// //         // set states of header include (destination, date, options)

// //         navigate("/hotels", { state: { destination, date, options } });
// //     };
// //     return (
// //         <div className="header">
// //             <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
// //                 <div className="headerList">
// //                     <div className="headerListItem active">
// //                         <FontAwesomeIcon icon={faBed} />
// //                         <span>Lưu Trú</span>
// //                     </div>
// //                     <div className="headerListItem">
// //                         <FontAwesomeIcon icon={faPlane} />
// //                         <span>Chuyến Bay</span>
// //                     </div>
// //                     <div className="headerListItem">
// //                         <FontAwesomeIcon icon={faCar} />
// //                         <span>Thuê Xe </span>
// //                     </div>
// //                     <div className="headerListItem">
// //                         <FontAwesomeIcon icon={faTaxi} />
// //                         <span>Taxi</span>
// //                     </div>
// //                 </div>
// //                 {type !== "list" && (
// //                     <>
// //                         <h1 className="headerTitile">Tìm chỗ nghỉ tiếp theo</h1>
// //                         <p className="headerDesc">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</p>
// //                         <button className="headerBtn">Đăng nhập / đăng ký </button>
// //                         <div className="headerSearch">
// //                             <div className="headerSearchItem">
// //                                 <FontAwesomeIcon icon={faBed} className="headerIcon" />
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Bạn muốn đến đâu ?"
// //                                     className="headerSearchInput"
// //                                     onChange={(e) => setDestination(e.target.value)}
// //                                 />
// //                             </div>
// //                             <div className="headerSearchItem">
// //                                 <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
// //                                 <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(
// //                                     date[0].startDate,
// //                                     "MM/dd/yyyy",
// //                                 )} to  ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
// //                                 {openDate && (
// //                                     <DateRange
// //                                         editableDateInputs={true}
// //                                         onChange={(item) => setDate([item.selection])}
// //                                         moveRangeOnFirstSelection={false}
// //                                         ranges={date}
// //                                         className="date"
// //                                     />
// //                                 )}
// //                             </div>
// //                             <div className="headerSearchItem">
// //                                 <FontAwesomeIcon icon={faPerson} className="headerIcon" />
// //                                 <span
// //                                     onClick={() => setOpenOptions(!openOptions)}
// //                                     className="headerSearchText"
// //                                 >{`${options.adult} Người lớn - ${options.children} Trẻ em - ${options.room} Phòng`}</span>
// //                                 {openOptions && (
// //                                     <div className="options" ref={optionsRef}>
// //                                         <div className="optionItem">
// //                                             <span className="optionText">Người Lớn</span>
// //                                             <div className="optionCounter">
// //                                                 <button
// //                                                     disabled={options.adult <= 1}
// //                                                     className="optionCounterButton"
// //                                                     onClick={() => handleOpion("adult", "d")}
// //                                                 >
// //                                                     -
// //                                                 </button>
// //                                                 <span className="optionCounterNumber">{options.adult}</span>
// //                                                 <button
// //                                                     className="optionCounterButton"
// //                                                     onClick={() => handleOpion("adult", "i")}
// //                                                 >
// //                                                     +
// //                                                 </button>
// //                                             </div>
// //                                         </div>
// //                                         <div className="optionItem">
// //                                             <span className="optionText">Trẻ em</span>
// //                                             <div className="optionCounter">
// //                                                 <button
// //                                                     disabled={options.children <= 0}
// //                                                     className="optionCounterButton"
// //                                                     onClick={() => handleOpion("children", "d")}
// //                                                 >
// //                                                     -
// //                                                 </button>
// //                                                 <span className="optionCounterNumber">{options.children}</span>
// //                                                 <button
// //                                                     className="optionCounterButton"
// //                                                     onClick={() => handleOpion("children", "i")}
// //                                                 >
// //                                                     +
// //                                                 </button>
// //                                             </div>
// //                                         </div>
// //                                         <div className="optionItem">
// //                                             <span className="optionText">Phòng</span>
// //                                             <div className="optionCounter">
// //                                                 <button
// //                                                     disabled={options.room <= 1}
// //                                                     className="optionCounterButton"
// //                                                     onClick={() => handleOpion("room", "d")}
// //                                                 >
// //                                                     -
// //                                                 </button>
// //                                                 <span className="optionCounterNumber">{options.room}</span>
// //                                                 <button
// //                                                     className="optionCounterButton"
// //                                                     onClick={() => handleOpion("room", "i")}
// //                                                 >
// //                                                     +
// //                                                 </button>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                             <div className="headerSearchItem">
// //                                 <button className="headerBtn" onClick={handleSearch}>
// //                                     Search
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }
// Header.js

// import { useNavigate } from "react-router-dom";
// import Search from "../Search/Search";

// const Header = () => {
//     const navigate = useNavigate();

//     const handleSearch = (searchValue) => {
//         const searchTerm = {
//             destination: searchValue,
//         };
//         localStorage.setItem("searchkey", JSON.stringify(searchTerm));
//         navigate("/hotels");
//     };
//     return (
//         <div className="header">
//             <Search onSearch={handleSearch} />
//         </div>
//     );
// };

// export default Header;
import { Link } from "react-router-dom";
import bg1 from "../../assets/img/banner.png";
import "./header.css";
const Header = () => {
    return (
        <div className="header-element-contain">
            <div className="header-img-bg">
                <img src={bg1} alt="bg" width={"100%"} height={"100%"} />
                <div className="banner-container">
                    <div className="banner-info">
                        <div className="banner-tit">Chào mừng đến với bình nguyên vô tận</div>
                    </div>
                    <div className="bann-des">Trải nghiệm cảm giác với mọi giác quan!</div>
                    <div>
                        <button>
                            <Link to="/hotels">Khám phá</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
