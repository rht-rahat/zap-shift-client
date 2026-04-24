import React from "react";
import tracking from "../../assets/live-tracking.png";
import delivery from "../../assets/safe-delivery.png";

const FeatureSection = () => {
  return (
    <div className="space-y-6 border-[#03464D]/50 border-t border-b border-dashed py-5">
      {/* Card 1 */}
      <div
        className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 
                      bg-[#F4F6F6] rounded-2xl p-6 lg:p-10
                      transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        {/* Image */}
        <div className="w-[120px] lg:w-[150px] flex-shrink-0">
          <img
            src={tracking}
            alt="tracking"
            className="w-full object-contain"
          />
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-30 border-l-2 border-dashed border-[#03373D]/30"></div>

        {/* Content */}
        <div className="text-center lg:text-left">
          <h3 className="text-xl lg:text-2xl font-bold text-[#03373D] mb-2">
            Live Parcel Tracking
          </h3>
          <p className="text-[#606060] text-sm lg:text-base leading-relaxed">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 
                      bg-[#F4F6F6] rounded-2xl p-6 lg:p-10
                      transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        {/* Image */}
        <div className="w-[120px] lg:w-[150px] flex-shrink-0">
          <img
            src={delivery}
            alt="delivery"
            className="w-full object-contain"
          />
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-30 border-l-2 border-dashed border-[#03373D]/30"></div>

        {/* Content */}
        <div className="text-center lg:text-left">
          <h3 className="text-xl lg:text-2xl font-bold text-[#03373D] mb-2">
            100% Safe Delivery
          </h3>
          <p className="text-[#606060] text-sm lg:text-base leading-relaxed">
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>

       {/* Card 2 */}
      <div
        className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 
                      bg-[#F4F6F6] rounded-2xl p-6 lg:p-10
                      transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        {/* Image */}
        <div className="w-[120px] lg:w-[150px] flex-shrink-0">
          <img
            src={delivery}
            alt="delivery"
            className="w-full object-contain"
          />
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-30 border-l-2 border-dashed border-[#03373D]/30"></div>

        {/* Content */}
        <div className="text-center lg:text-left">
          <h3 className="text-xl lg:text-2xl font-bold text-[#03373D] mb-2">
            100% Safe Delivery
          </h3>
          <p className="text-[#606060] text-sm lg:text-base leading-relaxed">
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
