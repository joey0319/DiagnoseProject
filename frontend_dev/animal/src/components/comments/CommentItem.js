import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CommentItem.css";
import Button from "react-bootstrap/Button";
import { transform } from "../../function/functions";
import { deleteShowpetComment, putShowpetComment } from "../../api/community";
import styled from "styled-components";

const StyledBtn = styled.button`
  text-align: center;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 15px;
  font-size: 15px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  color: black;
  background: #f5c6aa;
  margin: 0 8px;
`;

function CommentsItem({ item, isAuthor, getComments }) {
  const [text, setText] = useState("");
  const [editInput, setEditInput] = useState(false);

  const deleteComment = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const { data } = await deleteShowpetComment(item.id);
        if (data.success) {
          getComments();
        }
      } catch (error) { }
    }
  };

  const commentEdit = async () => {
    try {
      const { data } = await putShowpetComment({
        content: text,
        id: item.id,
      });
      if (data.success) {
        alert("수정되었습니다.");
        getComments();
        setEditInput(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setEditMode = async () => {
    setText(item.content);
    setEditInput(true);
  };

  return (
    <div className="comments-content">
      <div className="comments-item">
        <div className="comments-item__username" style={{ fontSize: "15px" }}>
          {item.user_nickname}
        </div>
        <div className="comments-item__username" style={{ fontSize: "15px" }}>
          {transform(item.date)}
        </div>
      </div>
      {editInput ? (
        <>
          <div>
            <input
              value={text}
              type="text"
              placeholder="댓글을 작성해주세요"
              required
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div className="comments-btn">
            <StyledBtn variant="primary" onClick={() => setEditInput(false)}>
              취소
            </StyledBtn>
            <StyledBtn variant="primary" onClick={() => commentEdit()}>
              수정
            </StyledBtn>
          </div>
        </>
      ) : (
        <div>
          <div className="comments-discription">{item.content}</div>
          {isAuthor ?
            <div className="comments-btn">
              <StyledBtn variant="primary" onClick={() => setEditMode()}>
                수정
              </StyledBtn>
              <StyledBtn variant="danger" onClick={() => deleteComment()}>
                삭제
              </StyledBtn>
            </div> : <div className="comments-btn">
            </div>}
        </div>
      )}
    </div>
  );
}

export default CommentsItem;
