import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./HomeSliderStyle.css";

import { Navigation } from "swiper/modules";

import img1 from "../../../assets/bannerImg/adopt.jpg";
import img2 from "../../../assets/bannerImg/petFood.jpg";
import img3 from "../../../assets/bannerImg/vet.jpg";
import { Link } from "react-router-dom";

const HomeSlider = () => {
  return (
    <div>
      <Swiper
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="swiperImgContainer">
            <div className="swiperImgDiv">
              <img className="swiperImg" src={img1} alt="" />
            </div>
            <div className="swiperImgContent">
              <h1>Adopt a pet right now!</h1>
              <Link to="/adoption" className="btn-primary">
                Choose your pet
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperImgContainer">
            <div className="swiperImgDiv">
              <img className="swiperImg" src={img2} alt="" />
            </div>
            <div className="swiperImgContent">
              <h1>Buy Your Pet Quality Food</h1>
              <Link to="/products" className="btn-primary">
                Buy Pet Food
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiperImgContainer">
            <div className="swiperImgDiv">
              <img className="swiperImg" src={img3} alt="" />
            </div>
            <div className="swiperImgContent">
              <h1>Book an appointment in nearest vet</h1>
              <Link to="/vets" className="btn-primary">
                See Vets
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;
