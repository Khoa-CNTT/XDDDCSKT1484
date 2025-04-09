package com.project.forum.dto.responses.ads;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enity.AdsPackage;
import com.project.forum.enity.Posts;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdsResponse {

    String id;

    int views;

    boolean status;

    LocalDateTime created_at;

    String post_id;

    String adsPackage_id;


}
