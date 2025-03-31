package com.project.forum.service;

import com.project.forum.dto.responses.upload.UploadImageResponse;
import org.springframework.web.multipart.MultipartFile;

public interface IUploadImageService {


        UploadImageResponse uploadImage(MultipartFile file);

    UploadImageResponse deletedImage(String url);
}
