import React from 'react';
import Banner from './Banner';
import Works from './Works';
import OurServices from './OurServices';
import SalesTeams from './SalesTeams';
import FeatureSection from './FeatureSection';
import Merchant from './Merchant';
import Reviews from './Reviews';
import FawAccordion from './FaqAccordion';


const reviewsPromise = fetch("reviews.json").then(res => res.json())

const Home = () => {
  return (
    <div>
      <Banner />
      <Works />
      <OurServices />
      <SalesTeams />
      <FeatureSection />
      <Merchant />
      <Reviews reviewsPromise={reviewsPromise}/>
      <FawAccordion />
    </div>
  );
};

export default Home;