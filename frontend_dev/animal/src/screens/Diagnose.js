import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "./Diagnose.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Lottie from "lottie-react";
import diagnose from "./../lotties/diagnose.json";
import { isMobile } from "react-device-detect";
import search from "./../lotties/search.json";
import paper from "./../lotties/paper.json";
import treat from "./../lotties/treat.json";
import treatMethod from "./../treats/treatMethod.json";

const StyledBtn = styled.button`
  text-align: center;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  color: black;
  background: #f5c6aa;
  &:focus {
    box-shadow: 0px 0px 4px 3px #ffae6d;
  }
`;

const StyledInput = styled.input`
  border-radius: 4px;
  font-size: 22px;
  margin-left: 10px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  width: 80%;
  height: 40px;
  border: none;
  background-color: white;
  display: flex;
  outline: none;
`;

const Innerbox = styled.div`
  display: flex;
  font-weight: bold;
  width: 100%;
  height: 60px;
  background: #f8e2cf;
  border-radius: 5px;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

const Diagnose = () => {
  let [showResult, setShowResult] = useState(false);
  let [name, setName] = useState("");
  let [type, setType] = useState("");
  let [part, setPart] = useState("");
  // img는 img 파일명
  let [img, setImg] = useState("");
  let [file, setFile] = useState(null);
  let [info, setInfo] = useState({
    name: "",
    type: "",
    part: "",
    img: "",
    imgUrl: "",
  });

  useEffect(() => {
    if (type === "cat" && part === "skin") {
      alert("고양이 피부데이터는 준비중입니다.");
      document.location.href = "/diagnose";
    }
  }, [part]);
  return (
    <div>
      {showResult ? (
        <DiagnoseResult info={info} />
      ) : (
        <div className="box">
          <div>
            <div id="lottie-text">
              <Lottie
                animationData={diagnose}
                style={{ width: "100px" }}
              ></Lottie>
              <p style={{ fontSize: "50px", marginTop: "25px" }}>진단하기</p>
            </div>
            <Innerbox id="text">
              이름:
              <StyledInput
                placeholder="반려동물의 이름을 입력해주세요"
                onInput={(e) => {
                  setName(e.target.value);
                }}
              ></StyledInput>
            </Innerbox>

            <Innerbox id="text">
              종:
              <Form style={{'marginLeft':'20px'}}>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`}>
                    <Form.Check
                      onClick={() => {
                        setType("dog");
                      }}
                      inline
                      label="강아지"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      onClick={() => {
                        setType("cat");
                      }}
                      inline
                      label="고양이"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                  </div>
                ))}
              </Form>
            </Innerbox>

            <Innerbox id="text">
              아픈부위:
              <Form style={{'marginLeft':'20px'}}>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`}>
                    <Form.Check
                      onClick={() => {
                        setPart("skin");
                      }}
                      inline
                      label="피부"
                      name="group1"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      onClick={() => {
                        setPart("eye");
                      }}
                      inline
                      label="안구"
                      name="group1"
                      type={type}
                      id={`inline-${type}-4`}
                    />
                  </div>
                ))}
              </Form>
            </Innerbox>
            {isMobile ? (
              <Innerbox>
                <label id="picture" for="input-file">
                  촬영하기
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
                      new Date().getSeconds();
                    setImg(fileName);
                  }}
                ></input>

                <label id="picture" for="upload-file">
                  업로드 하기
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-file"
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
                      new Date().getSeconds() +
                      ".png";
                    setImg(fileName);
                  }}
                ></input>
              </Innerbox>
            ) : (
              <Innerbox>
                <label id="picture" for="upload-file">
                  업로드 하기
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-file"
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
                      new Date().getSeconds() +
                      ".png";
                    setImg(fileName);
                  }}
                ></input>
              </Innerbox>
            )}

            <StyledBtn
              id="diagnoseBtn"
              onClick={() => {
                if (name && part && img && type) {
                  let formData = new FormData();
                  formData.append("uploadFile", file, img);
                  setInfo((info.type = type));
                  setInfo((info.part = part));
                  setInfo((info.img = img));
                  setInfo(
                    (info.imgUrl = `http://j7c101.p.ssafy.io:3003/${img}`)
                  );
                  setInfo((info.name = name));
                  setInfo((info = info));
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
                      setShowResult(true);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  alert("모든 항목을 선택해 주세요");
                }
              }}
            >
              진단하기
            </StyledBtn>
          </div>
        </div>
      )}
    </div>
  );
};

const Loading = () => {
  return (
    <div id="loading-style">
      <Lottie animationData={search} id="search-lottie"></Lottie>
      <p id="search-text">진단중입니다...</p>
    </div>
  );
};

