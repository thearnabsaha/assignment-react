import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shows from './pages/Shows'
import './styles/App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/:id' element={<Shows/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App