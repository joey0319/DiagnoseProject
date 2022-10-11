package com.ssafy.meongnyang.common.exception;

public class AccessDeniedException extends RuntimeException {
    public AccessDeniedException() {super("잘못된 접근입니다.");}

    public AccessDeniedException(String msg) {super(msg);}

    public AccessDeniedException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public AccessDeniedException(Throwable cause) {super(cause);}

    protected AccessDeniedException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
