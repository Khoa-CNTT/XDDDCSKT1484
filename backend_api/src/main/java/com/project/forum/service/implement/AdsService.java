package com.project.forum.service.implement;

import com.project.forum.dto.responses.ads.AdsResponse;
import com.project.forum.enity.Advertisement;
import com.project.forum.enity.Users;
import com.project.forum.enums.ErrorCode;
import com.project.forum.exception.WebException;
import com.project.forum.repository.AdvertisementRepository;
import com.project.forum.repository.UsersRepository;
import com.project.forum.service.IAdsService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdsService implements IAdsService {

    AdvertisementRepository advertisementRepository;

    UsersRepository usersRepository;

    @Override
    public Page<AdsResponse> findAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AdsResponse> adsResponses = advertisementRepository.findAllAds(pageable);
        return adsResponses;
    }

    @Override
    public Page<AdsResponse> findAllByUser(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        Page<AdsResponse> adsResponses = advertisementRepository.findAllAdsByUser(user.getId(),pageable);
        return adsResponses;
    }

    @Override
    public AdsResponse findById(String id) {
        AdsResponse adsResponse = advertisementRepository.findAds(id).orElseThrow(() -> new WebException(ErrorCode.ADS_NOT_FOUND));
        return adsResponse;
    }
}
