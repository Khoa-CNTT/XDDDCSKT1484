package com.project.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    //400 BAD REQUEST
    E_PASSWORD_NOT_MATCH(40001,"PasswordNotMatch",HttpStatus.BAD_REQUEST),
    E_USERNAME_IS_EXISTS(40002,"UsernameIsExists",HttpStatus.BAD_REQUEST),
    E_EMAIL_IS_EXISTS(40003,"EmailIsExists",HttpStatus.BAD_REQUEST),
    E_USER_IS_ACTIVE(40004,"UserIsActive",HttpStatus.BAD_REQUEST),
    E_USERS_ARE_FRIEND(40005,"UsersAreFriend",HttpStatus.BAD_REQUEST),
    E_FILE_TO_LARGE(40006,"FileToLarge",HttpStatus.BAD_REQUEST),
    E_FILE_INVALID(40007,"FileInvalid",HttpStatus.BAD_REQUEST),

    //401 UNAUTHORIZED
    E_UNAUTHORIZED(40101,"Authentication",HttpStatus.UNAUTHORIZED),
    E_WRONG_PASSWORD(40102,"WrongPassword",HttpStatus.UNAUTHORIZED),
    E_TOKEN_EXPIRED(40103,"TokenExpired",HttpStatus.UNAUTHORIZED),
    E_USER_NOT_ACTIVE(40104,"UserNotActive",HttpStatus.UNAUTHORIZED),
    E_TOKEN_INVALID(40105,"TokenInvalid",HttpStatus.UNAUTHORIZED),

    //402 FORBIDDEN
    E_FORBIDDEN(40102,"Forbidden",HttpStatus.FORBIDDEN),

    //404 NOT FOUND
    E_USER_NOT_FOUND(40401,"UserNotFound",HttpStatus.NOT_FOUND),
    E_POST_NOT_FOUND(40402,"PostNotFound",HttpStatus.NOT_FOUND),
    E_POLL_OPTION_NOT_FOUND(40403,"PollOptionNotFound",HttpStatus.NOT_FOUND),
    E_POST_POLL_NOT_FOUND(40404,"PostPollNotFound",HttpStatus.NOT_FOUND),
    E_LANGUAGE_NOT_FOUND(40405,"LanguageNotFound",HttpStatus.NOT_FOUND),
    E_ROLE_NOT_FOUND(40406,"RoleNotFound",HttpStatus.NOT_FOUND),
    E_COMMENT_NOT_FOUND(40407,"CommentNotFound",HttpStatus.NOT_FOUND),
    E_REQUEST_NOT_FOUND(40408,"RequestNotFound",HttpStatus.NOT_FOUND),

    //500 Server
    E_SERVER_ERROR(50001,"ServerError",HttpStatus.INTERNAL_SERVER_ERROR);

;
    private int code;
    private String message;
    private HttpStatus httpStatus;
}
