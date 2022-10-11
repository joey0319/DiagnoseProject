package com.ssafy.meongnyang.common.exception;

public class ShowPetNotFoundException extends RuntimeException {
    public ShowPetNotFoundException() {super("해당 반려동물 자랑 글을 찾을 수 없습니다.");}

    public ShowPetNotFoundException(String msg) {super(msg);}

    public ShowPetNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public ShowPetNotFoundException(Throwable cause) {super(cause);}

    protected ShowPetNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
