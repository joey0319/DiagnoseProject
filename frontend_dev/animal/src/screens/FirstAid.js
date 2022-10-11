import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./FirstAid.css";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import Lottie from "lottie-react";
import emergence from "./../lotties/emergence.json";

const FirstAidPage = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);

  return (
    <div>
      <div id="firstaid-lottie">
        <Lottie animationData={emergence} style={{ width: "200px" }}></Lottie>
        <h1 style={{ fontSize: "60px" }}>위급상황에 아래와 같이 대처하세요</h1>
      </div>
      <div className="container" style={{ display: "flex" }}>
        <div className="container text-center" id="box">
          <br></br>
          <p style={{ fontSize: "30px", fontFamily: "Kotra" }}>
            의식이 없을 때
          </p>
          <img className="animalImg" src="/conciousness.jpg"></img>
          <br></br>
          <Button
            className="mt-2"
            id="btn"
            onClick={() => {
              setShow1(true);
            }}
          >
            대처법 보기
          </Button>
        </div>

        <div className="container text-center" id="box">
          <br></br>
          <p style={{ fontSize: "30px", fontFamily: "Kotra" }}>
            기도에 이물질이 들어갔을 때
          </p>
          <img className="animalImg1" src="/airway.jpg"></img>
          <br></br>
          <Button
            className="mt-2"
            id="btn"
            onClick={() => {
              setShow2(true);
            }}
          >
            대처법 보기
          </Button>
        </div>

        <div className="container text-center" id="box">
          <br></br>
          <p style={{ fontSize: "30px", fontFamily: "Kotra" }}>
            화상을 입었을 때
          </p>
          <img className="animalImg2" src="/burn.jpg"></img>
          <br></br>
          <Button
            className="mt-2"
            id="btn"
            onClick={() => {
              setShow3(true);
            }}
          >
            대처법 보기
          </Button>
        </div>
      </div>
      {/* <Container id='first-aid-box'>
            <br></br>
            <br></br>
            <Row>
                <Col>
                    <div className='container text-center' id='box'>
                        <br></br>
                        <p style={{'fontSize':'35px', 'fontFamily':'Kotra'}}>의식이 없을 때</p>
                        <img className='animalImg' src='/conciousness.jpg'></img><br></br>
                        <Button className='mt-4' id='btn'
                        onClick={()=>{
                            setShow1(true)
                        }}
                        >대처법 보기</Button>
                    </div>
                </Col>
                    
                <Col>
                    <div className='container text-center' id='box'>
                        <br></br>
                        <p style={{'fontSize':'35px', 'fontFamily':'Kotra'}}>기도에 이물질이 들어갔을 때</p>
                        <img className='animalImg1' src='/airway.jpg'></img><br></br>
                        <Button className='mt-4' id='btn'
                        onClick={()=>{
                            setShow2(true)
                        }}
                        >대처법 보기</Button>
                    </div>
                </Col>

                <Col>
                    <div className='container text-center' id='box'>
                        <br></br>
                        <p style={{'fontSize':'35px', 'fontFamily':'Kotra'}}>화상을 입었을 때</p>
                        <img className='animalImg2' src='/burn.jpg'></img><br></br>
                        <Button className='mt-4' id='btn'
                        onClick={()=>{
                            setShow3(true)
                        }}
                        >대처법 보기</Button>
                    </div>
                </Col>
            </Row>
            </Container> */}

      <Modal className="modal" size="lg" show={show1} onHide={handleClose1}>
        <Modal.Header closeButton id="modal-header">
          <Modal.Title style={{ "font-family": "Kotra" }}>
            의식이 없을 때 대처법
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" id="modal-body">
          <YouTube
            videoId="CzSy0qELgWM"
            opts={{
              width: "700",
              height: "400",
              playerVars: {
                autoplay: 1, //자동재생 O
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
          ></YouTube>
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className="modal" size="lg" show={show2} onHide={handleClose2}>
        <Modal.Header closeButton id="modal-header">
          <Modal.Title style={{ "font-family": "Kotra" }}>
            기도에 이물질이 들어갔을 때 대처법
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" id="modal-body">
          <YouTube
            videoId="jj3Q-ek-IuY"
            opts={{
              width: "700",
              height: "400",
              playerVars: {
                autoplay: 1, //자동재생 O
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
          ></YouTube>
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className="modal" size="lg" show={show3} onHide={handleClose3}>
        <Modal.Header closeButton id="modal-header">
          <Modal.Title style={{ "font-family": "Kotra" }}>
            화상을 입었을 때 대처법
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" id="modal-body">
          <YouTube
            videoId="ncJy__u9Sek"
            opts={{
              width: "700",
              height: "400",
              playerVars: {
                autoplay: 1, //자동재생 O
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
          ></YouTube>
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FirstAidPage;
