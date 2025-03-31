package com.project.forum.service.implement;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.project.forum.configuration.CloudinaryConfig;
import com.project.forum.dto.responses.upload.UploadImageResponse;
import com.project.forum.enums.ErrorCode;
import com.project.forum.exception.WebException;
import com.project.forum.service.IUploadImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UploadImageService implements IUploadImageService {

    final Cloudinary cloudinary;

    final List<String> allowedTypes;

    @Value("${app.upload.max-size}")
    private long maxFileSize;

    @Override
    public UploadImageResponse uploadImage(MultipartFile file) {
        try {
            if (maxFileSize < file.getSize()) {
                throw new WebException(ErrorCode.E_FILE_TO_LARGE);
            }

            if (!allowedTypes.contains(file.getContentType())) {
                throw new WebException(ErrorCode.E_FILE_INVALID);
            }
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return UploadImageResponse.builder()
                    .url(uploadResult.get("url").toString())
                    .success(true)
                    .build();
        } catch (Exception e) {
            return UploadImageResponse.builder()
                    .success(false)
                    .message("Error while deleting image")
                    .build();
        }
    }

    @Override
    public UploadImageResponse deletedImage(String url) {
        try {
            String[] parts = url.split("/");
            String filenameWithExtension = parts[parts.length - 1];

            Map result = cloudinary.uploader().destroy(filenameWithExtension.substring(0, filenameWithExtension.lastIndexOf(".")), ObjectUtils.emptyMap());
            boolean isDeleted = "ok".equals(result.get("result"));
            if (!isDeleted){
                return UploadImageResponse.builder()
                        .success(isDeleted)
                        .message("Deleted false")
                        .build();
            }
            return UploadImageResponse.builder()
                    .success(isDeleted)
                    .message("Deleted Success")
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            return UploadImageResponse.builder()
                    .success(false)
                    .message("Error while deleting image")
                    .build();
        }
    }

}
