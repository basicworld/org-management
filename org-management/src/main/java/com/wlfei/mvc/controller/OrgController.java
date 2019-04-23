package com.wlfei.mvc.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.wlfei.mvc.model.Organization;
import com.wlfei.mvc.model.Summary;
import com.wlfei.mvc.service.OrgService;
import com.wlfei.mvc.service.impl.OrgServiceImpl;

/**
 * 机构controller
 * @author lenovo
 *
 */
@Controller
@RequestMapping("/org")
public class OrgController {
	private static Logger log = LoggerFactory.getLogger(MainController.class);
	private OrgService orgService = new OrgServiceImpl();
	
	@RequestMapping(value="/query", method=RequestMethod.GET, params="top5")
	public @ResponseBody List<Organization> getOrgListInJson(){
		return orgService.getTopNOrgList(5);
	}
	@RequestMapping(value="/query/page/{pageNum}", method=RequestMethod.GET)
	public @ResponseBody List<Organization> getOrgListInJsonByPage(@PathVariable("pageNum") Integer pageNum){
		log.debug("get org list by page, pageNum={}", pageNum);
		int pageSize = 20;
		return orgService.getOrgListByPage(pageNum, pageSize);
	}
	@RequestMapping(value="/query/", method=RequestMethod.POST)
	public @ResponseBody List<Organization> getOrgListInJsonByParm(String searchParm){
		log.debug("get post data:"+searchParm);
		return orgService.getTopNOrgList(6);
	}
	
	@RequestMapping(value="/summary", method=RequestMethod.GET)
	public @ResponseBody Summary getSummaryInJson(){
		return orgService.getSummary();
	}
}
