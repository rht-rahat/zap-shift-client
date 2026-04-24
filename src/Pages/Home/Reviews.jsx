import React, { use } from "react";
import customerTop from "../../assets/customer-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";

const Reviews = ({ reviewsPromise }) => {
  const testimonials = use(reviewsPromise);
  console.log(testimonials);
  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid place-items-center text-center">
          <img src={customerTop} alt="" className="" />
          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-800">
            What our customers are saying
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          coverflowEffect={{
            rotate: 10,
            stretch: 30,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
          }}
          speed={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide zoom={true} key={index}>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-left">
                {/* Quote */}
                <div className="text-4xl text-teal-200 mb-3">“</div>

                {/* Review */}
                <p className="text-gray-600 text-sm leading-relaxed border-b border-dashed pb-4">
                  {item.review}
                </p>

                {/* User */}
                <div className="flex w-10 h-10 items-center gap-3 mt-4">
                  <img
                    src={item.user_photoURL}
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {item.userName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.pick_up_email}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
