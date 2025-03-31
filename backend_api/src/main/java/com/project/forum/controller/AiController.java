package com.project.forum.controller;

import com.project.forum.dto.requests.ai.QuestionRequest;
import com.project.forum.exception.ApiResponse;
import com.project.forum.service.IAIService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/ai")
@Tag(name = "13. AI")
public class AiController {

    IAIService aiService;


    @PostMapping()
    ResponseEntity<ApiResponse<String>> getAnswer(QuestionRequest questionRequest){
        return ResponseEntity.ok(ApiResponse.<String>builder()
                        .data(aiService.getAnswer(questionRequest.getQuestion()))
                .build());
    }

}
