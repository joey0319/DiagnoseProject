import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./CommentInput.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { postShowpetComment } from "../../api/community";

function CommentInput({ item, comments, getComments }) {
  const [id, setId] = useState(0);
  const commentRef = useRef();
  const param = useParams();

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    setId(param.id);
    if (item) {
      commentRef.current.value = item.content;
    }
  }, []);

  //댓글 등록하기
  const submit = async () => {
    if (commentRef.current.value.trim() !== "") {
      try {
        const content = commentRef.current.value;
        const { data } = await postShowpetComment({
          content: content,
          id: id,
        });
        if (data.success) {
          alert("댓글이 등록되었습니다.");
          commentRef.current.value = "";
          getComments();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("댓글을 작성해주세요");
    }
  };

  return (
    <div id="comments-input">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="댓글을 작성해주세요"
          aria-describedby="basic-addon2"
          ref={commentRef}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => submit()}
        >
          등록
        </Button>
      </InputGroup>
    </div>
  );
}

export default CommentInput;
