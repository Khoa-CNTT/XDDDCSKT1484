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
    public String generatePromotionPostContentMessage(String language, String content) throws IOException {
        ClassPathResource resource = new ClassPathResource("post_content_template.txt");
        String template = new String(Files.readAllBytes(Paths.get(resource.getURI())));

        return template.replace("{LANGUAGE}", language)
                .replace("{CONTENT}", content);
    }


}
