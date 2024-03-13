// const getData = async () => {
//     try {
//         const response = await GetAllRealestates();
//         if (response === null) {
//             throw new Error("Network response was not ok");
//         }
//         const normalizedDestination = keepDiacritics(searchValue.toLowerCase());
//         const filteredResults = response.filter(
//             (item) => item.location && keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination),
//         );
//         setSearchResult(filteredResults);
//     } catch (error) {
//         console.log(error);
//     }
// };

import { useEffect, useRef, useState } from "react";
import Search from "../../components/Search/Search";
import "./list.css";
import { GetAllRealestates } from "../../components/API/APIConfigure";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import Filter from "../Filter/Filter";

const List = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isSearchValueLoaded, setIsSearchValueLoaded] = useState(false);
    const [minPrice, setMinPrice] = useState(1000);
    const [maxPrice, setMaxPrice] = useState(10000000);
    const [dateDropdown, setDateDropdown] = useState(false);
    const [priceDropdown, setPricePropdown] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [selectedPriceRange, setSelectedPriceRange] = useState(
        `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} VND +`,
    );
    const dropdownRef = useRef(null);
    const dateDropdownRef = useRef(null);
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
    useEffect(() => {
        const selectedDate = [...date];
        if (selectedDate[0].startDate.getTime() === selectedDate[0].endDate.getTime()) {
            const newEndDate = new Date(selectedDate[0].endDate);
            newEndDate.setDate(newEndDate.getDate() + 1);
            selectedDate[0].endDate = newEndDate;
            setDate(selectedDate);
        }
    }, [date]);
    const toggleDropdown = (dropdown) => {
        if (dropdown === "date") {
            setDateDropdown(!dateDropdown);
            setPricePropdown(false);
        } else if (dropdown === "price") {
            setPricePropdown(!priceDropdown);
            setDateDropdown(false);
        }
    };
    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
    };
    const handleMinInputChange = (event) => {
        const value = event.target.value.replace(/\D/g, "");
        if (!isNaN(value)) {
            setMinPrice(parseInt(value));
        }
    };
    const handleMaxInputChange = (event) => {
        const value = event.target.value.replace(/\D/g, "");
        if (!isNaN(value)) {
            setMaxPrice(parseInt(value));
        }
    };
    const handleApplyFilter = () => {
        const priceRange = `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} VND +`;
        getData();
        setSelectedPriceRange(priceRange);
    };
    const resetFilter = () => {
        setMinPrice(1000);
        setMaxPrice(10000000);
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
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [date]);
    const getData = async () => {
        try {
            const response = await GetAllRealestates();
            if (response === null) {
                throw new Error("Network response was not ok");
            }
            const normalizedDestination = keepDiacritics(searchValue.toLowerCase());
            const filteredResults = response.filter(
                (item) =>
                    item.location &&
                    keepDiacritics(item.location.toLowerCase()).includes(normalizedDestination) &&
                    item.timeshares.some((timeshare) => {
                        const timeshareStart = new Date(timeshare.startDay);
                        const timeshareEnd = new Date(timeshare.endDay);
                        const selectedStart = new Date(date[0].startDate);
                        const selectedEnd = new Date(date[0].endDate);
                        if (timeshareStart <= selectedEnd && timeshareEnd >= selectedStart) {
                            return true;
                        }
                        return false;
                    }) &&
                    item.timeshares.some((timeshare) => timeshare.price >= minPrice && timeshare.price <= maxPrice),
            );

            const timeshares = filteredResults.reduce((acc, realestate) => {
                const realestateTimeshares = realestate.timeshares.filter((timeshare) => {
                    const timeshareStart = new Date(timeshare.startDay);
                    const timeshareEnd = new Date(timeshare.endDay);
                    const selectedStart = new Date(date[0].startDate);
                    const selectedEnd = new Date(date[0].endDate);
                    return (
                        timeshareStart <= selectedEnd &&
                        timeshareEnd >= selectedStart &&
                        timeshare.price >= minPrice &&
                        timeshare.price <= maxPrice
                    );
                });
                return [...acc, ...realestateTimeshares];
            }, []);

            console.log(timeshares);
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
            <div className="container-header">
                <Navbar />
            </div>
            <Search onSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} />
            <Filter
                dropdownRef={dropdownRef}
                dateDropdownRef={dateDropdownRef}
                dateDropdown={dateDropdown}
                toggleDropdown={toggleDropdown}
                minPrice={minPrice}
                selectedPriceRange={selectedPriceRange}
                maxPrice={maxPrice}
                handlePriceChange={handlePriceChange}
                handleMinInputChange={handleMinInputChange}
                handleMaxInputChange={handleMaxInputChange}
                resetFilter={resetFilter}
                handleApplyFilter={handleApplyFilter}
                date={date}
                setDate={setDate}
                priceDropdown={priceDropdown}
            />
            {searchResult.length === 0 ? (
                <div>Không tìm thấy kết quả trùng khớp</div>
            ) : (
                <SearchItem searchResult={searchResult} />
            )}
        </div>
    );
};

export default List;