const DiagnoseResult = (props) => {
  let accessToken = localStorage.getItem("accessToken");
  let [loading, setLoading] = useState(true);
  let [result, setResult] = useState(null);
  let [treats, setTreats] = useState("");
  let info = props.info;
  // const axiosAPI = axios.create({
  //     baseURL: 'http://j7c101.p.ssafy.io:8080/api/diagnose',
  //     headers: {
  //         authorization : `Bearer ${accessToken}`
  //     },
  //     data: {
  //         disease_name1 : result[0][0],
  //         disease_name2 : result[1][0],
  //         disease_name3 : result[2][0],
  //         img_url : info.imgUrl,
  //         name : info.name,
  //         probability1: result[0][1],
  //         probability2: result[1][1],
  //         probability3: result[2][1]
  //     },
  // })

  useEffect(() => {
    let info = props.info;
    axios({
      url: `http://j7c101.p.ssafy.io:5550/ai/${info.part}/${info.type}`,
      method: "post",
      data: {
        imagePath: info.imgUrl,
      },
    }).then((res) => {
      setResult(res.data);
      setTreats(treatMethod[res.data[0][0]]);
      setLoading(false);
      console.log('호출성공')
    });
  }, []);

  return (
    <div id="result-box">
      {loading ? (
        <Loading />
      ) : (
        <div id="diagnose-result">
          <div id="result-header">
            <Lottie id="result-paper" animationData={paper}></Lottie>
            <h2 style={{ fontSize: "60px" }}>진단결과</h2>
          </div>
          <img
            src={info.imgUrl}
            style={{ width: "350px", marginBottom: "30px" }}
          ></img>
          <div>
            <div id="result-item">
              {result[0][0].substr(2)}일 확률{" "}
              <ProgressBar
                style={{ height: "30px", fontSize: "30px" }}
                striped
                animated
                variant="danger"
                now={Math.round(result[0][1] * 100)}
                label={`${Math.round(result[0][1] * 100)}%`}
              />
            </div>
            <div id="result-item">
              {result[1][0].substr(2)}일 확률{" "}
              <ProgressBar
                style={{ height: "30px", fontSize: "30px" }}
                striped
                animated
                variant="warning"
                now={Math.round(result[1][1] * 100)}
                label={`${Math.round(result[1][1] * 100)}%`}
              />
            </div>
            <div id="result-item">
              {result[2][0].substr(2)}일 확률{" "}
              <ProgressBar
                style={{ height: "30px", fontSize: "30px" }}
                striped
                animated
                variant="info"
                now={Math.round(result[2][1] * 100)}
                label={`${Math.round(result[2][1] * 100)}%`}
              />
            </div>
          </div>
          <div id="treat-header">
            <Lottie id="treat" animationData={treat}></Lottie>
            <h2 style={{ fontSize: "60px" }}>{`${result[0][0].substr(
              2
            )} 대처법`}</h2>
          </div>
          <div style={{ width: "550px", marginBottom: "30px" }}>{treats}</div>
          <StyledBtn
            id="btn10"
            onClick={() => {
              // axiosAPI.interceptors.response.use(
              //     response => {
              //         return response
              //     },
              //     (error) => {
              //         const {
              //             config,
              //             response : {status},
              //         } = error;

              //         const OriginalRequest = config;

              //         if (status === 401) {
              //             const refreshToken = localStorage.getItem('refreshToken');
              //             axios({
              //                 url : `http://j7c101.p.ssafy.io:8080/token/reissuance/${refreshToken}`,
              //                 method: 'get',
              //                 headers: {
              //                     authorization : `Bearer ${accessToken}`
              //                 }
              //             })
              //             .then((res)=>{
              //                 const accessToken = res.data.accessToken
              //                 localStorage.setItem('accessToken', accessToken)
              //                 OriginalRequest.headers = {authorization : accessToken}
              //                 return axios(OriginalRequest)
              //             })
              //         }
              //         return Promise.reject(error);
              //     }
              // )
              axios({
                url: "http://j7c101.p.ssafy.io:8080/api/diagnose",
                method: "post",
                data: {
                  disease_name1: result[0][0],
                  disease_name2: result[1][0],
                  disease_name3: result[2][0],
                  img_url: info.imgUrl,
                  name: info.name,
                  probability1: Math.round(result[0][1] * 100),
                  probability2: Math.round(result[1][1] * 100),
                  probability3: Math.round(result[2][1] * 100),
                },
                headers: {
                  authorization: `Bearer ${accessToken}`,
                },
              })
                .then((res) => {
                  alert("진단내역 등록 성공하였습니다.");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            진단내역 저장하기
          </StyledBtn>
        </div>
      )}
    </div>
  );
};

export default Diagnose;
