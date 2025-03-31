package com.project.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusUser {
    ACTIVE("active"),
    INACTIVE("inactive"),
    LOCKED("locked");

    private String active;
}
