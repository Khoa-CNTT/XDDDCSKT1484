package com.project.forum.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.friend.CreateRequestFriendDto;
import com.project.forum.dto.responses.friend.FriendRequestResponse;
import com.project.forum.dto.responses.friend.FriendShipResponse;
import com.project.forum.dto.responses.user.UserFriendResponse;
import org.springframework.data.domain.Page;

public interface IFriendShipService {

    FriendRequestResponse sendRequest(CreateRequestFriendDto createRequestFriendDto) throws JsonProcessingException;

   FriendShipResponse getFriendShip(String userId);

   boolean acceptFriendRequest(String userId) throws JsonProcessingException;

   boolean rejectFriendRequest(String userId);

    Page<UserFriendResponse> getUserListFriend(Integer page, Integer size);
}
