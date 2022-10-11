import { http } from "./http";

//회원 정보 조회
export const getUserInfo = () => {
  return http.get(`/user`);
};
