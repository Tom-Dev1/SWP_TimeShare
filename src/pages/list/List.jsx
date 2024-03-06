// // import "./list.css";
// // import Navbar from "../../components/navbar/Navbar";
// // import Header from "../../components/header/Header";
// // import { useLocation } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { format } from "date-fns";
// // import { DateRange } from "react-date-range";
// // import SearchItem from "../../components/searchItem/SearchItem";
// // import axios from "axios";

// // const List = () => {
// //     const location = useLocation();
// //     const [destination, setDestination] = useState(location.state.destination);
// //     const [date, setDate] = useState(location.state.date);
// //     const [openDate, setOpenDate] = useState(false);
// //     const [options, setOptions] = useState(location.state.options);
// //     const [searchResult, setSearchResult] = useState([]);

// //     const keepDiacritics = (str) => {
// //         return str.normalize("NFD");
// //     };

// //     const getData = async () => {
// //         try {
// //             const response = await axios.get("http://meokool-001-site1.ltempurl.com/api/Realestates/GetAll");

// //             if (response.data.data === null) {
// //                 throw new Error("Network response was not ok");
// //             }
// //             const normalizedDestination = keepDiacritics(destination.toLowerCase());
// //             const filteredResults = response.data.data.filter(
// //                 (item) => item.location && keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
// //             );

// //             setSearchResult(filteredResults);
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };

// //     useEffect(() => {
// //         getData();
// //     }, []);

// //     const handleSearch = () => {
// //         getData();
// //     };
// //     return (
// //         <div>
// //             <Navbar />
// //             <Header type="list" />
// //             <div className="main-content full-width">
// //                 <div className="mt-20"></div>
// //                 <div className="row full-width">
// //                     <div className="small-12 columns main-well main-well-large">
// //                         <div className="row full-width columns-wrapper">
// //                             <div className="small-12 large-4 columns search-result rw-sticky-parent">
// //                                 <div className="listSearch">
// //                                     <h1 className="lsTitle">Search</h1>
// //                                     <div className="lsItem">
// //                                         <label>Destination</label>
// //                                         <input
// //                                             placeholder={destination}
// //                                             type="text"
// //                                             onChange={(e) => setDestination(e.target.value)}
// //                                         />
// //                                     </div>
// //                                     <div className="lsItem">
// //                                         <label>Check-in Date</label>
// //                                         <span onClick={() => setOpenDate(!openDate)}>{`${format(
// //                                             date[0].startDate,
// //                                             "MM/dd/yyyy",
// //                                         )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
// //                                         {openDate && (
// //                                             <DateRange
// //                                                 onChange={(item) => setDate([item.selection])}
// //                                                 minDate={new Date()}
// //                                                 ranges={date}
// //                                             />
// //                                         )}
// //                                     </div>
// //                                     <div className="lsItem">
// //                                         <label>Options</label>
// //                                         <div className="lsOptions">
// //                                             <div className="lsOptionItem">
// //                                                 <span className="lsOptionText">
// //                                                     Min price <small>per night</small>
// //                                                 </span>
// //                                                 <input type="number" className="lsOptionInput" />
// //                                             </div>
// //                                             <div className="lsOptionItem">
// //                                                 <span className="lsOptionText">
// //                                                     Max price <small>per night</small>
// //                                                 </span>
// //                                                 <input type="number" className="lsOptionInput" />
// //                                             </div>
// //                                             <div className="lsOptionItem">
// //                                                 <span className="lsOptionText">Adult</span>
// //                                                 <input
// //                                                     type="number"
// //                                                     min={1}
// //                                                     className="lsOptionInput"
// //                                                     placeholder={options.adult}
// //                                                 />
// //                                             </div>
// //                                             <div className="lsOptionItem">
// //                                                 <span className="lsOptionText">Children</span>
// //                                                 <input
// //                                                     type="number"
// //                                                     min={0}
// //                                                     className="lsOptionInput"
// //                                                     placeholder={options.children}
// //                                                 />
// //                                             </div>
// //                                             <div className="lsOptionItem">
// //                                                 <span className="lsOptionText">Room</span>
// //                                                 <input
// //                                                     type="number"
// //                                                     min={1}
// //                                                     className="lsOptionInput"
// //                                                     placeholder={options.room}
// //                                                 />
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                     <button onClick={handleSearch}>Search</button>
// //                                 </div>
// //                             </div>
// //                             <div className="small-12 large-8 columns list-result">
// //                                 <SearchItem searchResult={searchResult} />
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default List;

