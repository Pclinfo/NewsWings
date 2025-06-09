// src/layouts/NewsLayout.jsx
import React from 'react';
import NewsWingNavBar from '../pages/NewsWingNavBar';

const NewsLayout = ({ children }) => {
  return (
    <div>
      <NewsWingNavBar />
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default NewsLayout;
