// import "./list.css";
// import Navbar from "../../components/navbar/Navbar";
// import Header from "../../components/header/Header";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { DateRange } from "react-date-range";
// import SearchItem from "../../components/searchItem/SearchItem";
// import axios from "axios";

import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar";

// const List = () => {
//     const location = useLocation();
//     const [destination, setDestination] = useState(location.state.destination);
//     const [date, setDate] = useState(location.state.date);
//     const [openDate, setOpenDate] = useState(false);
//     const [options, setOptions] = useState(location.state.options);
//     const [searchResult, setSearchResult] = useState([]);

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

//     const handleSearch = () => {
//         getData();
//     };
//     return (
//         <div>
//             <Navbar />
//             <Header type="list" />
//             <div className="main-content full-width">
//                 <div className="mt-20"></div>
//                 <div className="row full-width">
//                     <div className="small-12 columns main-well main-well-large">
//                         <div className="row full-width columns-wrapper">
//                             <div className="small-12 large-4 columns search-result rw-sticky-parent">
//                                 <div className="listSearch">
//                                     <h1 className="lsTitle">Search</h1>
//                                     <div className="lsItem">
//                                         <label>Destination</label>
//                                         <input
//                                             placeholder={destination}
//                                             type="text"
//                                             onChange={(e) => setDestination(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="lsItem">
//                                         <label>Check-in Date</label>
//                                         <span onClick={() => setOpenDate(!openDate)}>{`${format(
//                                             date[0].startDate,
//                                             "MM/dd/yyyy",
//                                         )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
//                                         {openDate && (
//                                             <DateRange
//                                                 onChange={(item) => setDate([item.selection])}
//                                                 minDate={new Date()}
//                                                 ranges={date}
//                                             />
//                                         )}
//                                     </div>
//                                     <div className="lsItem">
//                                         <label>Options</label>
//                                         <div className="lsOptions">
//                                             <div className="lsOptionItem">
//                                                 <span className="lsOptionText">
//                                                     Min price <small>per night</small>
//                                                 </span>
//                                                 <input type="number" className="lsOptionInput" />
//                                             </div>
//                                             <div className="lsOptionItem">
//                                                 <span className="lsOptionText">
//                                                     Max price <small>per night</small>
//                                                 </span>
//                                                 <input type="number" className="lsOptionInput" />
//                                             </div>
//                                             <div className="lsOptionItem">
//                                                 <span className="lsOptionText">Adult</span>
//                                                 <input
//                                                     type="number"
//                                                     min={1}
//                                                     className="lsOptionInput"
//                                                     placeholder={options.adult}
//                                                 />
//                                             </div>
//                                             <div className="lsOptionItem">
//                                                 <span className="lsOptionText">Children</span>
//                                                 <input
//                                                     type="number"
//                                                     min={0}
//                                                     className="lsOptionInput"
//                                                     placeholder={options.children}
//                                                 />
//                                             </div>
//                                             <div className="lsOptionItem">
//                                                 <span className="lsOptionText">Room</span>
//                                                 <input
//                                                     type="number"
//                                                     min={1}
//                                                     className="lsOptionInput"
//                                                     placeholder={options.room}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <button onClick={handleSearch}>Search</button>
//                                 </div>
//                             </div>
//                             <div className="small-12 large-8 columns list-result">
//                                 <SearchItem searchResult={searchResult} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default List;
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./list.css";
import { Slider } from "@mui/material";
import axios from "axios";
import SearchItem from "../../components/searchItem/SearchItem";
import { useLocation } from "react-router-dom";

const List = () => {
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

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
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    return (
        <div>
            <Navbar />
            <main className="main-section">
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
                                                    <label className="text_search">Destination</label>
                                                    <input
                                                        className="input_search"
                                                        placeholder={destination}
                                                        type="text"
                                                        onChange={(e) => setDestination(e.target.value)}
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
                <div className="top-0 sticky z-20 transition-transform durian-400 transform bg-white search-form_condition px-5 ">
                    <div>
                        <div className="fresnel-container">
                            <div className="mx-auto wrapper-default rep-diverse">
                                <div className="RefinementRow_placeholder ">
                                    <div className="RowItems_itemList">
                                        <div className="RowItems_priceFilter">
                                            <div className="RefinementRowElement" ref={dropdownRef}>
                                                <button
                                                    className="RefinementRowElement_RowBtn"
                                                    onClick={toggleDropdown}
                                                >
                                                    <strong className="RefinementRowElement_titleItem block">
                                                        Price: <span className="font-normal">per night</span>
                                                    </strong>
                                                    <span
                                                        className={`RefinementRowElement_optionItem ${
                                                            showDropdown ? "border-blue-700" : "border-grey-300"
                                                        }`}
                                                        ref={dropdownRef}
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

                                                {showDropdown && (
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
                                                                                                min="2"
                                                                                                max="600"
                                                                                                value="2"
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
                                                                                                value="600"
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
                                                    <strong className="RefinementRowElement_titleItem block">
                                                        Filter
                                                    </strong>
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
                                                    <strong className="RefinementRowElement_titleItem block">
                                                        Filter
                                                    </strong>
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
                                                    <strong className="RefinementRowElement_titleItem block">
                                                        Filter
                                                    </strong>
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
                                                    <strong className="RefinementRowElement_titleItem block">
                                                        Filter
                                                    </strong>
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
                <div className="ResultListPage_content">
                    <SearchItem searchResult={searchResult} />
                </div>
            </main>
        </div>
    );
};

export default List;
