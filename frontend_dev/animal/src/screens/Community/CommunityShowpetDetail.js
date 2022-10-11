import React, { useState, useEffect } from "react";
import "./CommunityShowpetDetail.css";
import Comments from "../../components/comments/Comments";
import CommentInput from "../../components/comments/CommentInput";
import {
  deleteShowpet,
  getShowListDetail,
  getShowpetComments,
} from "../../api/community";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { transform } from "../../function/functions";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { getUserInfo } from "../../api/user";

const StyledBtn = styled.button`
  text-align: center;
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 15px;
  font-size: 23px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  color: black;
  background: #f5c6aa;
  margin: 20px;
  font-family: "Kotra";
`;

const CommunityShowpetDetail = ({ show }) => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [id, setId] = useState("");

  const params = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getUserid();
    getShowpetDetail();
  }, []);

  const getUserid = async () => {
    try {
      const { data } = await getUserInfo();
      setId(data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const getShowpetDetail = async () => {
    try {
      const { data } = await getShowListDetail(params.id);
      setArticle(data.data);
      setComments(data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const { data } = await deleteShowpet(article.id);
        if (data.success) {
          alert("삭제되었습니다.");
          navigator("/show-pet/list");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //글 수정
  const editArticle = () => {
    navigator("/show-pet", {
      state: article,
    });
  };

  //댓글만 불러오기
  const getComments = async () => {
    try {
      const { data } = await getShowpetComments(params.id);
      setComments(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="showpet-detail">
      <div className="article">
        <h2>제목 : {article.title}</h2>
        <div className="title">
          <p>작성일 : {transform(article.date, "chat")}</p>
          <p>반려동물 이름 : {article.name}</p>
        </div>
        <div id="carousel-wrap">
          <Carousel variant="dark" style={{ width: "400px" }}>
            {article.imgs &&
              article.imgs.map((img, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <img
                      src={img.img_url}
                      alt="mypet"
                      className="d-block w-100"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </div>

        <div className="content">
          <div className="content-description">내용 : {article.content}</div>
        </div>
      </div>
      {id === article.user_id && (
        <div>
          <StyledBtn className="showpet-edit" onClick={() => editArticle()}>
            수정
          </StyledBtn>
          <StyledBtn className="showpet-delete" onClick={() => deleteArticle()}>
            삭제
          </StyledBtn>
        </div>
      )}
      <hr />
      <div className="comment flex column" style={{ width: "700px" }}>
        <div className="comment-head">
          <h4 className="notoMid">댓글</h4>
        </div>
        <div className="comment-input flex">
          <div className="input-img-container flex"></div>
          <CommentInput getComments={getComments} />
        </div>
        {comments.length !== 0 ? (
          <Comments comments={comments} getComments={getComments} id={id} />
        ) : null}
      </div>
    </div>
  );
};

export default CommunityShowpetDetail;
