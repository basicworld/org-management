package com.wlfei.mvc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wlfei.mvc.dao.ConfigDao;
import com.wlfei.mvc.model.Config;
import com.wlfei.mvc.service.ConfigService;

@Service
public class ConfigServiceImpl implements ConfigService {

	@Autowired
	private ConfigDao configDao;
	
	@Override
	public List<Config> getConfig(String key) {
		List<Config> config = configDao.getConfig(key);
		return config;
	}


}
