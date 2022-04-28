import React, {} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import components
import HomePage from './components/HomePage'
import Register from "./components/Register";
import Login from "./components/Login";
import Page404 from "./components/Page404";
import Post from "./components/Post";
import Comment from "./components/Comment";
import ShowComments from "./components/ShowComments";



function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* INDEX */}
          <Route exact={true} path="/homepage" element={<HomePage />} /> 
          {/* REGISTER */}
          <Route exact={true}  path="/" element={<Register />} />
          {/* LOGIN */}
          <Route exact={true}  path="/login" element={<Login />} />

          <Route exact={true}  path="/post" element={<Post />} />
          <Route exact={true}  path="/showComments" element={<ShowComments />} />
          <Route exact={true}  path="/comment" element={<Comment />} />


          {/* 404 page */}
          <Route path='*' exact={true} element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
