package com.project.forum.service;

import java.io.IOException;

public interface IPromotionService {
    String generatePromotionPostContentMessage(String language, String content) throws IOException;
}
