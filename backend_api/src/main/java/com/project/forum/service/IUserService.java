package com.project.forum.service;

import com.project.forum.dto.requests.user.CreateUserDto;
import com.project.forum.dto.requests.user.UpdateUserDto;
import com.project.forum.dto.responses.user.UserResponse;
import com.project.forum.enums.StatusUser;
import org.springframework.data.domain.Page;

public interface IUserService {

        UserResponse create(CreateUserDto createUserDto);

        UserResponse setStatus(String id, StatusUser statusUser);

        UserResponse update(UpdateUserDto updateUserDto);

        Page<UserResponse> getAllUsers(String username,Integer page, Integer size);

        UserResponse getUserById(String id);

        UserResponse getMyInfo();

        Page<UserResponse> getUserByName(String name, Integer page, Integer size);
}
