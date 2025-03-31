package com.project.forum.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.responses.notices.NoticeResponse;
import com.project.forum.enity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface INoticeService {
    void sendNotification(Users users, String type, String message, String postId, String userId) throws JsonProcessingException;

    Page<NoticeResponse> getNotices(Pageable pageable);

    Integer getNumberNoRead();

    boolean readNotices();
}
