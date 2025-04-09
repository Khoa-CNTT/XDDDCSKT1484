package com.project.forum.service.implement;

import com.project.forum.dto.requests.post.CreateOptionDto;
import com.project.forum.dto.requests.post.CreatePollOptionDto;
import com.project.forum.dto.requests.post.CreatePostPollDto;
import com.project.forum.dto.responses.post.PollOptionResponse;
import com.project.forum.dto.responses.post.PostPollResponse;
import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.enity.*;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.TypeNotice;
import com.project.forum.enums.TypePost;
import com.project.forum.exception.WebException;
import com.project.forum.mapper.PostMapper;
import com.project.forum.repository.*;
import com.project.forum.service.IAIService;
import com.project.forum.service.INoticeService;
import com.project.forum.service.IPostPollService;
import com.project.forum.service.IPromotionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cloudinary.json.JSONObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostPollService implements IPostPollService {

    PostPollRepository postPollRepository;

    PostsRepository postsRepository;

    PollOptionsRepository pollOptionsRepository;

    UsersRepository usersRepository;

    LanguageRepository languageRepository;

    PostMapper postMapper;

    IPromotionService promotionService;

    IAIService iaiService;

    PostReportsRepository postReportsRepository;


    INoticeService noticeService;

    @Override
    public PostPollResponse findPostPollByPostId(String postId) {
        PostPollResponse postPoll = postPollRepository.getPostPollByPostId(postId);
        if (postPoll == null) {
            return null;
        }
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<PollOptionResponse> pollOptions = new ArrayList<>();
        if (username.equals("anonymousUser")){
           pollOptions = pollOptionsRepository.getPollOptionsWithVotes(postPoll.getId(), null);
        } else  {
            Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
            pollOptions = pollOptionsRepository.getPollOptionsWithVotes(postPoll.getId(), users.getId());
        }
        pollOptions = pollOptions.stream()
                .sorted(Comparator.comparing(PollOptionResponse::getCreated_at))
                .toList();
        boolean isVoted = pollOptions.stream().anyMatch(PollOptionResponse::getIsSelected);
        postPoll.setPollOptions(pollOptions);
        postPoll.setIsVoted(isVoted);
        return postPoll;
    }

    @Override
    public PostResponse create(CreatePostPollDto createPostPollDto) throws IOException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));

        Language language = languageRepository.findByName(createPostPollDto.getLanguage())
                .orElseThrow(() -> new WebException(ErrorCode.E_LANGUAGE_NOT_FOUND));
        Posts posts = Posts.builder()
                .users(users)
                .type_post(TypePost.POLL.toString())
                .language(language)
                .postShow(true)
                .created_at(LocalDateTime.now())
                .build();
        posts = postsRepository.saveAndFlush(posts);

        PostPoll postPoll = PostPoll.builder()
                .posts(posts)
                .typePoll(createPostPollDto.getTypePoll().toString())
                .question(createPostPollDto.getQuestion())
                .pollOptions(new ArrayList<>())
                .build();
        postPoll = postPollRepository.saveAndFlush(postPoll);

        List<PollOptions> pollOptions = new ArrayList<>();
        for (int i = 0; i < createPostPollDto.getCreateOptionDtoList().size();i++){
            PollOptions pollOption = creatPollOption(createPostPollDto.getCreateOptionDtoList().get(i).getOption_text(), postPoll);
            pollOptions.add(pollOption);
        }

        postPoll.setPollOptions(pollOptions);
        String pollOptionString = "";
        for (int i = 0; i < postPoll.getPollOptions().size(); i++){
            pollOptionString = pollOptionString + postPoll.getPollOptions().get(i).getOption_text() + ",";
        }
        String promotion = promotionService.generatePromotionPostMessage(posts.getLanguage().getName(),
                postPoll.getQuestion()+ " " + pollOptionString,"post_poll_template.txt");
        String aiResponse = iaiService.getAnswer(promotion);
        JSONObject jsonObject = new JSONObject(aiResponse);
        boolean result = jsonObject.getBoolean("result");
        if (!result) {
            String message = jsonObject.getString("message");
            posts.setPostShow(false);
            PostReports postReports = PostReports.builder()
                    .reason(message)
                    .type_reports(TypePost.CONTENT.getPost())
                    .posts(posts)
                    .createdAt(LocalDateTime.now())
                    .build();
            postReportsRepository.save(postReports);
            noticeService.sendNotification(users, TypeNotice.POST.toString(), message, posts.getId(), null);
        } else {
            posts.setPostShow(true);
        }
        postsRepository.save(posts);
        postPollRepository.save(postPoll);

        PostResponse response = postMapper.toPostsResponse(posts);
        response.setUser_post(true);
        return response;

    }

    PollOptions creatPollOption(String option_text, PostPoll postPoll) {
        PollOptions pollOptions = PollOptions.builder()
                .postPoll(postPoll)
                .option_text(option_text)
                .created_at(LocalDateTime.now())
                .build();
        return  pollOptionsRepository.save(pollOptions);
    }
}
