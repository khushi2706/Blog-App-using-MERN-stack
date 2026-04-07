import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React, { useEffect } from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import BlogDetail from './componets/BlogDetail'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';



function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDark = useSelector((state) => state.theme.isDarkmode);

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    if(userId){
      dispatch(authActions.login());
    }
  },[dispatch]);

  useEffect(() => {
    document.body.classList.toggle("theme-light", !isDark);
  }, [isDark]);
  
  return <React.Fragment>
    <div className="app-shell">
    <header>
      <Header/>
    </header>
    <main className="page">
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/blogs" : "/login"} replace />}
      />
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />} />
    </Routes>
    </main>
    </div>
  </React.Fragment>;
}

export default App;
