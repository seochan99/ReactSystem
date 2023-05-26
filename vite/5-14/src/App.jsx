import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Product from './components/Product'
import Footer from './components/Footer'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'

function App() {


  return (
      <div className="App">
        <BrowserRouter>
        
        <Header/>

          <Routes>
            <Route path="/"  element={<Main/>} />
            <Route path="/product/:productId" element={<Product/>}></Route>
            {/* 예외처리 */}
            <Route path="*" element={<NotFound/>} />
          </Routes>
        <Footer/>
        </BrowserRouter>

      </div>    
  )
}

export default App
