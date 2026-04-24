import React from "react";
import amazon_vector from "../../assets/brands/amazon_vector.png";
import amazon from "../../assets/brands/amazon.png";
import Marquee from "react-fast-marquee";
import casio from '../../assets/brands/casio.png'
import moonstar from '../../assets/brands/moonstar.png'
import randstad from '../../assets/brands/randstad.png'
import star from '../../assets/brands/star.png'
import start_people from '../../assets/brands/start_people.png'

const SalesTeams = () => {
  return (
    <div className="p-5 rounded-2xl">
      {/* our services heading */}
      <div className="text-[#03373D] text-center font-extrabold text-[28px] space-y-4 py-5">
        <h2>We've helped thousands of sales teams</h2>
      </div>
      <div className="lg:p-10">
        <Marquee.default speed={30} pauseOnHover gradient={false} >
          <div className="flex justify-between gap-20 lg:gap-40">
            <div>
              <img src={amazon_vector} alt="" />
            </div>
            <div>
              <img src={casio} alt="" />
            </div>
            <div>
              <img src={moonstar} alt="" />
            </div>
            <div>
              <img src={randstad} alt="" />
            </div>
            <div>
              <img src={star} alt="" />
            </div>
            <div>
              <img src={start_people} alt="" />
            </div>
            <div>
              <img src={amazon} alt="" />
            </div>
            
          </div>
        </Marquee.default>
      </div>
    </div>
  );
};

export default SalesTeams;
