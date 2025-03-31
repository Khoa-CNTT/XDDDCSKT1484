package com.project.forum.dto.responses.post;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.enums.TypePost;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostPollResponse {
    String id;
    String question;
    List<PollOptionResponse> pollOptions;
    String typePost;
    String typePoll;
    String postId;
    Boolean isVoted;
    Long countVote;


    public PostPollResponse(String id, String question, String typePost, String typePoll,Boolean isVoted,String postId, Long countVote) {
        this.id = id;
        this.question = question;
        this.pollOptions = new ArrayList<>();
        this.typePost = typePost;
        this.isVoted = isVoted;
        this.postId = postId;
        this.typePoll = typePoll;
        this.countVote = countVote;
    }
}