// import { useEffect, useRef, useState } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import "./list.css";
// import { Slider } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import SearchItem from "../../components/searchItem/SearchItem";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import SearchForm from "../../components/Search/Search";
// import axios from "axios";

// const List = () => {
//     const location = useLocation();
//     const [destination, setDestination] = useState(location.state.destination);
//     console.log(location.state);
//     const [searchResult, setSearchResult] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [priceRange, setPriceRange] = useState([0, 1000]);

//     const dropdownRef = useRef(null);
//     const toggleDropdown = () => {
//         setShowDropdown(!showDropdown);
//     };
//     const handlePriceChange = (event, newValue) => {
//         setPriceRange(newValue);
//     };

//     const keepDiacritics = (str) => {
//         return str.normalize("NFD");
//     };
//     const getData = async () => {
//         try {
//             const response = await axios.get("http://meokool-001-site1.ltempurl.com/api/Realestates/GetAll");

//             if (response.data.data === null) {
//                 throw new Error("Network response was not ok");
//             }
//             const normalizedDestination = keepDiacritics(destination.toLowerCase());
//             const filteredResults = response.data.data.filter(
//                 (item) => item.location && keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
//             );

//             setSearchResult(filteredResults);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     // const handleSearch = () => {
//     //     getData();
//     // };
//     return (
//         <div>
//             <Navbar />
//             <main className="main-section">
//                 <SearchForm />
//                 <div className="top-0 sticky z-20 transition-transform durian-400 transform bg-white search-form_condition px-5 ">
//                     <div>
//                         <div className="fresnel-container">
//                             <div className="mx-auto wrapper-default rep-diverse">
//                                 <div className="RefinementRow_placeholder ">
//                                     <div className="RowItems_itemList">
//                                         <div className="RowItems_priceFilter">
//                                             <div className="RefinementRowElement" ref={dropdownRef}>
//                                                 <button
//                                                     className="RefinementRowElement_RowBtn"
//                                                     onClick={toggleDropdown}
//                                                 >
//                                                     <strong className="RefinementRowElement_titleItem block">
//                                                         Price: <span className="font-normal">per night</span>
//                                                     </strong>
//                                                     <span
//                                                         className={`RefinementRowElement_optionItem ${
//                                                             showDropdown ? "border-blue-700" : "border-grey-300"
//                                                         }`}
//                                                         ref={dropdownRef}
//                                                     >
//                                                         <span className="truncate w-full">
//                                                             <span></span>
//                                                             <span>$2 - $600 +</span>
//                                                         </span>
//                                                         <span className="optionItem_plus rotate-90 transform">
//                                                             <KeyboardArrowDownIcon />
//                                                         </span>
//                                                     </span>
//                                                 </button>

