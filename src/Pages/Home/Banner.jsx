import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="rounded-2xl bg-white my-5 -z-10" >
      <div className="lg:p-15" style={{zIndex: -0}}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full h-50 sm:h-75 md:h-100 lg:h-125">
              <img src={banner1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-50 sm:h-75 md:h-100 lg:h-125">
              <img src={banner2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-50 sm:h-75 md:h-100 lg:h-125">
              <img src={banner3} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
