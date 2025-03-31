package com.project.forum.dto.responses.ai;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.project.forum.dto.requests.ai.Message;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AiResponse {
    private List<Choice> choices;



    public static class Choice {
        private Message message;

        public Message getMessage() {
            return message;
        }

        public void setMessage(Message message) {
            this.message = message;
        }
    }
}
