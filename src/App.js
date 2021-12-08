import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginComponent from './ components/LoginComponent';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import RegisterComponent from './ components/RegisterComponent';
import AdminHomePage from './ components/AdminHomePage';
import AddMovieComponent from './ components/AddMovieComponent';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginComponent />} />
          <Route exact path="/register" element={<RegisterComponent />} />
          <Route exact path="/admin" element={<AdminHomePage />} />
          <Route exact path="/admin/movie" element={<AddMovieComponent />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
