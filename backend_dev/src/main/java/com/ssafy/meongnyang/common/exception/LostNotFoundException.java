package com.ssafy.meongnyang.common.exception;

public class LostNotFoundException extends RuntimeException {
    public LostNotFoundException() {super("해당 실종 글을 찾을 수 없습니다.");}

    public LostNotFoundException(String msg) {super(msg);}

    public LostNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public LostNotFoundException(Throwable cause) {super(cause);}

    protected LostNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
