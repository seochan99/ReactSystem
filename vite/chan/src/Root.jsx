import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

function Root() {

    // useNavigate 
    const navigator = new useNavigate();

    // 현재 URL
    const URL = location.href;


    
    
  return (
    <>
        <div id="gnb">
                <button style={{marginRight:"20px"}} onClick={()=>{navigator(1)}}>앞으로가기</button>
                <button style={{marginRight:"20px"}} onClick={()=>{navigator(-1)}}>뒤로가기</button>

                <Link style={{marginRight:"20px", }} to="/">홈</Link>
                <Link style={{
                    marginRight:"20px",
                    fontWeight: URL.includes("login") ? "bold" : "normal",
                    color: URL.includes("login") ? "red" : "black",
                            }} 
            to="/login">로그인</Link>
            
                <Link to="/worldcup">월드컵</Link>
                <Link to="/about">소개</Link>
                {/* Link 태그 권장 */}
        </div>
        <Outlet/>
    </>
  )
}

export default Root