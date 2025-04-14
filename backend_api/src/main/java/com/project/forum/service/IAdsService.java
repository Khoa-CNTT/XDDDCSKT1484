package com.project.forum.service;

import com.project.forum.dto.responses.ads.AdsResponse;
import org.springframework.data.domain.Page;

public interface IAdsService {

    Page<AdsResponse> findAll(Integer page,Integer size);

    Page<AdsResponse> findAllByUser(Integer page,Integer size);

    AdsResponse findById(String id);


}
