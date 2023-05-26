import React from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

function Product() {
    const {productId}  = useParams()
    const navigate = useNavigate()

    console.log(location)
  return (
    <>
        <div>{productId}번 상품 페이지입니다. </div>
        <div style={{margin:'50px',}}>
            <span onClick={()=>navigate(-1)}>이전 상품</span>
            <span onClick={()=>navigate(1)} style={{marginLeft:'50px'}}>다음 상품</span>
        </div>
    </>

  )
}

export default Product