package com.wlfei.mvc.dao;

import java.util.List;

import com.wlfei.mvc.model.Config;

// 配置信息接口
public interface ConfigDao {
	// 根据key获取value
	public List<Config> getConfig(String key);
}
