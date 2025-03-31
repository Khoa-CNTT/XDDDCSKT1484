package com.project.forum.repository;

import com.project.forum.dto.responses.notices.NoticeResponse;
import com.project.forum.enity.Notices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticesRepository extends JpaRepository<Notices, String> {

    @Query("SELECT CASE WHEN COUNT(n) > 0 THEN TRUE ELSE FALSE END " +
            "FROM notices n WHERE n.type = :type AND n.post_id = :postId AND n.users.id = :userId")
    boolean existsNoticesByTypeAndPost_idAndUser_id(
            @Param("type") String type,
            @Param("postId") String postId,
            @Param("userId") String userId
    );

    @Query("SELECT COUNT(n) FROM notices n WHERE n.type = :type AND n.post_id = :postId")
    int countNoticesByTypeAndPost_id(@Param("type") String type, @Param("postId") String postId);

    @Modifying
    @Query("DELETE FROM notices n WHERE n.type = :type AND n.post_id = :postId AND n.users.id = :userId")
    void deleteNoticesByTypeAndPost_idAndUser_id(
            @Param("type") String type,
            @Param("postId") String postId,
            @Param("userId") String userId
    );
    @Modifying
    @Query("UPDATE notices n SET n.message = :message, n.created_at = CURRENT_TIMESTAMP " +
            "WHERE n.type = :type AND n.post_id = :postId AND n.users.id = :userId ")
    void updateNoticeMessage(
            @Param("type") String type,
            @Param("postId") String postId,
            @Param("userId") String userId,
            @Param("message") String message
    );


    @Query("SELECT new com.project.forum.dto.responses.notices.NoticeResponse(" +
            "n.message, n.created_at, n.status, n.post_id, n.type) " +
            "FROM notices n WHERE n.users.id = :userId ORDER BY n.created_at DESC")
    Page<NoticeResponse> getAllNoticesByUserId(
            @Param("userId") String userId,
            Pageable pageable
    );

    Integer countNoticesByStatusAndUsers_Id(boolean status, String user_id);


    @Modifying
    @Query("UPDATE notices n SET n.status = true WHERE n.users.id = :userId")
    void updateNoticesStatusByUserId(@Param("userId") String userId);


}
