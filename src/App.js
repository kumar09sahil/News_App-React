import React, { Component } from 'react'
// import React, { useState } from 'react'
import NavBar from './components/NavBar'
import NewsComponent  from './components/NewsComponent'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
  pagesize= 15
  state ={
    progress:0
  }
  setProgress = (progress) =>{
    this.setState({progress:progress})
}
  render() {
    return (
      <>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}/>
          <NavBar/>
            {/* <NewsComponent setProgress={progress} pagesize={this.pagesize} country='in' category='general'/> */}
          <Routes>
            <Route  exact path="/" element={<NewsComponent setProgress={this.setProgress} key='home' pagesize={this.pagesize} country='in' category='general'/>} />  
            <Route  exact path="/business" element={<NewsComponent setProgress={this.setProgress} key='business' pagesize={this.pagesize} country='in' category='business'/>} />  
            <Route  exact path="/entertainment" element={<NewsComponent setProgress={this.setProgress} key='entertainment' pagesize={this.pagesize} country='in' category='entertainment'/>} />  
            <Route  exact path="/sports" element={<NewsComponent setProgress={this.setProgress} key='sports' pagesize={this.pagesize} country='in' category='sports'/>} />  
            <Route  exact path="/science" element={<NewsComponent setProgress={this.setProgress} key='science' pagesize={this.pagesize} country='in' category='science'/>} />  
            <Route  exact path="/technology" element={<NewsComponent setProgress={this.setProgress} key='technology' pagesize={this.pagesize} country='in' category='technology'/>} />  
            <Route  exact path="/general" element={<NewsComponent setProgress={this.setProgress} key='general' pagesize={this.pagesize} country='in' category='general'/>} />  
            <Route  exact path="/health" element={<NewsComponent setProgress={this.setProgress} key='health' pagesize={this.pagesize} country='in' category='health'/>} />  
          </Routes>

        </Router>
      </>
    )
  }
}

