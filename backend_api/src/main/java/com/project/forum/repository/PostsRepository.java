package com.project.forum.repository;

import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.enity.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PostsRepository extends JpaRepository<Posts, String> {

    @Query("SELECT NEW com.project.forum.dto.responses.post.PostResponse(" +
            "p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name, " +
            "(CASE WHEN u.id = :userId THEN true ELSE false END) , FALSE , " +
            "COUNT(DISTINCT l.id) , COUNT(DISTINCT c.id), p.postShow) " +
            "FROM posts p " +
            "LEFT JOIN p.users u " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.likes l " +
            "LEFT JOIN p.postContent pc  " +
            "LEFT JOIN p.postPoll pp " +
            "LEFT JOIN p.language lg " +
            "WHERE (:content IS NULL OR :content = '' " +
            "OR pc.content LIKE %:content% " +
            "OR pc.title LIKE %:content% " +
            "OR pp.question LIKE %:content%) " +
            "AND (:language IS NULL OR :language = '' OR lg.name = :language) " +
            "AND p.postShow = true " +
            "GROUP BY p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name, u.id")
    Page<PostResponse> findAllPosts(@Param("content") String content,
                                    @Param("userId") String userId,
                                    @Param("language") String language,
                                    Pageable pageable);


    @Query("SELECT NEW com.project.forum.dto.responses.post.PostResponse(" +
            "p.id, p.type_post, p.created_at, p.updated_at, u.username, u.img, u.id, lg.name,  " +
            " (CASE WHEN p.users.id = :userId THEN true ELSE false END) , FALSE , COUNT(DISTINCT l.id) , COUNT(DISTINCT c.id), p.postShow) " +
            "FROM posts p " +
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
            "(CASE WHEN p.users.id = :userId THEN true ELSE false END) , FALSE , COUNT(DISTINCT l.id) , COUNT(DISTINCT c.id), p.postShow) " +
            "FROM posts p " +
            "LEFT JOIN p.users u " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.likes l " +
            "LEFT JOIN p.language lg " +
            "WHERE p.id = :id " +
            "GROUP BY p.id, p.type_post, p.created_at, p.updated_at, u.username, p.users.id")
    Optional<PostResponse> findPostById(@Param("id") String id, @Param("userId") String userId);


    @Modifying
    @Query("DELETE FROM posts p WHERE p.id = :id")
    void deletePostById(@Param("id") String id);

}