package com.project.forum.service;

public interface ICacheService {

    void saveData(String key, Object value);

    Object getData(String key);

    void deleteData(String key);

    void saveDataWithTime(String key, Object value,  Long time);

    boolean existData(String key);

    void saveDateNoValue(String key, Long time);


}
