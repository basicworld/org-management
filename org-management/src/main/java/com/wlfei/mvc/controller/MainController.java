package com.wlfei.mvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.wlfei.mvc.dao.ConfigDao;
import com.wlfei.mvc.model.Config;
import com.wlfei.mvc.model.Organization;
import com.wlfei.mvc.model.Summary;
import com.wlfei.mvc.service.ConfigService;
import com.wlfei.mvc.service.OrgService;
import com.wlfei.mvc.service.impl.ConfigServiceImpl;
import com.wlfei.mvc.service.impl.OrgServiceImpl;

/**
 *  controller  restful风格
 * 
 * @author lenovo
 *
 */
@Controller
@RequestMapping("/oms") // organization management system机构管理平台
public class MainController {
	// 分页用
	private int pageSize = 20;
	// 从配置库查询config信息的service 依赖mybatis
	@Autowired
	private ConfigService configService;
	// logger
	private static Logger log = LoggerFactory.getLogger(MainController.class);
	// 机构处理 service
	@Autowired
	private OrgService orgService;
	///////////////// page controller start ////////////////////////
	// 首页
	@RequestMapping(value = { "/home", "/", ""}, method = RequestMethod.GET)
	public String getHome() {
		return "home";
	}

	// 获取模板页面
	@RequestMapping(value = {"/page/{pageName}"}, method = RequestMethod.GET)
	public String getPage(@PathVariable("pageName") String pageName) {
		log.info("getPage--get {} page", pageName);
		return pageName;
	}
	
	///////////////// page controller end ////////////////////////
	
	
	///////////////// summary controller start ////////////////////////
	///////////////// summary controller end ////////////////////////
	
	
	
	///////////////// organization controller start ////////////////////////
	// get org list
	@RequestMapping(value = {"/orgs"}, method = RequestMethod.GET)
	@ResponseBody
	public List<Organization> getOrgList(HttpServletRequest request) {
		// 获取页面类型  不通的页面类型 做不同的查询动作
		String pageName = request.getParameter("pageName");
		log.info("getOrgList pageType:" + pageName);
		switch (pageName) {
		case "summary": // summary 页面请求，返回最近新增的5家机构
			int topn = 5;
			return orgService.selectRecentRegOrgService(5);
			
		case "org_list": // org_list 页面请求
			
			String searchParm = request.getParameter("searchParm");
			int pageNum = Integer.parseInt(request.getParameter("pageNum"));
			log.debug("getOrgLis--case org_list: searchParm=" + searchParm + " pageNum= " + pageNum);
			// 请求关键字为空则查询全部机构  否则按条件查询
			if (searchParm == null || searchParm == "") {
				// 查询全部机构
				return orgService.getOrgListByPageService(pageNum, pageSize);
			} else {
				// 按关键字查询
				return orgService.getOrgListByParmService(searchParm, pageNum, pageSize);
			}
		case "org_detail":
			return orgService.getOrgByIdService(Integer.parseInt(request.getParameter("searchParm")));
		case "org_edit":
			return orgService.getOrgByIdService(Integer.parseInt(request.getParameter("searchParm")));
		default:
			break;
		}
		return null;
	}
	// update org list
	@RequestMapping(value = {"/orgs"}, method = RequestMethod.PUT)
	@ResponseBody
	public List<String> updateOrgList(HttpServletRequest request) {
		List<Organization> orgList = JSON.parseArray(request.getParameter("orgList"), Organization.class) ;
		List<String> ids = new ArrayList<String>();
		for(Organization org: orgList) {
			orgService.updateOrgService(org);
			ids.add("" + org.getId());
		}
		return ids; // 返回机构id的列表  列表是为了支持多机构的批量修改
	}
	// insert new  org list
	@RequestMapping(value = {"/orgs"}, method = RequestMethod.POST)
	@ResponseBody
	public List<String> insertOrgList(HttpServletRequest request) {
		List<Organization> orgList = JSON.parseArray(request.getParameter("orgList"), Organization.class) ;
		List<String> ids = new ArrayList<String>();
		for(Organization org: orgList) {
			orgService.insertOrgService(org);
			ids.add("" + org.getId());
		}
		return ids; // 返回机构id的列表  列表是为了支持多机构的批量修改
	}
	///////////////// organization controller end ////////////////////////
	// 检查数据合法性
	@RequestMapping(value = {"/orgcheck"}, method = RequestMethod.GET)
	@ResponseBody
	public String orgCheck(HttpServletRequest request) {
		String checkType = request.getParameter("checkType");
		String checkValue = request.getParameter("checkValue");
		int id = Integer.parseInt(request.getParameter("id"));
		
		log.debug("orgCheck: " + checkType + " " + checkValue);
		return orgService.orgCheckService(checkType, checkValue, id);
	}

	// 获取首页的数据
	@RequestMapping(value = "/summary", method = RequestMethod.GET)
	@ResponseBody
	public Summary getSummaryInJson(HttpServletRequest request) {
		log.debug("get summary data");
		return orgService.getSummary();
	}

	// 获取配置表信息config
	@RequestMapping(value = "/config", method = RequestMethod.GET)
	@ResponseBody
	public List<Config> getConfig(Config config) {
		return configService.getConfigService(config);
	}

	//////////////////////////// 页面control///////////////////////////////////

}
