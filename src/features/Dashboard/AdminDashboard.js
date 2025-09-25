import React from 'react';
import StatsGrid from './StatsGrid';
import ChartsSection from './ChartsSection';
import TopProductsSection from './TopProductsSection';

const AdminDashboard = () => {
  return (
    <>
      <StatsGrid />
      <ChartsSection />
      <TopProductsSection />
    </>
  );
};

export default AdminDashboard;
