import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homepages/HomePage';
import APKDownload from '../pages/homepages/APKDownload';
import FeedBack from '../pages/homepages/FeedBack';
import AdminDashboard from '../pages/admin/AdminDashboard';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apk-download" element={<APKDownload />} />
      <Route path="/feedback" element={<FeedBack />} />
      <Route path="/admin-mekong-pathfinder-statistics" element={<AdminDashboard />} />
    </Routes>
  );
};

export default UserRoutes;
