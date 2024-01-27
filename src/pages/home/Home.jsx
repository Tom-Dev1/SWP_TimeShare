import FavLocation from '../../components/Components_LandingPages/favLocation/favLocation';
import FindByPlace from '../../components/Components_LandingPages/findByPlace/FindByPlace';
import FeatureProperties from '../../components/featureProperties/FeatureProperties';
import Featured from '../../components/featured/Featured';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar';
import PropertyList from '../../components/propertyList/PropertyList';
import './home.css';

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <div className="homeTitle">Khám phá Việt Nam</div>
        <div className="homeTitle litle">Các điểm đến phổ biến này có nhiều điều chờ đón bạn</div>
        <FavLocation />
        <div className="homeTitle">Tìm theo loại chỗ nghỉ</div>
        <FindByPlace />
        <div className="homeTitle"></div>
        <PropertyList />
        <div className="homeTitle">Nhà ở mà khách yêu thích</div>
        <FeatureProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
