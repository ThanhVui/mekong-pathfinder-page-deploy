import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRoutes from '../routes/UserRoutes';

export default function Page() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
}
