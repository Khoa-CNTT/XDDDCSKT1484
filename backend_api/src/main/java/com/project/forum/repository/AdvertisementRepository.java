package com.project.forum.repository;

import com.project.forum.dto.responses.ads.AdsResponse;
import com.project.forum.enity.Advertisement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, String> {


    @Query("SELECT NEW com.project.forum.dto.responses.ads.AdsResponse( " +
            "a.id, a.views, a.status, a.created_at, a.posts.id, a.adsPackage.id ) " +
            "FROM Advertisement a")
    Page<AdsResponse> findAllAds(Pageable pageable);

    @Query("SELECT NEW com.project.forum.dto.responses.ads.AdsResponse( " +
            "a.id, a.views, a.status, a.created_at, a.posts.id, a.adsPackage.id ) " +
            "FROM Advertisement a " +
            "WHERE a.posts.users.id = :id")
    Page<AdsResponse> findAllAdsByUser(@Param("id") String id, Pageable pageable);

    @Query("SELECT a " +
            "FROM Advertisement a " +
            "LEFT JOIN a.adsPackage ads " +
            "WHERE a.status = true " +
            "AND a.views != ads.max_impressions " +
            "ORDER BY FUNCTION('RAND')")
    Page<Advertisement> findRandomAdvertisement(Pageable pageable);



    @Query("SELECT NEW com.project.forum.dto.responses.ads.AdsResponse(a.id, a.views, a.status, a.created_at, a.posts.id, a.adsPackage.id ) " +
            "FROM Advertisement a " +
            "WHERE a.id = :id" )
    Optional<AdsResponse> findAds(@Param("id") String id);


    @Query("SELECT a " +
            "FROM Advertisement a " +
            "LEFT JOIN a.posts p " +
            "LEFT JOIN a.adsPackage ads " +
            "WHERE p.id = :postId " +
            "AND a.status = true " +
            "AND a.views != ads.max_impressions")
    Optional<Advertisement> findAdsByPostId(@Param("postId") String postId);
}




