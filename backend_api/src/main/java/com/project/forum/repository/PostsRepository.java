package com.project.forum.repository;

import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.dto.responses.post.PostTotalResponse;
import com.project.forum.enity.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;


@Repository
public interface PostsRepository extends JpaRepository<Posts, String> {

    @Query("SELECT NEW com.project.forum.dto.responses.post.PostResponse(" +
            "p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name, " +
            "(CASE WHEN u.id = :userId THEN true ELSE false END) , FALSE , " +
            "COUNT(DISTINCT l.id) , COUNT(DISTINCT c.id), p.postShow," +
            "(CASE WHEN EXISTS (SELECT ad FROM Advertisement ad WHERE ad.posts.id = p.id AND ad.status = TRUE) THEN true ELSE false END)" +
            ") " +
            "FROM Posts p " +
            "LEFT JOIN p.users u " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.likes l " +
            "LEFT JOIN p.postContent pc  " +
            "LEFT JOIN p.postPoll pp " +
            "LEFT JOIN p.language lg " +
            "LEFT JOIN p.advertisements ads " +
            "WHERE (:content IS NULL OR :content = '' " +
            "OR pc.content LIKE %:content% " +
            "OR pc.title LIKE %:content% " +
            "OR pp.question LIKE %:content%) " +
            "AND (:language IS NULL OR :language = '' OR lg.name = :language) " +
            "AND p.postShow = true " +
            "AND NOT EXISTS (SELECT ad FROM Advertisement ad WHERE ad.posts.id = p.id AND ad.status = TRUE)" +
            "GROUP BY p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name, u.id " +
            "ORDER BY FUNCTION('RAND')")
    Page<PostResponse> findAllPosts(@Param("content") String content,
                                    @Param("userId") String userId,
                                    @Param("language") String language,
                                    Pageable pageable);


    @Query("SELECT NEW com.project.forum.dto.responses.post.PostResponse(" +
            "p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name,  " +
            " (CASE WHEN p.users.id = :userId THEN true ELSE false END) , FALSE , COUNT(DISTINCT l.id) , COUNT(DISTINCT c.id), p.postShow, " +
            "(CASE WHEN EXISTS (SELECT ad FROM Advertisement ad WHERE ad.posts.id = p.id AND ad.status = TRUE) THEN true ELSE false END)" +
            ") " +
            "FROM Posts p " +
            "LEFT JOIN p.users u " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.likes l " +
            "LEFT JOIN p.postContent pc  " +
            "LEFT JOIN p.postPoll pp " +
            "LEFT JOIN p.language lg " +
            "WHERE p.users.id = :userId " +
            "GROUP BY p.id, p.type_post, p.created_at, p.updated_at, u.username, p.users.id")
    Page<PostResponse> userPost(@Param("userId") String userId,
                                    Pageable pageable);


    @Query("SELECT NEW com.project.forum.dto.responses.post.PostResponse( " +
            "p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name,  " +
            "(CASE WHEN p.users.id = :userId THEN true ELSE false END), " +
            "FALSE, " +
            "COUNT(DISTINCT l.id), " +
            "COUNT(DISTINCT c.id), " +
            "p.postShow, " +
            "(CASE WHEN EXISTS (SELECT ad FROM Advertisement ad WHERE ad.posts.id = p.id AND ad.status = TRUE) THEN true ELSE false END)" +
            ") " +
            "FROM Posts p " +
            "LEFT JOIN p.users u " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.likes l " +
            "LEFT JOIN p.language lg " +
            "WHERE p.id = :id AND (p.postShow = true OR (p.postShow = false AND p.users.id = :userId)) " +
            "GROUP BY p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name, p.users.id, p.postShow")
    Optional<PostResponse> findPostById(@Param("id") String id, @Param("userId") String userId);



    @Modifying
    @Query("DELETE FROM Posts p WHERE p.id = :id")
    void deletePostById(@Param("id") String id);



    @Query("SELECT NEW com.project.forum.dto.responses.post.PostResponse(" +
            "p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name, " +
            "(CASE WHEN u.id = :userId THEN true ELSE false END) , FALSE , " +
            "COUNT(DISTINCT l.id) , COUNT(DISTINCT c.id), p.postShow," +
            "(CASE WHEN EXISTS (SELECT ad FROM Advertisement ad WHERE ad.posts.id = p.id AND ad.status = TRUE) THEN true ELSE false END)" +
            ") " +
            "FROM Posts p " +
            "LEFT JOIN p.users u " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.likes l " +
            "LEFT JOIN p.postContent pc  " +
            "LEFT JOIN p.postPoll pp " +
            "LEFT JOIN p.language lg " +
            "LEFT JOIN p.advertisements ads " +
            "WHERE (:content IS NULL OR :content = '' " +
            "OR pc.content LIKE %:content% " +
            "OR pc.title LIKE %:content% " +
            "OR pp.question LIKE %:content%) " +
            "AND (:language IS NULL OR :language = '' OR lg.name = :language) " +
            "GROUP BY p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name, u.id " +
            "ORDER BY FUNCTION('RAND')")
    Page<PostResponse> findAllPostsAdmin(@Param("content") String content,
                                    @Param("userId") String userId,
                                    @Param("language") String language,
                                    Pageable pageable);

    @Query("SELECT new com.project.forum.dto.responses.post.PostTotalResponse(" +
            "COUNT(DISTINCT p.id), " +
            "COUNT(DISTINCT c.id), " +
            "COUNT(DISTINCT l.id), " +
            "(SELECT COUNT(DISTINCT u2.id) FROM Users u2 WHERE (:from IS NULL OR u2.created >= :from) AND (:to IS NULL OR u2.created <= :to)), " +
            "CASE WHEN :from IS NULL THEN (SELECT MIN(u3.created) FROM Users u3) ELSE :from END, " +
            "CASE WHEN :to IS NULL THEN CAST(CURRENT_TIMESTAMP as java.time.LocalDateTime) ELSE :to END) " +
            "FROM Posts p " +
            "LEFT JOIN p.users u " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.likes l " +
            "WHERE (:from IS NULL OR p.created_at >= :from ) " +
            "AND p.postShow = true " +
            "AND (:to IS NULL OR p.created_at <= :to)")
    PostTotalResponse getPostStats(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);


}