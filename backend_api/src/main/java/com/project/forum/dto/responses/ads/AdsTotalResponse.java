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
    Long totalAds;           // Tổng số quảng cáo
    Long totalViews;         // Tổng số lượt xem
    Long totalActiveAds;     // Số quảng cáo đang hoạt động
    Long totalLikes;         // Tổng số lượt like
    Long totalComments;      // Tổng số lượt comment
    LocalDateTime startDate; // Ngày bắt đầu
    LocalDateTime endDate;   // Ngày kết thúc
}