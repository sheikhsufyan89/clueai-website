import React from 'react';
import HeroSection from '../components/HeroSection';
import InteractiveNetworkDemo from '../components/InteractiveNetworkDemo';
import FeatureCardsSection from '../components/FeatureCardsSection';
import DashboardSection from '../components/DashboardSection';
import CasesCarousel from '../components/CasesCarousel';

const LandingPage = () => {
  return (
    <div className="relative bg-black noise-overlay">
      {/* Background grid pattern */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
      
      {/* Radial gradient overlay for depth */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <InteractiveNetworkDemo />
        <FeatureCardsSection />
        <DashboardSection />
        <CasesCarousel />
      </div>
    </div>
  );
};

export default LandingPage;
