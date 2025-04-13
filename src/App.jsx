import React from 'react';
import { Routes, Route } from 'react-router';
import Dashboard from './Dashboard/Dashboard';
import VerticalMenu from './challenges/day-1/Day1';
import StatusIndicator from './challenges/day-2/Day2';

const App = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="day-1" element={<VerticalMenu />} />
      <Route path="day-2" element={<StatusIndicator />} />
    </Routes>
  );
};

export default App;
