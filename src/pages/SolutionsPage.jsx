import React from 'react';
import Navbar from '../components/Navbar';
import Benefits from '../components/Benefits';
import Industries from '../components/Industries';
import Footer from '../components/Footer';

const SolutionsPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505] overflow-x-hidden">
    <Navbar />
    <Benefits />
    <Industries />
    <Footer />
  </div>
);

export default SolutionsPage;
