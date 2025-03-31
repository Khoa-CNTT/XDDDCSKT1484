package com.project.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LanguageCode {
    ENGLISH("English"),
    JAPAN("Japan"),
    CHINA("China"),
    ;
    private String name;
}
