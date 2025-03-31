package com.project.forum.service.implement;

import com.project.forum.dto.responses.post.PostResponse;
import com.project.forum.enity.Comments;
import com.project.forum.enity.Posts;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.RolesCode;
import com.project.forum.exception.WebException;
import com.project.forum.repository.*;
import com.project.forum.service.IPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostService implements IPostService {

    PostsRepository postsRepository;

    PostPollRepository postPollRepository;

    PostContentRepository postContentRepository;

    UsersRepository usersRepository;

    LikesRepository likesRepository;

    @Override
    public Page<PostResponse> findAllPost(Integer page, Integer size, String content, String language) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Pageable pageable = PageRequest.of(page, size);
        if (username.equals("anonymousUser")) {
            Page<PostResponse> postPageResponseList = postsRepository.findAllPosts(content, null, language, pageable);
            return postPageResponseList;
        }
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Page<PostResponse> postPageResponseList = postsRepository.findAllPosts(content, users.getId(), language, pageable);
        for (PostResponse post : postPageResponseList) {
            if (likesRepository.existsByPosts_IdAndUsers_Id(post.getId(), users.getId())) {
                post.setUser_like(true);
            }
        }
        return postPageResponseList;
    }

    @Override
    public PostResponse findPostById(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username.equals("anonymousUser")) {
            return postsRepository.findPostById(id, null).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
        }
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        PostResponse postResponse = postsRepository.findPostById(id, users.getId().toString()).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
        if (likesRepository.existsByPosts_IdAndUsers_Id(postResponse.getId(), users.getId())) {
            postResponse.setUser_like(true);

        }
        return postResponse;
    }

    @Override
    public boolean deletePostById(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Posts posts = postsRepository.findById(id).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
        if (posts.getUsers().getId().equals(users.getId()) || users.getRoles().equals(RolesCode.ADMIN) || users.getRoles().equals(RolesCode.EMPLOYEE)) {
            postsRepository.delete(posts);
            return true;
        } else
            return false;
    }

    @Override
    public Page<PostResponse> userPost(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Page<PostResponse> postPageResponseList = postsRepository.userPost(users.getId().toString(), pageable);
        for (PostResponse post : postPageResponseList) {
            if (likesRepository.existsByPosts_IdAndUsers_Id(post.getId(), users.getId())) {
                post.setUser_like(true);
            }
        }
        return postPageResponseList;
    }

    @Override
    public Page<PostResponse> findPostByIdUser(String IdUser, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Users users = usersRepository.findById(IdUser)
                .orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));

        Page<PostResponse> postPageResponseList = postsRepository.userPost(users.getId().toString(), pageable);
        for (PostResponse post : postPageResponseList) {
            if (likesRepository.existsByPosts_IdAndUsers_Id(post.getId(), users.getId())) {
                post.setUser_like(true);
            }
        }
        return postPageResponseList;
    }


}
