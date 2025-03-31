package com.project.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusAds {
    COMPLETE("complete"),
    PAUSED("paused"),
    CANCELLED("cancelled"),
    PROGRESSED("progressed"),
    ;
    private String status;
}
