package com.project.forum.service;

import com.project.forum.dto.responses.vnpay.VnPayResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface IVNPayService {
    VnPayResponse orderReturn(HttpServletRequest request);

    VnPayResponse createOrder(HttpServletRequest request, String location, String type, String idHandler, String ads_package);
}
