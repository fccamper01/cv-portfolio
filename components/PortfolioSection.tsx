import React from 'react';
import Header from './Header';
import PortfolioItem from './PortfolioItem';
import Footer from './Footer';
import { PORTFOLIO_ITEMS, SOCIAL_LINKS, USER_NAME, USER_TAGLINE } from '../constants';

const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="py-16 bg-zinc-100">
      <div className="relative z-10 bg-white text-neutral-800 shadow-2xl rounded-lg w-full max-w-2xl flex flex-col mx-auto">
        <Header name={USER_NAME} tagline={USER_TAGLINE} />
        <main className="px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 flex-grow">
          <ul className="space-y-4">
            {PORTFOLIO_ITEMS.map((item) => (
              <li key={item.id}>
                <PortfolioItem
                  title={item.title}
                  subtitle={item.subtitle}
                  url={item.url}
                  isExternal={item.isExternal}
                />
              </li>
            ))}
          </ul>
        </main>
        <Footer socialLinks={SOCIAL_LINKS} userName={USER_NAME} />
      </div>
    </section>
  );
};

export default PortfolioSection;