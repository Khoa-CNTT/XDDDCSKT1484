package com.project.forum.dto.requests.user;

import com.project.forum.enums.StatusUser;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class StatusRequest {
    StatusUser statusUser;
}
