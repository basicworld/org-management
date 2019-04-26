package com.wlfei.mvc.service;

public interface ConfigService {
	// {key, value} 型配置查询
	String doGet(String key);
	// type: [{key1, value1},{key2, value2}] 型配置查询
	String doGet(String type, String key);
	String doGet(String type, int key);
}
