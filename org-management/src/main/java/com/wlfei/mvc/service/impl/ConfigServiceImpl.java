package com.wlfei.mvc.service.impl;

import com.wlfei.mvc.service.ConfigService;

public class ConfigServiceImpl implements ConfigService {

	@Override
	public String doGet(String key) {
		return "value";
	}

	@Override
	public String doGet(String type, String key) {
		return "value1";
	}

	@Override
	public String doGet(String type, int key) {
		// TODO Auto-generated method stub
		return "value2";
	}

}
