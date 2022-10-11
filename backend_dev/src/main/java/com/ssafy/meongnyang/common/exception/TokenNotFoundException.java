package com.ssafy.meongnyang.common.exception;

public class TokenNotFoundException extends IllegalArgumentException {
    public TokenNotFoundException() {
        super("토큰을 찾을 수 없습니다.");
    }

    public TokenNotFoundException(String msg) {
        super(msg);
    }

    public TokenNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public TokenNotFoundException(Throwable cause) {
        super(cause);
    }
}