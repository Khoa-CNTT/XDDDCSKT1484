package com.project.forum.service;

import com.project.forum.dto.requests.vote.CreateVoteMultipleDto;
import com.project.forum.dto.responses.vote.PollVoteResponse;

public interface IVoteService {

    PollVoteResponse voteOption(String pollOptionId);

    PollVoteResponse voteOptionMultiple(CreateVoteMultipleDto createVoteMultipleDto);
}
