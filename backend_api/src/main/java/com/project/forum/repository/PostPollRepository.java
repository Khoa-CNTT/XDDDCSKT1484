package com.project.forum.repository;

import com.project.forum.dto.responses.post.PostPollResponse;
import com.project.forum.enity.PostPoll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostPollRepository extends JpaRepository<PostPoll, String> {


    @Query("SELECT NEW com.project.forum.dto.responses.post.PostPollResponse( " +
            "pp.id, pp.question, p.type_post, pp.typePoll, " +
            "false , " +
            "pp.posts.id, " +
            "(SELECT COUNT(pv) FROM poll_vote pv WHERE pv.poll_options.postPoll.id = pp.id) ) " +
            "FROM post_poll pp " +
            "JOIN pp.posts p " +
            "WHERE pp.posts.id = :postId")
    PostPollResponse getPostPollByPostId(@Param("postId") String postId);



}