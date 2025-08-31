import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Tareas from './components/Tareas/Tareas';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tareas" element={<Tareas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;