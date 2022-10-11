import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Mypage.css";
import styled from "styled-components";
import Lottie from "lottie-react";
import profile from "./../lotties/profile.json";
import loadLottie from "./../lotties/loading.json";

const StyledBtn = styled.button`
  text-align: center;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 15px;
  font-size: 10px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  color: black;
  background: #f5c6aa;
  &:focus {
    box-shadow: 0px 0px 4px 3px #ffae6d;
  }
  margin: 10px;
`;

const MyPage = () => {
  let [userInfo, setUserInfo] = useState(null);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    axios({
      url: "http://j7c101.p.ssafy.io:8080/api/user", // 회원정보 조회 api 주소
      method: "get",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div id="mypage-box">
      {loading ? (
        <Loading />
      ) : (
        <div id="mypage-inner">
          <div id="mypage-lottie">
            <Lottie animationData={profile} style={{ width: "80px" }}></Lottie>
            <h1 style={{ fontSize: "60px" }}>{userInfo.name}님의 프로필</h1>
          </div>
          <div></div>
          <Container>
            <Row id="mypage">
              <Col>
                <Card id="mypage-card" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={userInfo.profile_img} />
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item id="mypage-text">
                      이름 : {userInfo.name}
                    </ListGroup.Item>
                    <ListGroup.Item id="mypage-text">
                      이메일 : {userInfo.email}
                    </ListGroup.Item>
                    <ListGroup.Item id="mypage-text">
                      닉네임 : {userInfo.nickname}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
                <div id="btn1">
                  <StyledBtn
                    style={{ fontSize: "18px" }}
                    onClick={() => {
                      document.location.href = "/articlelist";
                    }}
                  >
                    작성한 글 보기
                  </StyledBtn>
                  <StyledBtn
                    style={{ fontSize: "18px" }}
                    onClick={() => {
                      document.location.href = "/diagnoselist";
                    }}
                  >
                    진단내역 보기
                  </StyledBtn>
                  <StyledBtn
                    style={{ fontSize: "18px" }}
                    onClick={() => {
                      document.location.href = "/profileupdate";
                    }}
                  >
                    프로필 수정
                  </StyledBtn>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Lottie animationData={loadLottie} style={{ width: "500px" }}></Lottie>
    </div>
  );
};

export default MyPage;
