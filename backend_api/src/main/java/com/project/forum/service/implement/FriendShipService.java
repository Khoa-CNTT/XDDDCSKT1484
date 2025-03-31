package com.project.forum.service.implement;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.forum.dto.requests.friend.CreateRequestFriendDto;
import com.project.forum.dto.responses.friend.FriendRequestResponse;
import com.project.forum.dto.responses.friend.FriendShipResponse;
import com.project.forum.dto.responses.user.UserFriendResponse;
import com.project.forum.enity.FriendShip;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.StatusFriend;
import com.project.forum.enums.TypeNotice;
import com.project.forum.exception.WebException;
import com.project.forum.repository.FriendShipRepository;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.IFriendShipService;
import com.project.forum.service.INoticeService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FriendShipService implements IFriendShipService {

    FriendShipRepository friendShipRepository;

    UsersRepository usersRepository;

    INoticeService iNoticeService;

    @Override
    public FriendRequestResponse sendRequest(CreateRequestFriendDto createRequestFriendDto) throws JsonProcessingException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users userSend = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Users userReceiver = usersRepository.findById(createRequestFriendDto.getReceiver()).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        if (friendShipRepository.existsByReceiver_IdAndSender_IdAndStatus(userReceiver.getId(), userSend.getId(), StatusFriend.FRIENDS.getStatus())) {
            throw new WebException(ErrorCode.E_USERS_ARE_FRIEND);
        }
        FriendShip friendShip = FriendShip.builder()
                .status(StatusFriend.PENDING.getStatus())
                .created_at(LocalDateTime.now())
                .receiver(userReceiver)
                .sender(userSend)
                .build();
        friendShipRepository.save(friendShip);
        String message = userSend.getName() + " Send You A Request Friend !!";
        iNoticeService.sendNotification(userReceiver, TypeNotice.FRIEND.toString(),message, null,userSend.getId());
        return FriendRequestResponse.builder()
                .receiver(userReceiver.getName())
                .sender(userSend.getName())
                .build();
    }

    @Override
    public FriendShipResponse getFriendShip(String userId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username.equals("anonymousUser")) {
            return FriendShipResponse.builder()
                    .status(StatusFriend.NONE.getStatus())
                    .build();
        }
        Users users1 = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Users users2 = usersRepository.findById(userId).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Optional<FriendShip> friendShip = friendShipRepository
                .findByReceiver_IdAndSender_Id(users1.getId(), users2.getId());
        if (!Objects.isNull(friendShip)) {
            FriendShip friendShip2 = friendShipRepository
                    .findByReceiver_IdAndSender_Id(users2.getId(), users1.getId()).orElseThrow(() -> new WebException(ErrorCode.E_REQUEST_NOT_FOUND));
            return FriendShipResponse.builder()
                    .status(friendShip2.getStatus().toString())
                    .createdAt(friendShip2.getCreated_at())
                    .build();
        } else {
            return FriendShipResponse.builder()
                    .status(friendShip.get().getStatus().toString())
                    .createdAt(friendShip.get().getCreated_at())
                    .build();
        }
    }

    @Override
    public boolean acceptFriendRequest(String userId) throws JsonProcessingException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Users users1 = usersRepository.findById(userId).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        FriendShip friendShip = friendShipRepository.findByReceiver_IdAndSender_Id(users.getId(),userId)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        friendShip.setStatus(StatusFriend.FRIENDS.getStatus());
        friendShipRepository.save(friendShip);
        String message = users.getName() + " Accept Your Request Friend !!";
        iNoticeService.sendNotification(users1, TypeNotice.FRIEND.toString(),message, null,users.getId());
        return true;
    }

    @Override
    public boolean rejectFriendRequest(String userId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        FriendShip friendShip = friendShipRepository.findByReceiver_IdAndSender_Id(users.getId(),userId)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        friendShipRepository.delete(friendShip);
        return true;
    }

    @Override
    public Page<UserFriendResponse> getUserListFriend(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page,size);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        return friendShipRepository.getUserFriends(users.getId(),pageable);

    }


}
