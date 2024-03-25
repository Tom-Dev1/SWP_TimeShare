import { useEffect, useRef, useState } from "react";
import TrendPlace from "../../components/Components_LandingPages/trendPlace/TrendPlace";
import Search from "../../components/Search/Search";

import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";

import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHomeTitleVisible, setIsHomeTitleVisible] = useState(false);
    const homeTitleRef = useRef(null);
    const [isHomePage] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
            // const currentScrollPos = window.pageYOffset;
            const currentScrollPos = window.scrollY;
            setIsScrolled(currentScrollPos > 0);

            const homeTitleTop = homeTitleRef.current.getBoundingClientRect().top;
            setIsHomeTitleVisible(homeTitleTop <= window.innerHeight / 2);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearch = (searchValue) => {
        const searchTerm = {
            destination: searchValue,
        };
        localStorage.setItem("searchkey", JSON.stringify(searchTerm));
        navigate("/hotels");
    };
    // console.log(isHomeTitleVisible);
    return (
        <div className={`path-frontpage ${isScrolled ? "header-scroll" : ""} ${isHomeTitleVisible ? "fixed-bs" : ""}`}>
            <Navbar className={isHomePage} />
            <Header />
            <Search onSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} />

            <div className="main-home-container">
                <Featured homeTitleRef={homeTitleRef} />

                <TrendPlace />

                <MailList />
                <Footer />
            </div>
        </div>
    );
}

export default Home;
