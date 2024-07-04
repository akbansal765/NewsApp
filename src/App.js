import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  pageSize = 10;
  country = 'in';
  apiKey = process.env.REACT_APP_NEWSAPP_API_KEY;

  state = {
    progress: 0
  };

  setProgress = (progress) =>{
    this.setState({progress: progress})
  }
  
  render() {
    console.log(this.apiKey)
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          height={3} // default height is 2
          progress={this.state.progress}
        />
        <Routes>
          <Route path="/" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key='general' pageSize = {this.pageSize} country = {this.country} category = 'general'/>} />
          <Route path="/business" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key='business' pageSize = {this.pageSize} country = {this.country} category = 'business'/>} />
          <Route path="/entertainment" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key='entertainment' pageSize = {this.pageSize} country = {this.country} category = 'entertainment'/>} />
          <Route path="/health" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key='health' pageSize = {this.pageSize} country = {this.country} category = 'health'/>} />
          <Route path="/general" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key='general' pageSize = {this.pageSize} country = {this.country} category = 'general'/>} />
          <Route path="/science" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key='science' pageSize = {this.pageSize} country = {this.country} category = 'science'/>} />
          <Route path="/sports" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key='sports' pageSize = {this.pageSize} country = {this.country} category = 'sports'/>} />
          <Route path="/technology" element={<News setProgress = {this.setProgress}  apiKey = {this.apiKey} key='technology'pageSize = {this.pageSize} country = {this.country} category = 'technology'/>} />
        </Routes>
        </Router>
      </div>
    )
  }
}

