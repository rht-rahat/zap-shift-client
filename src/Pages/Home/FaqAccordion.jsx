import React from 'react';



const FawAccordion = () => {
  return (
        <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-teal-900">
          Frequently Asked Question (FAQ)
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        {/* FAQ Items */}
        <div className="mt-10 space-y-4 text-left">
          
          {/* Active Item */}
          <div className="collapse collapse-arrow border border-teal-500 bg-teal-50 rounded-xl">
            <input type="radio" name="faq" defaultChecked />
            <div className="collapse-title font-semibold text-teal-900">
              How does this posture corrector work?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                A posture corrector works by providing support and gentle
                alignment to your shoulders, back, and spine, encouraging you
                to maintain proper posture throughout the day.
              </p>
            </div>
          </div>

          {/* Other Items */}
          {[
            "Is it suitable for all ages and body types?",
            "Does it really help with back pain and posture improvement?",
            "Does it have smart features like vibration alerts?",
            "How will I be notified when the product is back in stock?",
          ].map((q, i) => (
            <div
              key={i}
              className="collapse collapse-arrow bg-white border rounded-xl"
            >
              <input type="radio" name="faq" />
              <div className="collapse-title font-medium text-gray-800">
                {q}
              </div>
              <div className="collapse-content text-gray-500">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Answer content goes here.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-3 bg-lime-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-lime-500 transition">
            See More FAQ’s
            {/* <span className="bg-black text-white p-2 rounded-full">
              <FaArrowRight size={14} />
            </span> */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FawAccordion;