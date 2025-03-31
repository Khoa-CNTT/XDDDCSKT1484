package com.project.forum.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.like.CreateLikeDto;
import com.project.forum.dto.responses.like.LikeResponse;

public interface ILikeService {

    LikeResponse actionLike(CreateLikeDto createLikeDto) throws JsonProcessingException;

}
