import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React from 'react';
import SingIn from './componets/Auth/SingIn';
import SingUp from './componets/Auth/SingUp';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import BlogDetail from './componets/BlogDetail'



function App() {
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
    <Route path="/SingIn" element={<SingIn/>}></Route>
    <Route path="/SingUp" element={<SingUp/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />} />
    </Routes>
    </main>

  </React.Fragment>;
}

export default App;
