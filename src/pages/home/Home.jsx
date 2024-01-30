import FeatureProperties from "../../components/featureProperties/FeatureProperties";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

function Home() {
    return (
        <div className="form-container">
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <div className="homeTitle">Tìm theo loại chỗ nghỉ</div>
                <PropertyList />
                <div className="homeTitle">Điểm đến đang thịnh hành</div>
                <FeatureProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    );
}

export default Home;
