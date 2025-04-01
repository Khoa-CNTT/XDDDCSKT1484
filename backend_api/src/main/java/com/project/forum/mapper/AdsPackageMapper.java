package com.project.forum.mapper;

import com.project.forum.dto.requests.ads.AdsPackageRequest;
import com.project.forum.dto.responses.ads.AdsPackageResponse;
import com.project.forum.enity.AdsPackage;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AdsPackageMapper {

    AdsPackageResponse toAdsPackageResponse(AdsPackage adsPackage);

    AdsPackage toUpdateAdsPackage(@MappingTarget AdsPackage adsPackage, AdsPackageRequest adsPackageRequest);

}