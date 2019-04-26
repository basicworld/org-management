package com.wlfei.mvc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * 页面控制
 * @author lenovo
 *
 */
@Controller
@RequestMapping("/org-man")
public class MainController {
	private static Logger log = LoggerFactory.getLogger(MainController.class);
	
	@RequestMapping(value="/template/{pageName}",method=RequestMethod.GET)
	public String getTemplate(@PathVariable("pageName") String pageName) {
		log.info("get {} page", pageName);
		return pageName;
	}
	@RequestMapping(value="/home",method=RequestMethod.GET)
	public String toHome() {
		log.info("get home page");
		return "home";
	}
	
}
