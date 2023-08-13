import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Error from "./components/Error";
// import MyComponent from "./components/MyComponent";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <LoadingBar  height={4} color={'#F7FF00'} shadow='true' progress={this.state.progress}  />
          <Navbar />
          {/* <MyComponent /> */}
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} />} />
            <Route path="/science" element={<News setProgress={this.setProgress} category="science" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} category="entertainment" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} category="health" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} category="technology" />} />
            <Route path="/cricket" element={<News setProgress={this.setProgress} q="cricket" />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      </BrowserRouter>
    );
  }
}
