package com.project.forum.repository;

import com.project.forum.dto.responses.ads.AdsPackageResponse;
import com.project.forum.enity.AdsPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AdsPackageRepository extends JpaRepository<AdsPackage, String> {

    @Query("SELECT new com.project.forum.dto.responses.ads.AdsPackageResponse( " +
            "a.id, a.name, a.description, a.price, a.max_impressions, a.created) " +
            "FROM AdsPackage a")
    Page<AdsPackageResponse> findAllAdsPackage(Pageable pageable);

    @Query("SELECT new com.project.forum.dto.responses.ads.AdsPackageResponse( " +
            "a.id, a.name, a.description, a.price, a.max_impressions, a.created) " +
            "FROM AdsPackage a " +
            "WHERE a.id = :id")
    Optional<AdsPackageResponse> findAdsPackageById(@Param("id") String id);
}