//                                                 {showDropdown && (
//                                                     <div className="flyout_container z-60 absolute top-0 pt-1 Flyout_fadeIn opacity-0 transition-opacity durian-200 opacity-100">
//                                                         <div className="Flyout_wrapper bg-white shadow-popover rounded rounded-sm">
//                                                             <div className="text-m rounded-sm overflow-hidden RefinementRowElement_elementContent RefinementRowElement_extended">
//                                                                 <section className="FilterDropdown_section FilterDropdown_stickyFilters">
//                                                                     <div className="FilterDropdown_children">
//                                                                         <section className="BudgetFilter_flyoutContainer w-full bg-white border-grey-200 BudgetFilter_sizedContainer leading-normal text-l p-4 border-b">
//                                                                             <h4 className="Heading_heading BudgetFilter_flyoutHeading mb-4">
//                                                                                 Set price range
//                                                                             </h4>
//                                                                             <section>
//                                                                                 <div className="slider_mg">
//                                                                                     <Slider
//                                                                                         value={priceRange}
//                                                                                         onChange={handlePriceChange}
//                                                                                         valueLabelDisplay="auto"
//                                                                                         aria-labelledby="range-slider"
//                                                                                         min={0}
//                                                                                         max={1000}
//                                                                                     />
//                                                                                 </div>
//                                                                                 <div className="display_row">
//                                                                                     <div className="flex-1">
//                                                                                         <strong className="text-display">
//                                                                                             Min price
//                                                                                         </strong>
//                                                                                         <div className="PriceInput_inputContainer">
//                                                                                             <input
//                                                                                                 className="PriceInput_input"
//                                                                                                 type="number"
//                                                                                                 min="2"
//                                                                                                 max="600"
//                                                                                                 value="2"
//                                                                                             />
//                                                                                             <span className="PriceInput_label">
//                                                                                                 $2
//                                                                                             </span>
//                                                                                         </div>
//                                                                                     </div>
//                                                                                     <span className="flex-0 ">-</span>
//                                                                                     <div className="flex-1">
//                                                                                         <strong className="text-display">
//                                                                                             Max price
//                                                                                         </strong>
//                                                                                         <div className="PriceInput_inputContainer">
//                                                                                             <input
//                                                                                                 className="PriceInput_input"
//                                                                                                 type="number"
//                                                                                                 min="2"
//                                                                                                 max="600"
//                                                                                                 value="600"
//                                                                                             />
//                                                                                             <span className="PriceInput_label">
//                                                                                                 1000000vnd
//                                                                                             </span>
//                                                                                         </div>
//                                                                                     </div>
//                                                                                 </div>
//                                                                             </section>
//                                                                         </section>
//                                                                     </div>
//                                                                     <footer className="FilterDropdown_footer FilterDropdown_ifVisible">
//                                                                         <button className="FilterDropdown_resetBtn">
//                                                                             Reset
//                                                                         </button>
//                                                                         <button className="FilterDropdown_applyBtn">
//                                                                             Apply
//                                                                         </button>
//                                                                     </footer>
//                                                                 </section>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="RowItems_rowItem">
//                                             <div className="RefinementRowElement">
//                                                 <button className="RefinementRowElement_RowBtn">
//                                                     <strong className="RefinementRowElement_titleItem block">
//                                                         Filter
//                                                     </strong>
//                                                     <span className="RefinementRowElement_optionItem border-grey-300">
//                                                         <span className="truncate w-full">
//                                                             <span></span>
//                                                             <span>Select</span>
//                                                         </span>
//                                                         <span className="optionItem_plus rotate-90 transform">
//                                                             <KeyboardArrowDownIcon />
//                                                         </span>
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <div className="RowItems_rowItem">
//                                             <div className="RefinementRowElement">
//                                                 <button className="RefinementRowElement_RowBtn">
//                                                     <strong className="RefinementRowElement_titleItem block">
//                                                         Filter
//                                                     </strong>
//                                                     <span className="RefinementRowElement_optionItem border-grey-300">
//                                                         <span className="truncate w-full">
//                                                             <span></span>
//                                                             <span>Select</span>
//                                                         </span>
//                                                         <span className="optionItem_plus rotate-90 transform">
//                                                             <KeyboardArrowDownIcon />
//                                                         </span>
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <div className="RowItems_rowItem">
//                                             <div className="RefinementRowElement">
//                                                 <button className="RefinementRowElement_RowBtn">
//                                                     <strong className="RefinementRowElement_titleItem block">
//                                                         Filter
//                                                     </strong>
//                                                     <span className="RefinementRowElement_optionItem border-grey-300">
//                                                         <span className="truncate w-full">
//                                                             <span></span>
//                                                             <span>Select</span>
//                                                         </span>
//                                                         <span className="optionItem_plus rotate-90 transform">
//                                                             <KeyboardArrowDownIcon />
//                                                         </span>
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <div className="RowItems_rowItem">
//                                             <div className="RefinementRowElement">
//                                                 <button className="RefinementRowElement_RowBtn">
//                                                     <strong className="RefinementRowElement_titleItem block">
//                                                         Filter
//                                                     </strong>
//                                                     <span className="RefinementRowElement_optionItem border-grey-300">
//                                                         <span className="truncate w-full">
//                                                             <span></span>
//                                                             <span>Select</span>
//                                                         </span>
//                                                         <span className="optionItem_plus rotate-90 transform">
//                                                             <KeyboardArrowDownIcon />
//                                                         </span>
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
// //                 <div className="ResultListPage_content">
// //                     <SearchItem searchResult={searchResult} />
// //                 </div>
// //             </main>
// //         </div>
//     );
// };

