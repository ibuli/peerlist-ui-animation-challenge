import React from 'react';
import { Routes, Route } from 'react-router';
import Dashboard from './Dashboard/Dashboard';
import VerticalMenu from './challenges/Day-1';
import StatusIndicator from './challenges/Day-2';
import TodoList from './challenges/Day-3';
import TabsSwitcher from './challenges/Day-4';
import CollectiblesView from './challenges/Day-5';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="day-1" element={<VerticalMenu />} />
      <Route path="day-2" element={<StatusIndicator />} />
      <Route path="day-3" element={<TodoList />} />
      <Route path="day-4" element={<TabsSwitcher />} />
      <Route path="day-5" element={<CollectiblesView />} />
    </Routes>
  );
};

export default App;
