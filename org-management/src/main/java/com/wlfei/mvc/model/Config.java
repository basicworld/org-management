package com.wlfei.mvc.model;

// 配置bean
public class Config {
	private String key;
	private String subKey;
	private String value;
	
	@Override
	public String toString() {
		return "Config [key=" + key + ", subKey=" + subKey + ", value=" + value + "]";
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getSubKey() {
		return subKey;
	}
	public void setSubKey(String subKey) {
		this.subKey = subKey;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}
