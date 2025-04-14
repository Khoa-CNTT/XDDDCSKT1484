package com.project.forum.service.implement;

import com.project.forum.dto.requests.user.CreateUserDto;
import com.project.forum.dto.requests.user.UpdateUserDto;
import com.project.forum.dto.responses.user.UserResponse;
import com.project.forum.enity.Roles;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.RolesCode;
import com.project.forum.enums.StatusUser;
import com.project.forum.exception.WebException;
import com.project.forum.mapper.UserMapper;
import com.project.forum.repository.RolesRepository;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.IUserService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService implements IUserService {


    UsersRepository usersRepository;

    RolesRepository rolesRepository;

    UserMapper userMapper;

    PasswordEncoder passwordEncoder;

    @Override
    public UserResponse create(CreateUserDto createUserDto) {
        if (!createUserDto.getPassword().equals(createUserDto.getRe_password())) {
            throw new WebException(ErrorCode.E_PASSWORD_NOT_MATCH);
        }
        if (usersRepository.existsByUsername(createUserDto.getUsername())) {
            throw new WebException(ErrorCode.E_USERNAME_IS_EXISTS);
        }
        if (usersRepository.existsByEmail(createUserDto.getEmail())) {
            throw new WebException(ErrorCode.E_EMAIL_IS_EXISTS);
        }
        Users users = userMapper.toUsers(createUserDto);
        users.setStatus(StatusUser.INACTIVE.toString());
        users.setPassword(passwordEncoder.encode(createUserDto.getPassword()));
        Roles roles = rolesRepository.findByName(RolesCode.USER.toString()).orElseThrow(() -> new WebException(ErrorCode.E_ROLE_NOT_FOUND));
        users.setRoles(Collections.singleton(roles));

        return userMapper.toUserResponse(usersRepository.save(users));
    }

    @Override
    public UserResponse setStatus(String id, StatusUser statusUser) {
        Users users = usersRepository.findById(id).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        users.setStatus(statusUser.getActive());
        usersRepository.save(users);
        return userMapper.toUserResponse(users);
    }

    @Override
    public UserResponse update(UpdateUserDto updateUserDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        userMapper.toUpdate(users,updateUserDto);

        return userMapper.toUserResponse(usersRepository.save(users));
    }

    @Override
    public Page<UserResponse> getAllUsers(Integer page, Integer size) {
        Pageable pageable =  PageRequest.of(page,size);
        Page<UserResponse> userResponsePage = usersRepository.getAllUsers(pageable);
        return userResponsePage;
    }

    @Override
    public UserResponse getUserById(String id) {
        Users users = usersRepository.findById(id).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        return userMapper.toUserResponse(users);
    }

    @Override
    public UserResponse getMyInfo() {
        Users users = usersRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        UserResponse userResponse = userMapper.toUserResponse(users);
        Set<String> roleNames = users.getRoles()
                .stream()
                .map(Roles::getName)
                .collect(Collectors.toSet());
        userResponse.setRoles(roleNames.toString());
        return userResponse;
    }

    @Override
    public Page<UserResponse> getUserByName(String name, Integer page, Integer size) {
//        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND) );
//        UserResponse userResponse = usersRepository.findUserByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Pageable pageable =  PageRequest.of(page,size);
        Page<UserResponse> userResponseList = usersRepository.findUserByName(name, pageable);
//        UserResponse userResponse = userMapper.toUserResponse(users);
//        Set<String> roleNames = users.getRoles()
//                .stream()
//                .map(Roles::getName)
//                .collect(Collectors.toSet());
//        userResponse.setRoles(roleNames.toString());
        return userResponseList;
    }


}
