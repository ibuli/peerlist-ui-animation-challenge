import React from 'react';
import { Routes, Route } from 'react-router';
import Dashboard from './Dashboard/Dashboard';
import VerticalMenu from './challenges/Day-1';
import StatusIndicator from './challenges/Day-2';
import TodoList from './challenges/Day-3';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="day-1" element={<VerticalMenu />} />
      <Route path="day-2" element={<StatusIndicator />} />
      <Route path="day-3" element={<TodoList />} />
    </Routes>
  );
};

export default App;
