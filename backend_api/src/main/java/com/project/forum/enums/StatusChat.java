package com.project.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusChat {
    BLOCK("block"),
    NONE("none")

    ;
    private String status;
}
