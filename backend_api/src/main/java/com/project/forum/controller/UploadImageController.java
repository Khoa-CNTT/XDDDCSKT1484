package com.project.forum.controller;

import com.project.forum.dto.requests.upload.UrlRequest;
import com.project.forum.dto.responses.upload.UploadImageResponse;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IUploadImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/upload")
@Tag(name = "12. Upload")
public class UploadImageController {

    IUploadImageService uploadImageService;

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload an image", description = "Uploads an image file.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Image uploaded successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UploadImageResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid file input")
    })
    public ResponseEntity<ApiResponse<UploadImageResponse>> upload(
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<UploadImageResponse>builder()
                        .data(uploadImageService.uploadImage(file))
                        .build());
    }


    @DeleteMapping("/image")
    ResponseEntity<ApiResponse<UploadImageResponse>> deleted(@RequestBody UrlRequest url) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<UploadImageResponse>builder()
                .data(uploadImageService.deletedImage(url.getUrl()))
                .build());
    }
}
