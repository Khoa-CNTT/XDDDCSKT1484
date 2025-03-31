package com.project.forum.service.implement;

import com.project.forum.dto.requests.ai.AiRequest;
import com.project.forum.dto.requests.ai.Message;
import com.project.forum.dto.responses.ai.AiResponse;
import com.project.forum.service.IAIService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.Collections;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AIService implements IAIService {
    IAIService iAIService;

    @Value("${AI.key}")
    String key;

    @Value("${AI.url}")
    String url;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String getAnswer(String question) {
        Message userInput = new Message("user", question);
        AiRequest request = new AiRequest("gpt-3.5-turbo", Collections.singletonList(userInput));

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        httpHeaders.setBearerAuth(key);

        HttpEntity<AiRequest> entity = new HttpEntity<>(request, httpHeaders);

        ResponseEntity<AiResponse> response = restTemplate.exchange(url, HttpMethod.POST, entity, AiResponse.class);

        String result = response.getBody().getChoices().get(0).getMessage().getContent();

        return result;

    }




}
