package com.project.forum.validation;

import com.project.forum.enums.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.annotation.Annotation;

public interface BaseValidator <A extends Annotation, T> extends ConstraintValidator<A, T> {
    default void reject(ConstraintValidatorContext context, ErrorCode errorCode) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(errorCode.getMessage())
                .addConstraintViolation();
    }
}
