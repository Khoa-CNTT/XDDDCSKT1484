package com.project.forum.repository;

import com.project.forum.dto.responses.comment.CommentResponse;
import com.project.forum.enity.CommentReply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentReplyRepository extends JpaRepository<CommentReply, String> {


    @Query("SELECT new com.project.forum.dto.responses.comment.CommentResponse(" +
            "cr.id, cr.content, cr.created_at, cr.users.img, cr.users.name, FALSE, " +
            "CASE WHEN cr.users.id = :userId THEN true ELSE false END ) " +
            "FROM comment_reply cr WHERE cr.comments.id = :commentId ORDER BY cr.created_at ASC")
    Page<CommentResponse> findCommentReplyByCommentIdAndUserId(
            @Param("commentId") String commentId,
            @Param("userId") String userId,
            Pageable pageable
    );



}