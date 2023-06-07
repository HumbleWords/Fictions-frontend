import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import Works from "./pages/Works";
import MyWork from "./pages/MyWork";
import MyWorks from "./pages/MyWorks";
import Work from "./pages/Work";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Authors from "./pages/Authors";
import Info from "./pages/Info";
import PostWork from './pages/PostWork';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/info" element={<Info />} />
          <Route path="/search" element={<Search />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<Work />} />
          <Route path="/myworks/:id" element={<MyWork />} />
          <Route path="/users/:id" element={<Authors />} />
          <Route path="/myworks" element={<MyWorks />} />
          <Route path='/postwork' element={<PostWork />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

