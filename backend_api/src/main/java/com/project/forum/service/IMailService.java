package com.project.forum.service;

import com.project.forum.dto.requests.user.UpdatePasswordDto;
import com.project.forum.dto.responses.mail.MailResponse;

public interface IMailService {

    MailResponse sendMailActive();

    MailResponse checkMailActive(String token);

    MailResponse sendMailChangePassword(String email);

    MailResponse checkMailChangePassword(String token, UpdatePasswordDto updatePasswordDto);


}
