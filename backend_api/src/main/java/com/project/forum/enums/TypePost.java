package com.project.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TypePost {
    POLL("poll"),
    CONTENT("content"),

    ;

    private String post;
}
