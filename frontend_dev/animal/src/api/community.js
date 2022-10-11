import { http } from "./http";

//자랑하기 글 목록 가져오기
export const getShowList = () => {
  return http.get(`/show-pet/list`);
};

//자랑하기 글 등록
export const postShowpet = (data) => {
  return http.post(`/show-pet`, data);
};

//자랑하기 글 수정
export const putShowpet = (data) => {
  return http.put(`/show-pet`, data);
};

//자랑하기 글 삭제
export const deleteShowpet = (id) => {
  return http.delete(`/show-pet/${id}`);
};

//자랑하기 글 상세 조회 가져오기
export const getShowListDetail = (id) => {
  return http.get(`/show-pet/${id}`);
};

//자랑하기 댓글 목록 조회
export const getShowpetComments = (id) => {
  //글 id
  return http.get(`/show-pet/comment/list/${id}`);
};

//자랑하기 댓글 등록
export const postShowpetComment = (data) => {
  return http.post(`/show-pet/comment`, data);
};

//자랑하기 댓글 수정
export const putShowpetComment = (data) => {
  return http.put(`/show-pet/comment`, data);
};

//자랑하기 댓글 삭제
export const deleteShowpetComment = (id) => {
  return http.delete(`/show-pet/comment/${id}`);
};

export const getLostList = () => {
  return http.get(`/lost/list`);
};

export const postLost = (data) => {
  return http.post(`/lost`, data);
};

export const putLost = (data) => {
  return http.put(`/lost`, data);
};

export const deleteLost = (id) => {
  return http.delete(`/lost/${id}`);
};

export const putIsFound = (data) => {
  return http.put(`/lost/found`, data);
};
