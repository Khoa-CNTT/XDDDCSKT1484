package com.project.forum.service.implement;

import com.project.forum.dto.requests.vote.CreateVoteMultipleDto;
import com.project.forum.dto.responses.vote.PollVoteResponse;
import com.project.forum.enity.*;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.TypePoll;
import com.project.forum.exception.WebException;
import com.project.forum.repository.*;
import com.project.forum.service.IVoteService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VoteService implements IVoteService {
    PollVoteRepository pollVoteRepository;

    PostPollRepository postPollRepository;

    PollOptionsRepository pollOptionsRepository;

    PostsRepository postsRepository;

    UsersRepository usersRepository;

    @Override
    @Transactional
    public PollVoteResponse voteOption(String pollOptionId) {
        PollOptions pollOptions = pollOptionsRepository.findById(pollOptionId).orElseThrow(() -> new WebException(ErrorCode.E_POLL_OPTION_NOT_FOUND));
        PostPoll postPoll = postPollRepository.findById(pollOptions.getPostPoll().getId()).orElseThrow(() -> new WebException(ErrorCode.E_POST_POLL_NOT_FOUND));
//        Posts posts = postsRepository.findById(postPoll.getPosts().getId()).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        if (pollVoteRepository.existsVote(users.getId(), pollOptions.getId())){
            pollVoteRepository.deleteVote(users.getId(), pollOptions.getId());
            return PollVoteResponse.builder()
                    .voted(false)
                    .message("UnVote successful")
                    .build();
        }
        if (postPoll.getTypePoll().equals(TypePoll.Single)){
            if (pollVoteRepository.existsByUserIdAndPollOptionIdAndPostPollId(users.getId(),pollOptions.getId(), postPoll.getId())){
                pollVoteRepository.deleteVoteByUserIdAndPollOptionIdAndPostPollId(users.getId(),pollOptions.getId(), postPoll.getId());
            }
            PollVote newPollOptions = PollVote.builder()
                    .poll_options(pollOptions)
                    .users(users)
                    .created_at(LocalDateTime.now())
                    .build();
            pollVoteRepository.save(newPollOptions);

            return PollVoteResponse.builder()
                    .voted(true)
                    .message("Vote successful")
                    .build();
        } else {
            PollVote newPollOptions = PollVote.builder()
                    .poll_options(pollOptions)
                    .created_at(LocalDateTime.now())
                    .users(users)
                    .build();
            pollVoteRepository.save(newPollOptions);

            return PollVoteResponse.builder()
                    .voted(true)
                    .message("Vote successful")
                    .build();
        }


    }

    @Override
    @Transactional
    public PollVoteResponse voteOptionMultiple(CreateVoteMultipleDto createVoteMultipleDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));

        List<PollVote> existingVotes = pollVoteRepository.findByUserAndPollOptions(users.getId(), createVoteMultipleDto.getPollOptionId());
        Set<String> existingVoteIds = existingVotes.stream()
                .map(v -> v.getPoll_options().getId())
                .collect(Collectors.toSet());
        Set<String> newVoteIds = new HashSet<>(createVoteMultipleDto.getPollOptionId());

        existingVotes.stream()
                .filter(vote -> !newVoteIds.contains(vote.getPoll_options().getId()))
                .forEach(pollVoteRepository::delete);

        for (String pollOptionId : newVoteIds) {
            if (!existingVoteIds.contains(pollOptionId)) {
                PollOptions pollOptions = pollOptionsRepository.findById(pollOptionId)
                        .orElseThrow(() -> new WebException(ErrorCode.E_POLL_OPTION_NOT_FOUND));
                PollVote newPollVote = PollVote.builder()
                        .poll_options(pollOptions)
                        .created_at(LocalDateTime.now())
                        .users(users)
                        .build();
                pollVoteRepository.save(newPollVote);
            }
        }

        return PollVoteResponse.builder()
                .voted(true)
                .message("Vote updated successfully")
                .build();
    }

}
