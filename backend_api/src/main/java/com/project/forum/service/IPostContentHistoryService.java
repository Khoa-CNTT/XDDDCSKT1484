package com.project.forum.service;

import com.project.forum.dto.responses.post.PostContentHistoryResponse;
import com.project.forum.enity.PostContentHistory;
import com.project.forum.repository.PostContentHistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPostContentHistoryService {

    Page<PostContentHistoryResponse> getByPostId(String postId, Integer pageNo, Integer pageSize);
}
