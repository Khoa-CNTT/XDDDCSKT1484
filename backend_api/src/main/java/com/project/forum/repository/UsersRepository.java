package com.project.forum.repository;

import com.project.forum.dto.responses.user.UserResponse;
import com.project.forum.enity.Users;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

      Optional<Users> findByUsername(String username);

      boolean existsByUsername(String username);

      boolean existsByEmail(String email);

    @Query("SELECT NEW com.project.forum.dto.responses.user.UserResponse(u.id,u.name, u.language, u.gender, u.img, u.email, u.username, r.name, u.status) " +
            "FROM Users u " +
            "LEFT JOIN u.roles r " +
            "WHERE (:username IS NULL OR :username = '' OR u.username LIKE %:username%)")
    Page<UserResponse> getAllUsers(@Param("username") String username, Pageable pageable);

    Optional<Users> findByEmail(String email);


    @Query("SELECT NEW com.project.forum.dto.responses.user.UserResponse(u.id,u.name, u.language, u.gender, u.img, u.email, u.username, r.name, u.status) " +
            "FROM Users u " +
            "LEFT JOIN u.roles r " +
            "WHERE u.username = :username")
    Optional<UserResponse> findUserByUsername(@Param("username") String username);

    @Query("SELECT NEW com.project.forum.dto.responses.user.UserResponse(u.id,u.name, u.language, u.gender, u.img, u.email, u.username, r.name, u.status) " +
            "FROM Users u " +
            "LEFT JOIN u.roles r " +
            "WHERE u.name LIKE %:name%")
    Page<UserResponse> findUserByName(@Param("name") String name, Pageable pageable);
  }