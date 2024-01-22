import "../Header/Header.scss";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
    return (
        <header className="header-bg">
            <div className="header-container">
                <h1 className="h-container-left">
                    <span>Real</span>
                    <span>Estate</span>
                </h1>

                <form className="h-container-mid">
                    <input type="text" placeholder="Search.." className="h-text" />
                    <SearchIcon />
                </form>
                <ul className="h-container-right">
                    <li>Home</li>
                    <li>About</li>
                    <li>Sign in</li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
