import React from 'react';
import { Routes, Route } from 'react-router';
import Dashboard from './Dashboard/Dashboard';
import Day1 from './challenges/day-1/Day1';

const App = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="day-1" element={<Day1 />} />
    </Routes>
  );
};

export default App;
