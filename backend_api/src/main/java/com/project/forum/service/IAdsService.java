package com.project.forum.service;

import com.project.forum.dto.responses.ads.AdsResponse;
import com.project.forum.dto.responses.ads.AdsTotalResponse;
import com.project.forum.dto.responses.ads.TopSpenderResponse;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface IAdsService {

    Page<AdsResponse> findAll(Integer page,Integer size);

    Page<AdsResponse> findAllByUser(Integer page,Integer size);

    AdsResponse findById(String id);

    AdsTotalResponse adsTotal(LocalDateTime start, LocalDateTime end);

    AdsTotalResponse adsTotalByUser(LocalDateTime start, LocalDateTime end);

    List<TopSpenderResponse> getTopSpenders();
}
