package com.wlfei.mvc.service.impl;

import java.util.ArrayList;
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
	public List<Config> getConfigService(Config config) {
		List<Config> configList = new ArrayList<Config>();
		if (config.getSubKey() == null) {
			configList = configDao.getConfigWithOneKey(config.getKey());
		} else {
			configList = configDao.getConfigWithTwoKey(config.getKey(), config.getSubKey());
		}
		return configList;
	}
}