// export default List;

// import { useEffect, useState } from "react";
// import Search from "../../components/Search/Search";

// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const List = () => {
//     const location = useLocation();

//     const [searchResult, setSearchResult] = useState([]);

//     const [destination, setDestination] = useState("");

//     useEffect(() => {
//         const searchParams = new URLSearchParams(location.search);
//         const destinationParam = searchParams.get("destination") || "";
//         setDestination(destinationParam);
//     }, [location.search, location.state]);

//     const keepDiacritics = (str) => {
//         return str.normalize("NFD");
//     };
//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const response = await axios.get("http://meokool-001-site1.ltempurl.com/api/Realestates/GetAll");

//                 if (response.data.data === null) {
//                     throw new Error("Network response was not ok");
//                 }
//                 const normalizedDestination = keepDiacritics(destination.toLowerCase());
//                 const filteredResults = response.data.data.filter(
//                     (item) =>
//                         item.location && keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
//                 );

//                 setSearchResult(filteredResults);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         getData();
//     }, [destination]);
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
//     // }, [destination]);

//     return (
//         <div>
//             <Search setDestination={setDestination} />

//             {searchResult.map((item, index) => (
//                 <div key={index}>
//                     <h3>{item.name}</h3>
//                     <p>{item.location}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default List;

// import { useEffect, useState } from "react";
// import Search from "../../components/Search/Search";
// import { GetAllRealestates } from "../../components/API/APIConfigure";

// const List = () => {
//     const [searchResult, setSearchResult] = useState([]);
//     const [searchValue, setSearchValue] = useState("");

//     useEffect(() => {
//         const storedSearchTerm = localStorage.getItem("searchkey");
//         if (storedSearchTerm) {
//             console.log(storedSearchTerm);
//             const searchTerm = JSON.parse(storedSearchTerm);
//             setSearchValue(searchTerm.destination);
//         }
//     }, []);

//     const keepDiacritics = (str) => {
//         return str.normalize("NFD");
//     };

//     const getData = async () => {
//         try {
//             const response = await GetAllRealestates();

//             if (response === null) {
//                 throw new Error("Network response was not ok");
//             }
//             const normalizedDestination = keepDiacritics(searchValue.toLowerCase());
//             const filteredResults = response.filter(
//                 (item) => item.location && keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
//             );

//             setSearchResult(filteredResults);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     useEffect(() => {
//         getData();
//     }, [searchValue]);

//     const handleSearch = (searchValue) => {
//         const searchTerm = {
//             destination: searchValue,
//         };
//         localStorage.setItem("searchkey", JSON.stringify(searchTerm));
//         setSearchValue(searchValue);
//     };
//     return (
//         <div>
//             <Search onSearch={handleSearch} searchValue={searchValue} />

