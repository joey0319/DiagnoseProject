import React, { useState, useEffect } from "react";
import "./CommunityShowpetDetail.css";
import { getShowList } from "../../api/community";
import CardList from "../../components/CardList";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBtn = styled.button`
  margin-left: 10px;
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

function CommunityShowpet() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const goEdit = () => {
    navigate("/show-pet");
  };
  useEffect(() => {
    getShowListApi();
  }, []);

  const getShowListApi = async () => {
    try {
      const { data } = await getShowList();
      setList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="showpet">
      <StyledBtn className="notoReg" type="button" onClick={goEdit}>
        자랑하기 글 작성
      </StyledBtn>
      <CardList cards={list} />
    </div>
  );
}

export default CommunityShowpet;
