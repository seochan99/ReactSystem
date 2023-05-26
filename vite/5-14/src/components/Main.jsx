import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Main(props) {
    
  return (
    <div>
        <h1>Main 페이지 입니다.</h1>
        <ul>
            <Link to="/product/1"><ul>1번 상품입니다.</ul></Link>
            <Link to="/product/2"><ul>2번 상품입니다.</ul></Link>
        </ul>


    </div>
    
  )
}

export default Main