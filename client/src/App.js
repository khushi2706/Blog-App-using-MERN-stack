import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import BlogDetail from './componets/BlogDetail'

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './utils/theme';
import {useDispatch, useSelector} from 'react-redux'

function App() {
  const isDark = useSelector((state) => state.theme.isDarkmode)

  return <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
  <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />} />
    </Routes>
    </main>

  </React.Fragment>;
  </ThemeProvider>
}

export default App;
