import React from "react";
import "./Main.css";
import Carousel from 'react-bootstrap/Carousel';
import Lottie from 'lottie-react'
import pet from './../lotties/pet.json'
import question from './../lotties/question.json'
import ai from './../lotties/ai.json'
import maindiagnose from './../lotties/maindiagnose.json'
import styled from 'styled-components';

const StyledBtn = styled.button`
    text-align: center;
    width: 250px;
    height: 70px;
    border: none;
    border-radius: 15px;
    font-size: 40px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    color: black;
    background: #F5C6AA;
    &:focus {
        box-shadow: 0px 0px 4px 3px #FFAE6D;
    }
    
    `;

function Main() {
  let accessToken = localStorage.getItem('accessToken')
  return (
    <div id='main-box1'>
      <div id='main-lottie'>
        <Lottie animationData={pet} style={{'width':'200px'}}></Lottie>
        <h1 style={{'fontSize':'60px', 'textAlign':'center'}}><p>반려동물 인공지능 진단 서비스</p><p>이게멍냥</p></h1>
      </div>
      <Horizontal />
      <div id='description-1'>
        <img src='/sick.png' id='img-1'></img>
        <h3 style={{'fontSize':'30px'}}>반려동물이 아플 때 원인을 몰라 답답했던 적이 있나요?</h3>
        <Lottie animationData={question} style={{'width':'150px'}}></Lottie>
      </div>
      <Horizontal />
      <div id='description-2'>
        <div id='tmpBox'>
          <Lottie animationData={ai} style={{'width':'150px'}}></Lottie>
          <div id='tmpInner'>
            <h3 style={{'fontSize':'30px'}}>이게멍냥의 인공지능 진단서비스를 활용해 보세요!</h3>
            <h3 style={{'fontSize':'30px'}}>이게멍냥은 아래와 같은 서비스를 제공합니다.</h3>
          </div>
          
        </div>
        <div id='carousel'>
          <Carousel variant="dark">
            <Carousel.Item interval={4000}>
              <img
                className="d-block w-100"
                src="/page1.png"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 style={{'fontSize':'30px'}}>반려동물의 정보와 아픈부위 사진을 업로드해주세요</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
              <img
                className="d-block w-100"
                src="/page2.png"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3 style={{'fontSize':'30px'}}>인공지능이 질병을 분석해 결과를 보여줄거에요</h3>
              </Carousel.Caption>
            </Carousel.Item >
            <Carousel.Item interval={4000}>
              <img
                className="d-block w-100"
                src="page3.png"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 style={{'fontSize':'30px'}}>진단결과를 저장할 수도 있어요</h3>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={4000}>
              <img
                className="d-block w-100"
                src="page4.png"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 style={{'fontSize':'30px'}}>커뮤니티에서 반려동물을 자랑하고 실종신고도 할 수 있어요</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <div id='description-3'>
        <Lottie animationData={maindiagnose} style={{'width': '100px'}}></Lottie>
        <h3 style={{'fontSize':'30px'}}>아래 버튼을 눌러 진단을 시작해보세요</h3>
      </div>
      <StyledBtn onClick={()=>{
        if (accessToken) {
          document.location.href='/diagnose'
        } else {
          alert('로그인이 필요한 서비스입니다.')
        }
      }}>진단하기</StyledBtn>
    </div>
  );
}

const Horizontal = () => {
  return (
    <div
      style={{
        width: "70%",
        textAlign: "center",
        borderBottom: "3px solid #aaa",
        margin: "10px 0 20px",
      }}
    >
      <span style={{ background: "#fff", padding: "0 10px" }}></span>
    </div>
  )
}

export default Main;
