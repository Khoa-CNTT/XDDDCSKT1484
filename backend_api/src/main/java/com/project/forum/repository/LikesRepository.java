package com.project.forum.repository;

import com.project.forum.enity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes, String> {

    boolean existsByPosts_IdAndUsers_Id(String posts_Id, String users_Id);

    void deleteByPosts_IdAndUsers_Id(String posts_Id, String users_Id);
}