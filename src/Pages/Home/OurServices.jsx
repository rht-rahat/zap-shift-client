import React, { useEffect, useState } from "react";
import servicePhoto from "../../assets/service.png";
import Marquee from "react-fast-marquee";

const OurServices = () => {
  console.log("Marquee:", Marquee);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  console.log("fetch data services", services);
  return (
    <div className="bg-[#03373D] p-5 rounded-2xl">
      {/* our services heading */}
      <div className="text-white text-center font-extrabold text-4xl space-y-4 py-5">
        <h2>Our Services</h2>
        <p className="text-[16px] text-[#DADADA]/50 font-medium">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 lg:p-10 gap-5">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-white p-5 rounded-2xl gap-3 flex flex-col justify-center items-center text-center
               transition-all duration-300 ease-in-out
               hover:-translate-y-2 hover:shadow-xl
               hover:bg-primary"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={servicePhoto}
                alt=""
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-secondary">
              {service?.title}
            </h3>
            <p className="text-[16px] font-medium text-[#606060]/60 transition-colors duration-300 group-hover:text-[#606060]">
              {service?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
