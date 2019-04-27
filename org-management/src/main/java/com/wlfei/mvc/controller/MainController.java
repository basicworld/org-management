package com.wlfei.mvc.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wlfei.mvc.dao.ConfigDao;
import com.wlfei.mvc.model.Config;
import com.wlfei.mvc.service.ConfigService;
import com.wlfei.mvc.service.impl.ConfigServiceImpl;


/**
 * 页面控制
 * @author lenovo
 *
 */
@Controller
@RequestMapping("/org-man")
public class MainController {
	@Autowired
	private ConfigService configService;
	
	private static Logger log = LoggerFactory.getLogger(MainController.class);
	
	@RequestMapping(value="/template/{pageName}",method=RequestMethod.GET)
	public String getTemplate(@PathVariable("pageName") String pageName) {
		log.info("get {} page", pageName);
		return pageName;
	}
	@RequestMapping(value="/config/{key}",method=RequestMethod.GET)
	public @ResponseBody List<Config> getConfig(@PathVariable("key") String key) {
		log.info("get {} config", key);
		return configService.getConfig(key);
	}
	@RequestMapping(value="/home",method=RequestMethod.GET)
	public String toHome() {
		log.info("get home page");
		return "home";
	}
	
}
