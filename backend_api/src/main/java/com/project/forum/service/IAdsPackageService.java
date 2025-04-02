package com.project.forum.service;

import com.project.forum.dto.requests.ads.AdsPackageRequest;
import com.project.forum.dto.responses.ads.AdsPackageResponse;
import org.springframework.data.domain.Page;

public interface IAdsPackageService {

    AdsPackageResponse create(AdsPackageRequest adsPackageRequest);

    Page<AdsPackageResponse> findAll(Integer page, Integer size);

    AdsPackageResponse findById(String id);

    AdsPackageResponse update(String id,AdsPackageRequest adsPackageRequest);

    boolean delete(String id);

}