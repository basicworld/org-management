package com.wlfei.mvc.demo;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class JsonTest {
	public static void main(String[] args) {
		Map<String, Object> map = new HashMap();
		map.put("valid", false);
		String json = JSON.toJSON(map).toString();
		System.out.println(json);
	}
}
