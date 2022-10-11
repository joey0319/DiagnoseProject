import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getLostList } from "../../api/community";
import { getUserInfo } from "../../api/user";
import LostDetail from "./LostDetail";

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

function LostDetailList({ id }) {
  const [lostList, setLostList] = useState([]);

  const navigate = useNavigate();

  const goEdit2 = () => {
    navigate("/lost");
  };
  useEffect(() => {
    getLostListApi();
  }, []);

  const getLostListApi = async () => {
    try {
      const { data } = await getLostList();
      setLostList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="lost-list">
      <StyledBtn className="notoReg" type="button" onClick={goEdit2}>
        실종동물 글 작성
      </StyledBtn>
      {lostList.map((lost) => (
        <LostDetail
          lost={lost}
          key={lost.id}
          isAuthor={lost.user_id === id ? true : false}
        />
      ))}
    </div>
  );
}

export default LostDetailList;
