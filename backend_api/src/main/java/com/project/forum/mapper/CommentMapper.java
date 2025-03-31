package com.project.forum.mapper;

import com.project.forum.dto.responses.comment.CommentResponse;
import com.project.forum.enity.Comments;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "user_name", source = "users.name")
    @Mapping(target = "user_img", source = "users.img")
    @Mapping(target = "is_user", ignore = true)
    @Mapping(target = "is_reply", ignore = true)
    CommentResponse toCommentResponse(Comments comments);
}
