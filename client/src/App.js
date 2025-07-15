import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Header from './componets/Header';
import React, { useEffect } from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs';
import AddBlogs from './componets/AddBlogs';
import BlogDetail from './componets/BlogDetail';
import { useDispatch } from 'react-redux';
import { authActions } from './store';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  // Don't show header on login page
  const hideHeaderRoutes = ['/login'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <React.Fragment>
      {!shouldHideHeader && <Header />}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/add" element={<AddBlogs />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
