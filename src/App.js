import './App.css';
import Navbar from './components/Navbar'
import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
 
import About from './components/About';
  

export default class App extends Component {
  country="us"
  pageSize=15
  apikey=process.env.REACT_APP_NEWS_API_KEY
  

  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }


  render() {
    
    return (
    <>
    <Router>
   
    <Navbar></Navbar>
    <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
    <Switch>
    <Route exact path="/"><News setProgress={this.setProgress} apikey={this.apikey} key="home" country={this.country} category="general" pageSize={this.pageSize} id="home"></News></Route>
    <Route exact path="/business"><News setProgress={this.setProgress} apikey={this.apikey} key="business" country={this.country} category="business" pageSize={this.pageSize}  id="business"></News></Route>
    <Route exact path="/entertainment"><News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" country={this.country} category="entertainment" pageSize={this.pageSize} id="entertainment"></News></Route>
    <Route exact path="/general"><News setProgress={this.setProgress} apikey={this.apikey} country={this.country} key="general" category="general" pageSize={this.pageSize} id="general"></News></Route>
    <Route exact path="/health"><News setProgress={this.setProgress} apikey={this.apikey} country={this.country} key="health" category="health" pageSize={this.pageSize} id="health"></News></Route>
    <Route exact path="/science"><News setProgress={this.setProgress} apikey={this.apikey} country={this.country} key="science" category="science" pageSize={this.pageSize} id="science"></News></Route>
    <Route exact path="/sports"><News setProgress={this.setProgress} apikey={this.apikey} country={this.country} key="sports" category="sports" pageSize={this.pageSize} id="sports"></News></Route>
    <Route exact path="/technology"><News setProgress={this.setProgress} apikey={this.apikey} key="technology" country={this.country} category="technology" pageSize={this.pageSize} id="technology"></News></Route>
    <Route exact path="/about"><About></About></Route>
    </Switch>
   
    </Router>
    </>  
    
    )
  }
}


