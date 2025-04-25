package com.project.forum.repository;

import com.project.forum.dto.responses.friend.FriendRequestListResponse;
import com.project.forum.dto.responses.user.UserFriendResponse;
import com.project.forum.enity.FriendShip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface FriendShipRepository extends JpaRepository<FriendShip, String> {

    boolean existsByReceiver_IdAndSender_IdAndStatus(String receiverId, String senderId,String status);

    Optional<FriendShip> findByReceiver_IdAndSender_Id(String receiverId, String senderId);

    Optional<FriendShip> findBySender_Id(String senderId);

    void deleteByReceiver_IdAndSender_Id(String receiverId, String senderId);

    @Query("""
    SELECT new com.project.forum.dto.responses.user.UserFriendResponse(
        CASE 
            WHEN f.sender.id = :userId THEN f.receiver.id
            ELSE f.sender.id
        END,
        CASE 
            WHEN f.sender.id = :userId THEN f.receiver.name
            ELSE f.sender.name
        END,
        CASE 
            WHEN f.sender.id = :userId THEN f.receiver.language
            ELSE f.sender.language
        END,
        CASE 
            WHEN f.sender.id = :userId THEN f.receiver.gender
            ELSE f.sender.gender
        END,
        CASE 
            WHEN f.sender.id = :userId THEN f.receiver.img
            ELSE f.sender.img
        END,
        CASE 
            WHEN f.sender.id = :userId THEN f.receiver.email
            ELSE f.sender.email
        END,
        CASE 
            WHEN f.sender.id = :userId THEN f.receiver.username
            ELSE f.sender.username
        END,
        (SELECT COUNT(f2) FROM FriendShip f2 
         WHERE (f2.sender.id = :userId OR f2.receiver.id = :userId) 
           AND f2.status = 'friends')
    )
    FROM FriendShip f
    WHERE (f.sender.id = :userId OR f.receiver.id = :userId) 
      AND f.status = 'friends'
""")
    Page<UserFriendResponse> getUserFriends(@Param("userId") String userId, Pageable pageable);


    @Query("SELECT NEW com.project.forum.dto.responses.friend.FriendRequestListResponse( " +
            "s.id, s.name, s.img, s.created) " +
            "FROM FriendShip f " +
            "LEFT JOIN f.sender s " +
            "WHERE f.receiver.id = :userId " +
            "AND f.status = 'pending' ")
    Page<FriendRequestListResponse> getListFriendRequest(@Param("userId") String id,
                                                         Pageable pageable);

}