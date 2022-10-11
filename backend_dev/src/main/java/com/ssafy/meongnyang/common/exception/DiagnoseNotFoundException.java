package com.ssafy.meongnyang.common.exception;

public class DiagnoseNotFoundException extends RuntimeException {
    public DiagnoseNotFoundException() {super("해당 진단 내역을 찾을 수 없습니다.");}

    public DiagnoseNotFoundException(String msg) {super(msg);}

    public DiagnoseNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public DiagnoseNotFoundException(Throwable cause) {super(cause);}

    protected DiagnoseNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
