import React from 'react';
import Navbar from '../components/Navbar';
import Platforms from '../components/Platforms';
import ProductPillars from '../components/ProductPillars';
import Payouts from '../components/Payouts';
import FeaturesGrid from '../components/FeaturesGrid';
import Footer from '../components/Footer';

const ProductsPage = () => (
  <div className="min-h-screen flex flex-col bg-[#050505]">
    <Navbar />
    <Platforms />
    <ProductPillars />
    <Payouts />
    <FeaturesGrid />
    <Footer />
  </div>
);

export default ProductsPage;
