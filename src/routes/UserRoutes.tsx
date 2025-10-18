import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homepages/HomePage';
import APKDownload from '../pages/homepages/APKDownload';
import FeedBack from '../pages/homepages/FeedBack';
import GuideLine from '../pages/homepages/GuideLine';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apk-download" element={<APKDownload />} />
      <Route path="/feedback" element={<FeedBack />} />
      <Route path="/guide" element={<GuideLine />} />
    </Routes>
  );
};

export default UserRoutes;
