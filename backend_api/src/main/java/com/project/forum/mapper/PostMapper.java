package com.project.forum.mapper;

import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.dto.responses.user.UserResponse;
import com.project.forum.enity.Posts;
import com.project.forum.enity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {


    @Mapping(target = "isShow",source = "postShow")
    @Mapping(target = "language",source = "language.name")
    PostResponse toPostsResponse(Posts posts);
}
