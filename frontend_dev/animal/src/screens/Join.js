import React from "react";
import './Join.css'

function Join() {
  return (
    <div id="join">
      <div className="wrapper text-center">
        <div className="header">
          <div className="header__intro">
            <img className="header__img" src="./MainDog.svg" alt="icon" />
            <p className="header__name">이게멍냥</p>
          </div>
          <p className="header__title">
            반가워요!
            <br />
            이게멍냥입니다.
          </p>
        </div>
        <div className="content">
          <div className="line"></div>
          <p className="header__mention">SNS로 간편하게 가입하기</p>
          <img src='/kakao_login.png' id='joinBtn' onClick={()=>{
            // 카카오 로그인 연결
          }}></img><br></br>
          <img src='/naver_login.png' id='joinBtn' onClick={()=>{
            // 네이버 로그인 연결
          }}></img>
          </div>
      </div>
    </div>
  )
}

export default Join;
