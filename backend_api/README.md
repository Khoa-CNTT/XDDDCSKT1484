# 📘 Forum-API

## 🧩 Giới thiệu

Đây là backend API cho dự án **XDDDCSKT1484** – một diễn đàn chia sẻ kiến thức đa ngôn ngữ, tích hợp AI để hỗ trợ duyệt và cảnh báo nội dung không lành mạnh.  
Dự án được phát triển bởi nhóm sinh viên Khoa Công nghệ Thông tin, với mục tiêu xây dựng một nền tảng học thuật an toàn, thân thiện và thông minh.

👉 [Xem trên GitHub](https://github.com/Khoa-CNTT/XDDDCSKT1484)

---

## ⚙️ Công nghệ sử dụng

- **Java 17 & Spring Boot**: Xây dựng hệ thống API RESTful.
- **MySQL**: Lưu trữ dữ liệu người dùng, bài viết, bình luận.
- **Redis**: Lưu trữ dữ liệu key value
- **Swagger**: Quản lý Api
- **Docker & Docker Compose**: Triển khai nhanh chóng và dễ dàng.
- **Maven**: Quản lý phụ thuộc và build project.
- **AI Content Moderation**: Tích hợp AI để kiểm duyệt nội dung không phù hợp và dịch bài viết.

---

## 🚀 Hướng dẫn khởi chạy

### 1. Yêu cầu hệ thống

- IDE Intellij Idea
- Java 17+
- Docker & Docker Compose
- Maven (hoặc sử dụng Maven Wrapper đi kèm)

### 2. Cài đặt 
- Tải key Api AI:https://www.mediafire.com/file/vxazgorhjuifbqu/key.txt/file
- Truy cập file XDDDCSKT1484\backend_api\src\main\resources\application.yaml
- Thêm key vào
```bash
# Thêm <key> vào 
AI:
  key: <key>
  url: "https://api.openai.com/v1/chat/completions"
```

### 3. Khởi chạy bằng Docker

```bash
# Build và chạy các dịch vụ
docker-compose up --build
```

### 4. Truy cập
- Api: localhost:8080
- Swagger: localhost:8080/swagger-ui/index.html

