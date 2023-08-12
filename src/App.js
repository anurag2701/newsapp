import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Error from "./components/Error";
import MyComponent from "./components/MyComponent";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Navbar />
          {/* <MyComponent /> */}
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/science" element={<News category="science" />} />
            <Route path="/entertainment" element={<News category="entertainment" />} />
            <Route path="/health" element={<News category="health" />} />
            <Route path="/sports" element={<News category="sports" />} />
            <Route path="/technology" element={<News category="technology" />} />
            <Route path="/cricket" element={<News q="cricket" />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      </BrowserRouter>
    );
  }
}
