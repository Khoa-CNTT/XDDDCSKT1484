package com.project.forum.service.implement;

import com.project.forum.service.IPromotionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PromotionService implements IPromotionService {

    @Override
    public String generatePromotionPostMessage(String language, String content, String fileName) throws IOException {
        ClassPathResource resource = new ClassPathResource(fileName);
        String template = new String(Files.readAllBytes(Paths.get(resource.getURI())));

        return template.replace("{LANGUAGE}", language)
                .replace("{CONTENT}", content);
    }

    @Override
    public String translatePromotionPostMessage(String input,String language, String fileName) throws IOException {
        ClassPathResource resource = new ClassPathResource(fileName);
        String template = new String(Files.readAllBytes(Paths.get(resource.getURI())));
        return template.replace("{INPUT}", input)
                .replace("{LANGUAGE}", language);
    }



}
