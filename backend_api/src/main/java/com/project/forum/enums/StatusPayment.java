package com.project.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusPayment {
    PENDING("pending"),
    APPROVED("approved"),
    REJECTED("rejected"),
    CANCELLED("cancelled"),
    COMPLETED("completed"),
    FAILED("failed"),
    WAITING("waiting"),
    ON_HOLD("on_hold"),
    UNKNOWN("unknown"),
    ;
    private String status;

}
