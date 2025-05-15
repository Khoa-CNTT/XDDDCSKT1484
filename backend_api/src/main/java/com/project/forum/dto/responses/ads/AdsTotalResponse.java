package com.project.forum.dto.responses.ads;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdsTotalResponse {
    Long totalAds;           
    Long totalViews;         
    Long totalActiveAds;     
    Long totalLikes;         
    Long totalComments;      
    LocalDateTime startDate;
    LocalDateTime endDate;  
}