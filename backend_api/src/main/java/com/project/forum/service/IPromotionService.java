package com.project.forum.service;

import java.io.IOException;

public interface IPromotionService {
    String generatePromotionPostMessage(String language, String content, String fileName) throws IOException;

    String translatePromotionPostMessage(String input, String language,String fileName) throws IOException;
}