//             {searchResult.length === 0 ? (
//                 <div>Không tìm thấy kết quả trùng khớp</div>
//             ) : (
//                 searchResult.map((item, index) => (
//                     <div key={index}>
//                         <h3>{item.name}</h3>
//                         <p>{item.location}</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default List;
import { useEffect, useRef, useState } from "react";
import Search from "../../components/Search/Search";
import "./list.css";
import { GetAllRealestates } from "../../components/API/APIConfigure";
import Navbar from "../../components/navbar/Navbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchItem from "../../components/searchItem/SearchItem";
import { Slider } from "@mui/material";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
const List = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [isSearchValueLoaded, setIsSearchValueLoaded] = useState(false);
    const [dateDropdown, setDateDropdown] = useState(false);
    const [priceDropdown, setPricePropdown] = useState(false);

    const dropdownRef = useRef(null);
    const dateDropdownRef = useRef(null);

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const toggleDropdown = (dropdown) => {
        if (dropdown === "date") {
            setDateDropdown(!dateDropdown);
            setPricePropdown(false);
        } else if (dropdown === "price") {
            setPricePropdown(!priceDropdown);
            setDateDropdown(false);
        }
    };
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            dateDropdownRef.current &&
            !dateDropdownRef.current.contains(event.target)
        ) {
            setPricePropdown(false);
            setDateDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    useEffect(() => {
        const storedSearchTerm = localStorage.getItem("searchkey");
        if (storedSearchTerm) {
            const searchTerm = JSON.parse(storedSearchTerm);
            setSearchValue(searchTerm.destination);
            setIsSearchValueLoaded(true);
        }

        getData();
    }, []);
    useEffect(() => {
        if (isSearchValueLoaded) {
            getData();
        }
    }, [isSearchValueLoaded]);
    const keepDiacritics = (str) => {
        return str.normalize("NFD");
    };

    const getData = async () => {
        try {
            const response = await GetAllRealestates();
            if (response === null) {
                throw new Error("Network response was not ok");
            }
            const normalizedDestination = keepDiacritics(searchValue.toLowerCase());
            const filteredResults = response.filter(
                (item) => item.location && keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
            );
            setSearchResult(filteredResults);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (searchValue) => {
        const searchTerm = {
            destination: searchValue,
        };
        localStorage.setItem("searchkey", JSON.stringify(searchTerm));
        setSearchValue(searchValue);
        getData();
    };

    return (
        <div className="main-section">
            <Navbar />
            <Search onSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="top-0 sticky z-20 transition-transform durian-400 transform bg-white search-form_condition px-5 ">
                <div>
                    <div className="fresnel-container">
                        <div className="mx-auto wrapper-default rep-diverse">
                            <div className="RefinementRow_placeholder ">
                                <div className="RowItems_itemList">
                                    <div className="RowItems_priceFilter">
                                        <div className="RefinementRowElement" ref={dateDropdownRef}>
                                            <button
                                                className="RefinementRowElement_RowBtn"
                                                onClick={() => toggleDropdown("date")}
                                            >
                                                <strong className="RefinementRowElement_titleItem block">Date</strong>
                                                <span className="RefinementRowElement_optionItem border-grey-300">
                                                    <span className="truncate w-full lsItem">
                                                        <span></span>
                                                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                                        <span className="headerSearchText">{`${format(
                                                            date[0].startDate,
                                                            "MM/dd/yyyy",
                                                        )} to  ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                                                    </span>
                                                    <span className="optionItem_plus rotate-90 transform">
                                                        <KeyboardArrowDownIcon />
                                                    </span>
                                                </span>
                                            </button>
                                            {dateDropdown && (
                                                <DateRange
                                                    editableDateInputs={true}
                                                    onChange={(item) => setDate([item.selection])}
                                                    moveRangeOnFirstSelection={false}
                                                    ranges={date}
                                                    className="date"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="RowItems_rowItem">
                                        <div className="RefinementRowElement" ref={dropdownRef}>
                                            <button
                                                className="RefinementRowElement_RowBtn"
                                                onClick={() => toggleDropdown("price")}
                                            >
                                                <strong className="RefinementRowElement_titleItem block">
                                                    Price: <span className="font-normal">per night</span>
                                                </strong>
                                                <span
                                                    className={`RefinementRowElement_optionItem ${
                                                        priceDropdown ? "border-blue-700" : "border-grey-300"
                                                    }`}
                                                >
                                                    <span className="truncate w-full">
                                                        <span></span>

                                                        <span>$2 - $600 +</span>
                                                    </span>
                                                    <span className="optionItem_plus rotate-90 transform">
                                                        <KeyboardArrowDownIcon />
                                                    </span>
                                                </span>
                                            </button>
                                            {priceDropdown && (
                                                <div className="flyout_container z-60 absolute top-0 pt-1 Flyout_fadeIn opacity-0 transition-opacity durian-200 opacity-100">
                                                    <div className="Flyout_wrapper bg-white shadow-popover rounded rounded-sm">
                                                        <div className="text-m rounded-sm overflow-hidden RefinementRowElement_elementContent RefinementRowElement_extended">
                                                            <section className="FilterDropdown_section FilterDropdown_stickyFilters">
                                                                <div className="FilterDropdown_children">
                                                                    <section className="BudgetFilter_flyoutContainer w-full bg-white border-grey-200 BudgetFilter_sizedContainer leading-normal text-l p-4 border-b">
                                                                        <h4 className="Heading_heading BudgetFilter_flyoutHeading mb-4">
                                                                            Set price range
                                                                        </h4>
                                                                        <section>
                                                                            <div className="slider_mg">
                                                                                <Slider
                                                                                    value={priceRange}
                                                                                    onChange={handlePriceChange}
                                                                                    valueLabelDisplay="auto"
                                                                                    aria-labelledby="range-slider"
                                                                                    min={0}
                                                                                    max={1000}
                                                                                />
                                                                            </div>
                                                                            <div className="display_row">
                                                                                <div className="flex-1">
                                                                                    <strong className="text-display">
                                                                                        Min price
                                                                                    </strong>
                                                                                    <div className="PriceInput_inputContainer">
                                                                                        <input
                                                                                            className="PriceInput_input"
                                                                                            type="number"
                                                                                            // min="2"
                                                                                            // max="600"
                                                                                            // value=""
                                                                                        />
                                                                                        <span className="PriceInput_label">
                                                                                            $2
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <span className="flex-0 ">-</span>
                                                                                <div className="flex-1">
                                                                                    <strong className="text-display">
                                                                                        Max price
                                                                                    </strong>
                                                                                    <div className="PriceInput_inputContainer">
                                                                                        <input
                                                                                            className="PriceInput_input"
                                                                                            type="number"
                                                                                            min="2"
                                                                                            max="600"
                                                                                            // value="600"
                                                                                        />
                                                                                        <span className="PriceInput_label">
                                                                                            1000000vnd
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </section>
                                                                    </section>
                                                                </div>
                                                                <footer className="FilterDropdown_footer FilterDropdown_ifVisible">
                                                                    <button className="FilterDropdown_resetBtn">
                                                                        Reset
                                                                    </button>
                                                                    <button className="FilterDropdown_applyBtn">
                                                                        Apply
                                                                    </button>
                                                                </footer>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="RowItems_rowItem">
                                        <div className="RefinementRowElement">
                                            <button className="RefinementRowElement_RowBtn">
                                                <strong className="RefinementRowElement_titleItem block">Filter</strong>
                                                <span className="RefinementRowElement_optionItem border-grey-300">
                                                    <span className="truncate w-full">
                                                        <span></span>
                                                        <span>Select</span>
                                                    </span>
                                                    <span className="optionItem_plus rotate-90 transform">
                                                        <KeyboardArrowDownIcon />
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="RowItems_rowItem">
                                        <div className="RefinementRowElement">
                                            <button className="RefinementRowElement_RowBtn">
                                                <strong className="RefinementRowElement_titleItem block">Filter</strong>
                                                <span className="RefinementRowElement_optionItem border-grey-300">
                                                    <span className="truncate w-full">
                                                        <span></span>
                                                        <span>Select</span>
                                                    </span>
                                                    <span className="optionItem_plus rotate-90 transform">
                                                        <KeyboardArrowDownIcon />
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="RowItems_rowItem">
                                        <div className="RefinementRowElement">
                                            <button className="RefinementRowElement_RowBtn">
                                                <strong className="RefinementRowElement_titleItem block">Filter</strong>
                                                <span className="RefinementRowElement_optionItem border-grey-300">
                                                    <span className="truncate w-full">
                                                        <span></span>
                                                        <span>Select</span>
                                                    </span>
                                                    <span className="optionItem_plus rotate-90 transform">
                                                        <KeyboardArrowDownIcon />
                                                    </span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {searchResult.length === 0 ? (
                <div>Không tìm thấy kết quả trùng khớp</div>
            ) : (
                <SearchItem searchResult={searchResult} />
            )}
        </div>
    );
};

export default List;
