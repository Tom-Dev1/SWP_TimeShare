import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Slider } from "@mui/material";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { format } from "date-fns";

const Filter = ({
    dropdownRef,
    dateDropdownRef,
    toggleDropdown,
    dateDropdown,
    date,
    setDate,
    priceDropdown,
    minPrice,
    selectedPriceRange,
    maxPrice,
    handlePriceChange,
    handleMinInputChange,
    handleMaxInputChange,
    resetFilter,
    handleApplyFilter,
}) => {
    return (
        <div className="top-0 sticky z-20 transition-transform durian-400 transform  search-form_condition px-5 ">
            <div>
                <div className="fresnel-container">
                    <div className="mx-auto wrapper-default rep-diverse">
                        <div className="RefinementRow_placeholder ">
                            <div className="RowItems_itemList">
                                <div className="RowItems_dateFilter">
                                    <div className="RefinementRowElement" ref={dateDropdownRef}>
                                        <button
                                            className="RefinementRowElement_RowBtn"
                                            onClick={() => toggleDropdown("date")}
                                        >
                                            <strong className="RefinementRowElement_titleItem block">Date</strong>
                                            <span
                                                className={`RefinementRowElement_optionItem ${
                                                    dateDropdown ? "border-blue-700" : "border-grey-300"
                                                }`}
                                            >
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
                                                Giá: <span className="font-normal">1 đêm</span>
                                            </strong>
                                            <span
                                                className={`RefinementRowElement_optionItem ${
                                                    priceDropdown ? "border-blue-700" : "border-grey-300"
                                                }`}
                                            >
                                                <span className="truncate w-full">
                                                    <span></span>

                                                    <span>{selectedPriceRange.toLocaleString()}</span>
                                                </span>
                                                <span className="optionItem_plus rotate-90 transform">
                                                    <KeyboardArrowDownIcon />
                                                </span>
                                            </span>
                                        </button>
                                        {priceDropdown && (
                                            <div className="flyout_container z-60 absolute top-0  Flyout_fadeIn opacity-0 transition-opacity durian-200 opacity-100">
                                                <div className="Flyout_wrapper bg-white shadow-popover rounded rounded-sm">
                                                    <div className="text-m rounded-sm overflow-hidden RefinementRowElement_elementContent RefinementRowElement_extended">
                                                        <section className="FilterDropdown_section FilterDropdown_stickyFilters">
                                                            <div className="FilterDropdown_children">
                                                                <section className="BudgetFilter_flyoutContainer w-full bg-white border-grey-200 BudgetFilter_sizedContainer leading-normal text-l p-4 border-b">
                                                                    <h4 className="Heading_heading BudgetFilter_flyoutHeading mb-4">
                                                                        Phạm vi giá tiền
                                                                    </h4>
                                                                    <section>
                                                                        <div className="slider_mg">
                                                                            <Slider
                                                                                value={[minPrice, maxPrice]}
                                                                                onChange={handlePriceChange}
                                                                                valueLabelDisplay="auto"
                                                                                valueLabelFormat={(value) =>
                                                                                    `${value.toLocaleString()}`
                                                                                }
                                                                                min={1000}
                                                                                max={100000000}
                                                                            ></Slider>
                                                                        </div>
                                                                        <div className="display_row">
                                                                            <div className="flex-1">
                                                                                <strong className="text-display">
                                                                                    Giá tối thiểu
                                                                                </strong>
                                                                                <div className="PriceInput_inputContainer">
                                                                                    <input
                                                                                        className="PriceInput_input"
                                                                                        type="text"
                                                                                        min={1000}
                                                                                        max={maxPrice}
                                                                                        value={minPrice.toLocaleString()}
                                                                                        onChange={handleMinInputChange}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <span className="flex-0 ">-</span>
                                                                            <div className="flex-1">
                                                                                <strong className="text-display">
                                                                                    Giá tối đa
                                                                                </strong>
                                                                                <div className="PriceInput_inputContainer">
                                                                                    <input
                                                                                        className="PriceInput_input"
                                                                                        type="text"
                                                                                        min={minPrice}
                                                                                        max={100000000}
                                                                                        value={maxPrice.toLocaleString()}
                                                                                        onChange={handleMaxInputChange}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </section>
                                                            </div>
                                                            <footer className="FilterDropdown_footer FilterDropdown_ifVisible">
                                                                <button
                                                                    onClick={resetFilter}
                                                                    className="FilterDropdown_resetBtn"
                                                                >
                                                                    Reset
                                                                </button>
                                                                <button
                                                                    onClick={handleApplyFilter}
                                                                    className="FilterDropdown_applyBtn"
                                                                >
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
    );
};

export default Filter;
