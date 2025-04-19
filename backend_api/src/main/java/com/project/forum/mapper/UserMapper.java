package com.project.forum.mapper;

import com.project.forum.dto.requests.user.CreateUserDto;
import com.project.forum.dto.requests.user.UpdateUserDto;
import com.project.forum.dto.responses.user.UserResponse;
import com.project.forum.enity.Users;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    Users toUsers(CreateUserDto createUserDto);
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "name", source = "name")
    UserResponse toUserResponse(Users users);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Users toUpdate(@MappingTarget Users users, UpdateUserDto updateUserDto);
}
