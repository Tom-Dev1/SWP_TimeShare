import './trendPlace.css';

function TrendPlace() {
  return (
    <div className="tP__container">
      {/* container1 */}
      <div className="tP__container1">
        <div className="tP__cardItem1">
          <div className="tpCard1">
            <div>
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o="
                alt="TP Ho Chi Minh"
                className="tP__Img1"
              />
            </div>
            <div className="tP__cardItemText">TP. Hồ Chí Minh</div>
          </div>
        </div>
        <div className="tpCard1">
          <div>
            <div className="tP__Img1">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o="
                alt="Hà Nội"
                className="tP__Img1"
              />
            </div>
            <div className="tP__cardItemText">Hà Nội</div>
          </div>
        </div>
      </div>
      {/* container2 */}
      <div className="tP__container2">
        <div className="tP__cardItem2">
          <div className="tpCard2">
            <div>
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o="
                alt="Đà Nẵng"
                className="tP__Img2"
              />
            </div>
            <div className="tP__cardItemText2">Đà Nẵng</div>
          </div>

          <div className="tpCard2">
            <div>
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o="
                alt="Đà Lạt"
                className="tP__Img2"
              />
            </div>
            <div className="tP__cardItemText2">Đà Lạt</div>
          </div>

          <div className="tpCard2">
            <div>
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/688956.jpg?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&o="
                alt="Vũng Tàu"
                className="tP__Img2"
              />
            </div>
            <div className="tP__cardItemText2">Vũng Tàu</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendPlace;
