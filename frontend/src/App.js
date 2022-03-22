import React, {} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import components
import HomePage from './components/HomePage'
import Register from "./components/Register";
import Login from "./components/Login";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* INDEX */}
          <Route exact path="/homepage" element={<HomePage text ="Welcome to the Homepage"/>}> 
          </Route>
          {/* REGISTER */}
          <Route path="/" element={<Register />}>
          </Route>
          {/* LOGIN */}
          <Route path="/login" element={<Login />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
