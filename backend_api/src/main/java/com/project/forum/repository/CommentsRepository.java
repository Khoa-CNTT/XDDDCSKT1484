package com.project.forum.repository;

import com.project.forum.dto.responses.comment.CommentResponse;
import com.project.forum.enity.Comments;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, String> {

    @Query("SELECT new com.project.forum.dto.responses.comment.CommentResponse(" +
            "c.id, c.content, c.created_at, c.users.img, c.users.name, " +
            "CASE WHEN c.users.id = :userId THEN true ELSE false END, " +
            "CASE WHEN EXISTS (SELECT 1 FROM comment_reply cr WHERE cr.comments.id = c.id) THEN TRUE ELSE FALSE END ) " +
            "FROM comments c WHERE c.posts.id = :postId ORDER BY c.created_at ASC")
    Page<CommentResponse> findCommentByPostIdAndUserId(
            @Param("postId") String postId,
            @Param("userId") String userId,
            Pageable pageable
    );


}
