package com.project.forum.repository;

import com.project.forum.dto.responses.user.UserResponse;
import com.project.forum.enity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

      Optional<Users> findByUsername(String username);

      boolean existsByUsername(String username);

      boolean existsByEmail(String email);

    @Query("SELECT NEW com.project.forum.dto.responses.user.UserResponse(u.id,u.name, u.language, u.gender, u.img, u.email, u.username, r.name) " +
            "FROM users u " +
            "LEFT JOIN u.roles r")
    Page<UserResponse> getAllUsers(Pageable pageable);

    Optional<Users> findByEmail(String email);


  }