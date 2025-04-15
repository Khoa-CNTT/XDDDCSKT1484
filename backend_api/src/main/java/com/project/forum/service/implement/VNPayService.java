package com.project.forum.service.implement;

import com.project.forum.configuration.VNPayConfig;
import com.project.forum.dto.responses.vnpay.VnPayResponse;
import com.project.forum.enity.*;
import com.project.forum.enums.ErrorCode;
import com.project.forum.enums.StatusPayment;
import com.project.forum.enums.TypePost;
import com.project.forum.exception.WebException;
import com.project.forum.mapper.TransactionMapper;
import com.project.forum.repository.*;
import com.project.forum.service.IVNPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VNPayService  implements IVNPayService {

    VNPayConfig vnPayConfig;
    TransactionRepository transactionRepository;
    TransactionMapper transactionMapper;
    PostsRepository postsRepository;
    AdsPackageRepository adsPackageRepository;
    PostContentRepository postContentRepository;
    AdvertisementRepository advertisementRepository;
    UsersRepository usersRepository;

    @Override
    public VnPayResponse createOrder(HttpServletRequest request, String location, String type, String idHandler, String ads_package) {

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";

        String vnp_IpAddr = VNPayConfig.getIpAddress(request);
        String vnp_TmnCode = vnPayConfig.getVnp_TmnCode();
        String orderType = "order-type";


        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new WebException(ErrorCode.E_USER_NOT_FOUND));
        AdsPackage adsPackage = adsPackageRepository.findById(ads_package).orElseThrow(() -> new WebException(ErrorCode.E_ADS_PACKAGE_NOT_FOUND));
        Posts posts = postsRepository.findById(idHandler).orElseThrow(() -> new WebException(ErrorCode.E_POST_NOT_FOUND));
        Advertisement advertisement = Advertisement.builder()
                .id(UUID.randomUUID().toString())
                .views(0)
                .adsPackage(adsPackage)
                .status(false)
                .created_at(LocalDateTime.now())
                .posts(posts)
                .build();
        BigDecimal exchangeRate = BigDecimal.valueOf(24000);
        String vnp_CurrCode;
        String vnp_Locale;
        BigDecimal vndAmount = null;
        if (location.equals("vn")) {
            vnp_CurrCode = "VND";
            vnp_Locale = "vn";
            vndAmount = adsPackage.getPrice();
        } else {
            vnp_CurrCode = "USD";
            vnp_Locale = "en";
            vndAmount = adsPackage.getPrice().multiply(exchangeRate);
        }
        int amount = vndAmount.multiply(BigDecimal.valueOf(100)).intValue();
        Transaction transaction = Transaction.builder()
                .id(UUID.randomUUID().toString())
                .amount(adsPackage.getPrice())
                .currency(vnp_CurrCode)
                .message(adsPackage.getDescription())
                .code(generateOrderId())
                .created_at(LocalDateTime.now())
                .status(StatusPayment.WAITING.getStatus())
                .transaction_id(UUID.randomUUID().toString())
                .payable_id(advertisement.getId())
                .payable_type("ADVERTISEMENT")
                .users(users)
                .build();
        String vnp_TxnRef = transaction.getId();
        String orderInfor = generateOrderId();

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", orderInfor);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", vnp_Locale);
//        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
//        baseUrl += vnPayConfig.getVnp_Returnurl();
        String baseUrl = "http://localhost:1407/paymentResult";
        String localUrl = baseUrl;
        vnp_Params.put("vnp_ReturnUrl", localUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {

                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String salt = vnPayConfig.getVnp_HashSecret();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(salt, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
        transaction.setUrl_payment(paymentUrl);
        transactionRepository.save(transaction);
        advertisementRepository.save(advertisement);
        return VnPayResponse.builder()
                .success(true)
                .url(paymentUrl)
                .build();
    }

    public String generateOrderId() {
        String prefix = "ADS";
        Random random = new Random();
        StringBuilder numberPart = new StringBuilder();

        for (int i = 0; i < 18; i++) {
            int digit = random.nextInt(10); // từ 0 đến 9
            numberPart.append(digit);
        }

        return prefix + numberPart.toString();
    }
    @Override
    public VnPayResponse orderReturn(HttpServletRequest request) {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_TxnRef = request.getParameter("vnp_TxnRef");
        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        String vnp_OrderInfo = request.getParameter("vnp_OrderInfo");

        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String signValue = VNPayConfig.hashAllFields(fields, vnPayConfig.getVnp_HashSecret());
        String transactionStatus = request.getParameter("vnp_TransactionStatus");

        if (signValue.equals(vnp_SecureHash)) {
            Transaction transaction = transactionRepository.findById(vnp_TxnRef)
                    .orElseThrow(() -> new WebException(ErrorCode.E_TRANSACTION_NOT_FOUND));

            switch (transactionStatus) {
                case "00":
                    transaction.setStatus(StatusPayment.COMPLETED.getStatus());
                    Advertisement advertisement = advertisementRepository
                            .findById(transaction.getPayable_id()).orElseThrow(() -> new WebException(ErrorCode.E_TRANSACTION_NOT_FOUND));
                    advertisement.setStatus(true);
                    advertisementRepository.save(advertisement);
                    break;
                case "09":
                    transaction.setStatus(StatusPayment.CANCELLED.getStatus());
                    break;
                case "01":
                case "02":
                case "04":
                case "24":
                    transaction.setStatus(StatusPayment.FAILED.getStatus());
                    break;
                case "05":
                case "06":
                case "10":
                    transaction.setStatus(StatusPayment.PENDING.getStatus());
                    break;
                case "07":
                    transaction.setStatus(StatusPayment.ON_HOLD.getStatus());
                    break;
                default:
                    transaction.setStatus(StatusPayment.UNKNOWN.getStatus());
                    break;
            }

            transactionRepository.save(transaction);
            return VnPayResponse.builder()
                    .success(true)
                    .result(transaction.getStatus())
                    .build();
        } else {
            return VnPayResponse.builder()
                    .success(false)
                    .result("Some Thing Wrong")
                    .build();
        }

    }

}
