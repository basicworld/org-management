package com.wlfei.mvc.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wlfei.mvc.dao.ConfigDao;
import com.wlfei.mvc.model.Config;
import com.wlfei.mvc.service.ConfigService;

@Service
public class ConfigServiceImpl implements ConfigService {
	private Map<String, Object> configCache = new HashMap<String, Object>();
	@Autowired
	private ConfigDao configDao;
	
	// 从缓存中获取结果  或者从数据库查询结果后存储到缓存
	@SuppressWarnings("unchecked")
	@Override
	public List<Config> getConfigService(Config config) {
		List<Config> configList = new ArrayList<Config>();
		
		String cacheKey = config.getKey()+"--"+config.getSubKey();
		if (configCache.containsKey(cacheKey)){
			// 从缓存获取结果
			configList = (List<Config>) configCache.get(cacheKey); //强转换
		} else {
			// 查询数据库
			if (config.getSubKey() == null) {
				configList = configDao.getConfigWithOneKey(config);
			} else {
				configList = configDao.getConfigWithTwoKey(config);
			}
			// 缓存配置查询结果
			if(configList!= null) {
				configCache.put(cacheKey, configList);
			}
		}
		
		return configList;
	}
}
