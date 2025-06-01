import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
// import PortfolioSection from './components/PortfolioSection'; // Removed import

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const PlaceholderSection: React.FC<{id: string; title: string; bgColorClass: string; textColorClass?: string}> = ({ id, title, bgColorClass, textColorClass = "text-white"}) => (
    <section id={id} className={`h-screen w-full flex flex-col items-center justify-center ${bgColorClass} ${textColorClass} p-8`} aria-label={title}>
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-center">Content for {title.toLowerCase()} will go here.</p>
    </section>
  );

  return (
    <div className="animate-screen-fade-in">
      <HeroSection />
      {/* <PortfolioSection /> */} {/* Removed rendering of PortfolioSection */}
      <PlaceholderSection id="section2" title="Section Two" bgColorClass="bg-teal-700" />
      <PlaceholderSection id="section3" title="Section Three" bgColorClass="bg-slate-700" />
      <PlaceholderSection id="section4" title="Section Four" bgColorClass="bg-sky-700" />
      <PlaceholderSection id="section5" title="Section Five" bgColorClass="bg-indigo-700" />
      <PlaceholderSection id="section6" title="Section Six" bgColorClass="bg-neutral-800" />
    </div>
  );
};

export default App;