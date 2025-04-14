package com.project.forum.enity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Builder
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name = "language", indexes = {
        @Index(name = "idx_language_name", columnList = "name")
})
@EntityListeners(AuditingEntityListener.class)
public class Language {

    @Id
    String id;
    String name;

}
