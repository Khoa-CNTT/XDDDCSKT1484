package com.project.forum.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;


@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = OptionalRangeValidator.class)
public @interface OptionalRange {
    String message() default "Invalid number range";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    int min();
    int max();
}
