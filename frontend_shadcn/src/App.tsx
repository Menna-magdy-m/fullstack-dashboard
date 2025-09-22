import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Dashboard />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;