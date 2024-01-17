
import './App.css';
// 1.npx create-react-app newsapp
// 2. cd (current directory name)
// 3.npm start
//in this app we learn about class based component--->use rcc snippets(which become available because we have installed  ES7 extension)


/**** differences in function and class based***********

in function based component we return directly while in class based component we return using render

*************************************************/


import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

/************* */



/*** */
export default class App extends Component {
  c = "variable"
  pageSize = 15;
  apiKey=process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })

  }
  render() {
    return (
      <div>
        {/* hello I am class based component {this.c} 
          key is used to forcefullly remount the component
        
        */}
        {/*<Router>*/}

        <Navbar />
        <LoadingBar
          height={4}
          color='#f11946'
          progress={this.state.progress}

        />
        <Switch>
          <Route exact path="/">
            <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />
          </Route>
          <Route exact path="/business">
            <News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />
          </Route>
          <Route exact path="/health">
            <News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />
          </Route>
          <Route exact path="/science">
            <News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />
          </Route>
          <Route exact path="/sports">
            <News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />
          </Route>
          <Route exact path="/technology">
            <News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />
          </Route>



        </Switch>
        {/*</Router>*/}
      </div>
    )
  }
}
