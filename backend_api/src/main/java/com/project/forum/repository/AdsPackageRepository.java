package com.project.forum.repository;

import com.project.forum.enity.AdsPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdsPackageRepository extends JpaRepository<AdsPackage, String> {
}