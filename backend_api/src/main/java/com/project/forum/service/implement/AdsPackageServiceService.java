package com.project.forum.service.implement;

import com.project.forum.dto.requests.ads.AdsPackageRequest;
import com.project.forum.dto.responses.ads.AdsPackageResponse;
import com.project.forum.enity.AdsPackage;
import com.project.forum.enums.ErrorCode;
import com.project.forum.exception.WebException;
import com.project.forum.mapper.AdsPackageMapper;
import com.project.forum.repository.AdsPackageRepository;
import com.project.forum.service.IAdsPackageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdsPackageServiceService implements IAdsPackageService {

    final AdsPackageRepository adsPackageRepository;

    final AdsPackageMapper adsPackageMapper;

    @Override
    public AdsPackageResponse create(AdsPackageRequest adsPackageRequest) {
        AdsPackage adsPackage = AdsPackage.builder()
                .name(adsPackageRequest.getName())
                .price(adsPackageRequest.getPrice())
                .description(adsPackageRequest.getDescription())
                .max_impressions(adsPackageRequest.getMax_impressions())
                .created(LocalDateTime.now())
                .build();
        adsPackageRepository.save(adsPackage);
        return adsPackageMapper.toAdsPackageResponse(adsPackage);
    }

    @Override
    public Page<AdsPackageResponse> findAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AdsPackageResponse> adsPackages = adsPackageRepository.findAllAdsPackage(pageable);
        return adsPackages;
    }

    @Override
    public AdsPackageResponse findById(String id) {
        AdsPackageResponse adsPackage = adsPackageRepository.findAdsPackageById(id).orElseThrow(() -> new WebException(ErrorCode.E_ADS_PACKAGE_NOT_FOUND));
        return adsPackage;
    }

    @Override
    public AdsPackageResponse update(String id, AdsPackageRequest adsPackageRequest) {
        AdsPackage adsPackage = adsPackageRepository.findById(id).orElseThrow(() -> new WebException(ErrorCode.E_ADS_PACKAGE_NOT_FOUND));
        adsPackageMapper.toUpdateAdsPackage(adsPackage, adsPackageRequest);
        adsPackageRepository.save(adsPackage);
        return adsPackageMapper.toAdsPackageResponse(adsPackage);
    }

    @Override
    public boolean delete(String id) {
        try {
            adsPackageRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}