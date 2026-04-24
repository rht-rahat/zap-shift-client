import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';

const RootLayouts = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayouts;