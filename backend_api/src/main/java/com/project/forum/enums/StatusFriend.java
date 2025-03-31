package com.project.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusFriend {
    PENDING("pending"),
    PENDING_SENT("pendingSend"),
    PENDING_RECEIVED("pendingReceived"),
    FRIENDS("friends"),
    NONE("none");
    ;

    private String status;
}
