package com.project.forum.repository;

import com.project.forum.dto.responses.ads.AdsResponse;
import com.project.forum.enity.Advertisement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, String> {


    @Query("SELECT NEW com.project.forum.dto.responses.ads.AdsResponse( " +
            "a.id, a.views, a.status, a.created_at, a.posts.id, a.adsPackage.id ) " +
            "FROM advertisement a")
    Page<AdsResponse> findAllAds(Pageable pageable);

    @Query("SELECT NEW com.project.forum.dto.responses.ads.AdsResponse( " +
            "a.id, a.views, a.status, a.created_at, a.posts.id, a.adsPackage.id ) " +
            "FROM advertisement a " +
            "WHERE a.posts.users.id = :id")
    Page<AdsResponse> findAllAdsByUser(@Param("id") String id, Pageable pageable);

}




