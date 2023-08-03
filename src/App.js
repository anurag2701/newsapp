import './App.css'
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
  apiKey= '09ebc7c3a87c4a1ba65aa66e05f8910f'

  render() {
    return (
    <>
      <Navbar/>
      <News/>
    </>
    )
  }
}
