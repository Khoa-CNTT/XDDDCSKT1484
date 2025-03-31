package com.project.forum.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.friend.CreateRequestFriendDto;
import com.project.forum.dto.responses.friend.FriendRequestResponse;
import com.project.forum.dto.responses.friend.FriendShipResponse;
import com.project.forum.dto.responses.user.UserFriendResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IFriendShipService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/friend-ship")
@Tag(name = "11. Friend Ship")
public class FriendShipController {

    private final IFriendShipService friendRequestService;
    @SecurityRequirement(name = "BearerAuth")
    @PostMapping()
    public ResponseEntity<ApiResponse<FriendRequestResponse>> sendRequest(@RequestBody CreateRequestFriendDto createRequestFriendDto) throws JsonProcessingException {
        return ResponseEntity.ok(ApiResponse.<FriendRequestResponse>builder()
                .data(friendRequestService.sendRequest(createRequestFriendDto))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/friendship/{userId}")
    public ResponseEntity<ApiResponse<FriendShipResponse>> getFriendShip(@PathVariable String userId) {
        return ResponseEntity.ok(ApiResponse.<FriendShipResponse>builder()
                .data(friendRequestService.getFriendShip(userId))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @PostMapping("/accept/{userId}")
    public ResponseEntity<ApiResponse<Boolean>> acceptFriendRequest(@PathVariable String userId) throws JsonProcessingException {
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
                .data(friendRequestService.acceptFriendRequest(userId))
                .build());
    }
    @SecurityRequirement(name = "BearerAuth")
    @PostMapping("/reject/{userId}")
    public ResponseEntity<ApiResponse<Boolean>> rejectFriendRequest(@PathVariable String userId) {
        return ResponseEntity.ok(ApiResponse.<Boolean>builder()
                .data(friendRequestService.rejectFriendRequest(userId))
                .build());
    }

    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/friendship")
    public ResponseEntity<ApiResponse<Page<UserFriendResponse>>> getFriendShip(@RequestParam(defaultValue = "0") Integer page,
                                                                               @RequestParam(defaultValue = "10") Integer size) {
        return ResponseEntity.ok(ApiResponse.<Page<UserFriendResponse>>builder()
                        .data(friendRequestService.getUserListFriend(page,size))
                .build());
    }
}