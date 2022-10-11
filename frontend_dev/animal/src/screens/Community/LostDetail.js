import React, { useState, useEffect } from "react";
import "./LostDetail.css";
import { putIsFound, deleteLost } from "../../api/community";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";

const StyledBtn = styled.button`
  text-align: center;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  color: black;
  background: #f5c6aa;
  margin-left: 20px;
  &:focus {
    box-shadow: 0px 0px 4px 3px #ffae6d;
  }
`;

function CommunityLostDetail({ lost, isAuthor }) {
  const imgServerUrl = process.env.REACT_APP_IMAGE_SERVER_URL;

  const [isFound, setIsFound] = useState(lost.is_found);
  const navigate = useNavigate();

  const toggleFound = async () => {
    setIsFound(!isFound);
    try {
      const { data } = await putIsFound({
        id: lost.id,
        is_found: !isFound,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const { data } = await deleteLost(lost.id);
        if (data.success) {
          alert("삭제되었습니다.");
          navigate("/lost/list");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={isFound ? 'find' : 'lost'}>
      <Carousel variant="dark" style={{ 'width': '400px' }}>
        {lost.imgs &&
          lost.imgs.map((img, idx) => {
            return (
              <Carousel.Item key={idx}>
                <img
                  src={`${imgServerUrl}/${img.img_url}`}
                  alt="mypet"
                  className="d-block w-100"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
      <div className="lost-content">
        <h5>{lost.title}</h5>
        <p className="content-item">
          이름 : {lost.name} / {lost.kind}
        </p>
        <p className="content-item">
          무게 : {lost.weight}, {lost.gender === 1 ? "암컷" : "수컷"}
        </p>
        <p className="content-item">나이 : {lost.age}</p>
        <p className="content-item">실종일 : {lost.lost_date}</p>
        <p className="content-item">실종 장소 : {lost.place}</p>
        <p className="content-item">연락처 : {lost.phone}</p>
        <p className="content-item">포상금 : {lost.pay}</p>
        <p className="content-item">{lost.etc}</p>
        {isAuthor &&
          <div className="btns">
            <div>
              찾았나요?
              <input
                className="lost-isfound"
                type="checkbox"
                onChange={toggleFound}
                checked={isFound ? true : false}
              />
            </div>
            <StyledBtn className="lost-delete" onClick={() => deleteArticle()}>
              삭제
            </StyledBtn>
          </div>
        }
      </div>
    </div>
  );
}

export default CommunityLostDetail;
