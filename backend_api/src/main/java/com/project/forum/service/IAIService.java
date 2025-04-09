package com.project.forum.service;

import com.project.forum.dto.requests.ai.TranslateRequest;
import com.project.forum.dto.responses.ai.TranslateResponse;
import com.project.forum.exception.ApiResponse;

import java.io.IOException;

public interface IAIService {

    String getAnswer(String question);

    TranslateResponse translate(TranslateRequest translateRequest) throws IOException;


}
