package com.project.forum.repository;

import com.project.forum.dto.responses.post.PostContentHistoryResponse;
import com.project.forum.enity.PostContentHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostContentHistoryRepository extends JpaRepository<PostContentHistory, String> {

    @Query("SELECT NEW com.project.forum.dto.responses.post.PostContentHistoryResponse( " +
            "pc.title, pc.content, pc.created_at ) " +
            "FROM PostContentHistory pc " +
            "WHERE pc.posts.id = :postId")
    Page<PostContentHistoryResponse> findByPosts_Id(@Param("postId") String postId, Pageable pageable);


}