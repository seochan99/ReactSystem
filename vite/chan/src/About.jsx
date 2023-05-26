import React from 'react'
import nexion from '../src/assets/images/넥슨mod.png'

function About() {
  return (
    <>
        <div>About</div>
        <img src={nexion} alt="넥슨" width="300px" height="300px" style={{borderRadius:"50px"}}/>
        <h2>이름 : 서희찬</h2>
        <h2>나이 : 26</h2>
        <h2>직업 : 프론트엔드 개발자</h2>
        <h2>취미 : 게임, 운동</h2>
        <h2>좋아하는 음식 : 떡볶이, 치킨, 피자</h2>
        <h2>좋아하는 동물 : 강아지</h2>
        <h2>좋아하는 색 : 노랑</h2>
        <h2>좋아하는 영화 : 쇼생크 탈출</h2>
        <h2>좋아하는 음악 : 노래</h2>
        <h2>좋아하는 게임 : 리그오브레전드</h2>
        <h2>좋아하는 스포츠 : 축구</h2>
    </>
  )
}

export default About