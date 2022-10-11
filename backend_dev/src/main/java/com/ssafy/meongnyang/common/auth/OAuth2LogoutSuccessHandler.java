package com.ssafy.meongnyang.common.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.meongnyang.api.service.UserServiceImpl;
import com.ssafy.meongnyang.common.model.JsonDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2LogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

    private final UserServiceImpl userService;
    private final ObjectMapper objectMapper;

    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response,
                                Authentication authentication) throws IOException, ServletException {

        String authorization = request.getHeader("Authorization");

        userService.logout(authorization.replace("Bearer ", ""));

        if (response.isCommitted()) {
            log.debug("응답이 이미 커밋된 상태입니다. " + "/logout-success" + "로 리다이렉트하도록 바꿀 수 없습니다.");
            return;
        }

        response.setContentType("application/json;charset=UTF-8");

        response.getWriter().write(objectMapper.writeValueAsString(
                JsonDto.builder()
                        .success(true)
                        .message("로그아웃이 정상적으로 처리되었습니다.")
                        .build()
        ));
    }
}