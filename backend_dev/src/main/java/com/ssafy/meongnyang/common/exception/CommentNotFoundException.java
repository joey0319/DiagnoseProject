package com.ssafy.meongnyang.common.exception;

public class CommentNotFoundException extends RuntimeException {
    public CommentNotFoundException() {super("해당 댓글을 찾을 수 없습니다.");}

    public CommentNotFoundException(String msg) {super(msg);}

    public CommentNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public CommentNotFoundException(Throwable cause) {super(cause);}

    protected CommentNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
