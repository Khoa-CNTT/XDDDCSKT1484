package com.project.forum.validation;

import jakarta.validation.ConstraintValidatorContext;

public class OptionalRangeValidator implements BaseValidator<OptionalRange, String> {

    private int min;
    private int max;

    @Override
    public void initialize(OptionalRange constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) return true;

        try {
            int number = Integer.parseInt(value);
            if (number < min || number > max) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate(
                        "Value must be between " + min + " and " + max
                ).addConstraintViolation();
                return false;
            }
        } catch (NumberFormatException e) {
            return true;
        }

        return true;
    }
}