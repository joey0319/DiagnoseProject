import React, { useState, useRef } from "react";
import "./LostCreate.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { postLost } from "../../api/community";
import axios from "axios";
import Lottie from "lottie-react";
import lost from "./../../lotties/lost.json";
import styled from "styled-components";

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleDiv = styled.div`
  margin-left: 20px;
`;
const FlexOneDiv = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  font-size: 22px;
  margin-left: 10px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  width: 100%;
  height: 40px;
  border: none;
  background-color: white;
  display: flex;
  outline: none;
  margin-right: 12px;
  padding: 0 6px;
`;

const Innerbox = styled.div`
  display: flex;
  font-weight: bold;
  width: 100%;
  height: 60px;
  background: #f8e2cf;
  border-radius: 5px;
  margin: 0 0 8px;
  align-items: center;
  justify-content: space-between;
`;
const Textareabox = styled.div`
  display: flex;
  font-weight: bold;
  width: 100%;
  height: 160px;
  background: #f8e2cf;
  border-radius: 5px;
  margin: 20px 0;
  align-items: center;
`;

const Styledtextarea = styled.textarea`
  border-radius: 4px;
  font-size: 22px;
  margin: 0 10px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  height: 130px;
  border: none;
  background-color: white;
  display: flex;
  outline: none;
`;

const StyledBtn = styled.button`
  text-align: center;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  color: black;
  background: #f5c6aa;
  &:focus {
    box-shadow: 0px 0px 4px 3px #ffae6d;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const LostCreate = () => {
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const weightRef = useRef(null);
  const kindRef = useRef(null);
  const placeRef = useRef(null);
  const phoneRef = useRef(null);
  const payRef = useRef(null);
  const etcRef = useRef(null);
  const lost_dateRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const [type, setType] = useState(0);

  const imgServerUrl = process.env.REACT_APP_IMAGE_SERVER_URL;
  let serverName = [];

  const navigate = useNavigate();

  const sendImage = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("photos", files[i], filenames[i]);
      }
      const { data } = await axios({
        url: `${imgServerUrl}/upload-multi`,
        method: "post",
        headers: {
          processData: false,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (data.status) {
        serverName = [];
        data.data.map((img, idx) => {
          return serverName.push(`${imgServerUrl}/${img.name}`);
        });
        sendLost();
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const sendLost = async () => {
    try {
      const { data } = await postLost({
        is_found: false,
        title: titleRef.current.value,
        name: nameRef.current.value,
        gender: type,
        age: ageRef.current.value,
        weight: weightRef.current.value,
        kind: kindRef.current.value,
        place: placeRef.current.value,
        phone: phoneRef.current.value,
        etc: etcRef.current.value,
        lost_date: lost_dateRef.current.value,
        pay: payRef.current.value,
        imgs: filenames,
      });
      if (data.success) {
        alert("등록 되었습니다!");
        navigate(`/lost/list`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeFiles = (e) => {
    e.preventDefault();
    setFiles(e.target.files);
    let today = new Date();
    const fileName = `img_${today.getFullYear()}${
      today.getMonth() + 1
    }${today.getDate()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}`;
    let length = e.target.files.length;
    let filenames = [];
    for (let i = 0; i < length; i++) {
      filenames.push(`${fileName}_${i}.png`);
    }
    setFilenames(filenames);
  };
  return (
    <div id="lost-create">
      <HeaderDiv id="showpet-lost-lottie">
        <Lottie animationData={lost} style={{ width: "120px" }} />
        <h1 style={{ fontSize: "50px" }}>실종 글 작성하기</h1>
      </HeaderDiv>
      <form onSubmit={(e) => sendImage(e)}>
        <Innerbox>
          <TitleDiv className="f_1">제목</TitleDiv>
          <StyledInput
            className="f_8"
            type="text"
            ref={titleRef}
            placeholder="제목을 입력해 주세요"
            required
          />
        </Innerbox>
        <Innerbox>
          <FlexOneDiv>
            <TitleDiv className="f_2">이름</TitleDiv>
            <StyledInput
              className="f_6"
              type="text"
              ref={nameRef}
              placeholder="이름을 입력해 주세요"
              required
            />
          </FlexOneDiv>
          <FlexOneDiv className="ai_cen">
            {["radio"].map((type) => (
              <div key={`inline-${type}`}>
                <Form.Check
                  inline
                  onClick={() => {
                    setType(0);
                  }}
                  label="수컷"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                  checked
                />
                <Form.Check
                  inline
                  onClick={() => {
                    setType(1);
                  }}
                  label="암컷"
                  name="group1"
                  value={1}
                  type={type}
                  id={`inline-${type}-2`}
                />
              </div>
            ))}
          </FlexOneDiv>
        </Innerbox>
        <Innerbox>
          <FlexOneDiv>
            <TitleDiv className="f_2">실종날짜</TitleDiv>
            <StyledInput
              className="f_6"
              ref={lost_dateRef}
              type="text"
              placeholder="실종날짜"
              required
            />
          </FlexOneDiv>
          <FlexOneDiv>
            <TitleDiv className="f_2">나이</TitleDiv>
            <StyledInput
              className="f_6"
              ref={ageRef}
              type="text"
              placeholder="나이"
              required
            />
          </FlexOneDiv>
        </Innerbox>
        <Innerbox>
          <FlexOneDiv>
            <TitleDiv className="f_2">몸무게</TitleDiv>
            <StyledInput
              className="f_6"
              ref={weightRef}
              type="text"
              placeholder="kg"
              required
            />
          </FlexOneDiv>
          <FlexOneDiv>
            <TitleDiv className="f_2">품종</TitleDiv>
            <StyledInput
              className="f_6"
              ref={kindRef}
              type="text"
              placeholder="품종"
              required
            />
          </FlexOneDiv>
        </Innerbox>
        <Innerbox>
          <TitleDiv className="f_1">실종장소</TitleDiv>
          <StyledInput
            className="f_8"
            ref={placeRef}
            type="text"
            placeholder="장소"
            required
          />
        </Innerbox>
        <Innerbox>
          <FlexOneDiv>
            <TitleDiv className="f_2">연락처</TitleDiv>
            <StyledInput
              className="f_6"
              ref={phoneRef}
              type="text"
              placeholder="000-0000-0000"
              required
            />
          </FlexOneDiv>
          <FlexOneDiv>
            <TitleDiv className="f_2">사례금</TitleDiv>
            <StyledInput
              className="f_6"
              ref={payRef}
              type="text"
              placeholder="00만원"
              required
            />
          </FlexOneDiv>
        </Innerbox>
        <Textareabox>
          <TitleDiv className="f_1">설명</TitleDiv>
          <Styledtextarea
            className="f_8"
            ref={etcRef}
            as="textarea"
            aria-label="With textarea"
          />
        </Textareabox>
        <Innerbox>
          <input
            className="ml-10"
            type="file"
            accept="image/*"
            id="lost-img"
            multiple={true}
            onChange={(e) => {
              changeFiles(e);
            }}
          />
        </Innerbox>
        <BtnDiv>
          <StyledBtn className="sub-btn" type="submit">
            등록
          </StyledBtn>
        </BtnDiv>
      </form>
    </div>
  );
};
export default LostCreate;
