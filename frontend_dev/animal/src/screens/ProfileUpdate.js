import "./ProfileUpdate.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Lottie from "lottie-react";
import update from "./../lotties/update.json";
import loadLottie from "./../lotties/loading.json";

const StyledBtn = styled.button`
  text-align: center;
  width: 200px;
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
  margin-top: 10px;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  font-size: 22px;
  margin-left: 10px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  width: 70%;
  height: 40px;
  background-color: white;
  display: flex;
  outline: none;
`;


const ProfileUpdate = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [profileImg, setProfileImg] = useState(null);
  const [nickname, setNickname] = useState("");
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({
    email: "",
    name: "",
    nickname: "",
    profile_img: "",
  });
  const [userInfo, setUserInfo] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    axios({
      url: "http://j7c101.p.ssafy.io:8080/api/user",
      method: "get",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setUserInfo(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo]);
  return (
    <div id="update-box">
      {loading ? (
        <Loading />
      ) : (
        <div id="update-inner">
          <div id="update-lottie">
            <Lottie animationData={update} style={{ width: "200px" }}></Lottie>
            <h1 style={{ fontSize: "60px" }}>프로필 수정</h1>
          </div>
          <Container>
            <Row id="update">
              <Col>
                <Card id="update-card" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={userInfo.profile_img} />
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item id="mypage-text">
                      이름 : {userInfo.name}
                    </ListGroup.Item>
                    <ListGroup.Item id="mypage-text">
                      이메일 : {userInfo.email}
                    </ListGroup.Item>
                    <ListGroup.Item id="profileupdate-input">
                      닉네임 :
                      <StyledInput
                        onChange={(e) => {
                          setNickname(e.target.value);
                        }}
                        placeholder="수정할 닉네임을 입력해주세요"
                      ></StyledInput>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
                <div id='updateBtns'>
                  <label id="updateBtn" for="input-file">
                    프로필 이미지 업로드
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="camera"
                    id="input-file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      const fileName =
                        "img_" +
                        new Date().getFullYear() +
                        (new Date().getMonth() + 1) +
                        new Date().getDate() +
                        new Date().getHours() +
                        new Date().getMinutes() +
                        new Date().getSeconds()+
                        '.png';
                      setProfileImg(fileName);
                    }}
                  ></input>
                  <StyledBtn
                    style={{ fontSize: "23px" }}
                    onClick={() => {

                      if (file && nickname) {
                        let formData = new FormData();
                        formData.append("uploadFile", file, profileImg);
                        setInfo((info.name = userInfo.name));
                        setInfo((info.email = userInfo.email));
                        setInfo((info.nickname = nickname));
                        setInfo(
                          (info.profile_img = `http://j7c101.p.ssafy.io:3003/${profileImg}`)
                        );
                        axios
                          .all([
                            axios({
                              url: "http://j7c101.p.ssafy.io:3003/upload",
                              method: "post",
                              headers: {
                                processData: false,
                                "Content-Type": "multipart/form-data",
                              },
                              data: formData,
                            })
                              .then((res) => {
                                // console.log(res.data);
                              })
                              .catch((err) => {
                                console.log(err);
                              }),
                            axios({
                              url: "http://j7c101.p.ssafy.io:8080/api/user",
                              method: "put",
                              headers: {
                                authorization: `Bearer ${accessToken}`,
                              },
                              data: info,
                            })
                              .then((res) => {
                                // console.log(res.data);
                              })
                              .catch((err) => {
                                console.log(err);
                              }),
                          ])
                          .then(() => {
                            document.location.href = "/mypage";
                          });
                      } else if (!file && nickname) {
                        setInfo((info.name = userInfo.name));
                        setInfo((info.email = userInfo.email));
                        setInfo((info.nickname = nickname));
                        setInfo((info.profile_img = userInfo.profile_img));
                        axios({
                          url: "http://j7c101.p.ssafy.io:8080/api/user",
                          method: "put",
                          headers: {
                            authorization: `Bearer ${accessToken}`,
                          },
                          data: {
                            email: info.email,
                            name: info.name,
                            nickname: info.nickname,
                            profile_img: info.profile_img,
                          },
                        })
                          .then(() => {
                            document.location.href = "/mypage";
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                      else if (!nickname && file) {
                        let formData = new FormData();
                        formData.append("uploadFile", file, profileImg);
                        setInfo((info.name = userInfo.name));
                        setInfo((info.email = userInfo.email));
                        setInfo((info.nickname = userInfo.nickname));
                        setInfo(
                          (info.profile_img = `http://j7c101.p.ssafy.io:3003/${profileImg}`)
                        );
                        axios
                          .all([
                            axios({
                              url: "http://j7c101.p.ssafy.io:3003/upload",
                              method: "post",
                              headers: {
                                processData: false,
                                "Content-Type": "multipart/form-data",
                              },
                              data: formData,
                            })
                              .then((res) => {
                                // console.log(res.data);
                              })
                              .catch((err) => {
                                console.log(err);
                              }),
                            axios({
                              url: "http://j7c101.p.ssafy.io:8080/api/user",
                              method: "put",
                              headers: {
                                authorization: `Bearer ${accessToken}`,
                              },
                              data: info,
                            })
                              .then((res) => {
                                // console.log(res.data);
                              })
                              .catch((err) => {
                                console.log(err);
                              }),
                          ])
                          .then(() => {
                            document.location.href = "/mypage";
                          });
                      } else {
                        alert('변경된 정보가 없습니다.')
                      }
                    }}
                  >
                    수정완료
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

export default ProfileUpdate;
