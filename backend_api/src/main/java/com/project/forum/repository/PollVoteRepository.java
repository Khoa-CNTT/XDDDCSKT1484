package com.project.forum.repository;

import com.project.forum.enity.PollOptions;
import com.project.forum.enity.PollVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PollVoteRepository extends JpaRepository<PollVote, String> {
    @Modifying
    @Query("DELETE FROM PollVote pv " +
            "WHERE pv.users.id = :userId " +
            "AND pv.poll_options.id = :pollOptionId")
    void deleteVote(@Param("userId") String userId, @Param("pollOptionId") String pollOptionId);


    @Query("SELECT CASE WHEN COUNT(pv) > 0 THEN TRUE ELSE FALSE END " +
            "FROM PollVote pv " +
            "WHERE pv.users.id = :userId " +
            "AND pv.poll_options.id = :pollOptionId")
    boolean existsVote(@Param("userId") String userId, @Param("pollOptionId") String pollOptionId);



    @Query("SELECT CASE WHEN COUNT(pv) > 0 THEN true ELSE false END " +
            "FROM PollVote pv " +
            "JOIN pv.poll_options po " +
            "JOIN po.postPoll pp " +
            "WHERE pv.users.id = :userId " +
            "AND po.id = :pollOptionId " +
            "AND pp.id = :postPollId")
    boolean existsByUserIdAndPollOptionIdAndPostPollId(@Param("userId") String userId,
                                                       @Param("pollOptionId") String pollOptionId,
                                                       @Param("postPollId") String postPollId);
    @Modifying
    @Query("DELETE FROM PollVote pv " +
            "WHERE pv.users.id = :userId " +
            "AND pv.poll_options.id = :pollOptionId " +
            "AND pv.poll_options.postPoll.id = :postPollId")
    void deleteVoteByUserIdAndPollOptionIdAndPostPollId(@Param("userId") String userId,
                                                        @Param("pollOptionId") String pollOptionId,
                                                        @Param("postPollId") String postPollId);

    @Query("SELECT pv FROM PollVote pv " +
            "WHERE pv.users.id = :userId " +
            "AND pv.poll_options.id IN :pollOptionIds")
    List<PollVote> findByUserAndPollOptions(@Param("userId") String userId,
                                            @Param("pollOptionIds") List<String> pollOptionIds);


}