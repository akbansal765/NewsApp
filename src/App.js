import './App.css';

import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';


const App = () => {
  const pageSize = 10;
  const country = 'in';
  const apiKey = process.env.REACT_APP_NEWSAPP_API_KEY;

  const [progress, setProgress] = useState(0);
 
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          height={3} // default height is 2
          progress={progress}
        />
        <Routes>
          <Route path="/" element={<News setProgress = {setProgress} apiKey = {apiKey} key='general' pageSize = {pageSize} country = {country} category = 'general'/>} />
          <Route path="/business" element={<News setProgress = {setProgress} apiKey = {apiKey} key='business' pageSize = {pageSize} country = {country} category = 'business'/>} />
          <Route path="/entertainment" element={<News setProgress = {setProgress} apiKey = {apiKey} key='entertainment' pageSize = {pageSize} country = {country} category = 'entertainment'/>} />
          <Route path="/health" element={<News setProgress = {setProgress} apiKey = {apiKey} key='health' pageSize = {pageSize} country = {country} category = 'health'/>} />
          <Route path="/general" element={<News setProgress = {setProgress} apiKey = {apiKey} key='general' pageSize = {pageSize} country = {country} category = 'general'/>} />
          <Route path="/science" element={<News setProgress = {setProgress} apiKey = {apiKey} key='science' pageSize = {pageSize} country = {country} category = 'science'/>} />
          <Route path="/sports" element={<News setProgress = {setProgress} apiKey = {apiKey} key='sports' pageSize = {pageSize} country = {country} category = 'sports'/>} />
          <Route path="/technology" element={<News setProgress = {setProgress}  apiKey = {apiKey} key='technology'pageSize = {pageSize} country = {country} category = 'technology'/>} />
        </Routes>
        </Router>
      </div>
    )
  
}

export default App
