package com.project.forum.service.implement;

import com.project.forum.dto.responses.post.PostContentHistoryResponse;
import com.project.forum.repository.PostContentHistoryRepository;
import com.project.forum.service.IPostContentHistoryService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostContentHistoryService implements IPostContentHistoryService {

    PostContentHistoryRepository postContentHistoryRepository;


    @Override
    public Page<PostContentHistoryResponse> getByPostId(String postId, Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<PostContentHistoryResponse> postContentHistoryResponse = postContentHistoryRepository.findByPosts_Id(postId,pageable);
        return postContentHistoryResponse;
    }
}
