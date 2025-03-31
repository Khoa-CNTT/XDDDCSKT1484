package com.project.forum.service.implement;

import com.project.forum.service.ICacheService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CacheService implements ICacheService {
    final RedisTemplate<String, Object> redisTemplate;


    @Override
    public void saveData(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public Object getData(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    @Override
    public void saveDataWithTime(String key, Object value, Long time) {
        redisTemplate.opsForValue().set(key, value, time, TimeUnit.MILLISECONDS);
    }

    @Override
    public boolean existData(String key) {
        if (redisTemplate.hasKey(key)) {
            return true;
        }
        return false;
    }

    @Override
    public void saveDateNoValue(String key, Long time) {
        redisTemplate.opsForValue().set(key, "", time, TimeUnit.MILLISECONDS);

    }


}
