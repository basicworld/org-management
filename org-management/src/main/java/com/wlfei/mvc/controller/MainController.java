package com.wlfei.mvc.controller;

import java.util.ArrayList;
import java.util.List;

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
		case "summary": // summary 页面请求，返回最近新增的6家机构
			return orgService.getTopNOrgList(6);
			
		case "org_list": // org_list 页面请求
			String searchParm = request.getParameter("searchParm");
			int pageNum = Integer.parseInt(request.getParameter("pageNum"));
			// 请求关键字不为空则按条件查询  否则按全部机构数查询
			if (searchParm == null || searchParm == "") {
				return orgService.getTopNOrgList(6);
			} else {
				return orgService.getOrgListByPage(pageNum, 20);
			}
		case "org_detail":
			int id = Integer.parseInt(request.getParameter("searchParm"));
			return orgService.getOrgById(id);
		default:
			break;
		}
		log.info("getOrgList parm:" + request.getParameterMap());
//		String searchType = String.valueOf(request.getParameter("searchType"));
//		searchBean.setPage(page);
//		searchBean.setSearchType(searchType);
		return new ArrayList();
//		orgService.getOrgListByPage(page, 20);
	}
	///////////////// organization controller end ////////////////////////
	
	
	
	// 从配置库查询config信息的service 依赖mybatis
	@Autowired
	private ConfigService configService;
	// logger
	private static Logger log = LoggerFactory.getLogger(MainController.class);
	// 机构处理 service
	private OrgService orgService = new OrgServiceImpl();

	// 查询top5的机构 即将弃用
	@RequestMapping(value = "/org", method = RequestMethod.POST)
	public @ResponseBody List<Organization> doOrgQuery() {
		return orgService.getTopNOrgList(5);
	}
	// 查询top5的机构 即将弃用
	@RequestMapping(value = "/query", method = RequestMethod.GET, params = "top5")
	public @ResponseBody List<Organization> getOrgListInJson() {
		return orgService.getTopNOrgList(5);
	}

	// 分页 查询机构列表 即将弃用
	@RequestMapping(value = "/query/page/{pageNum}", method = RequestMethod.GET)
	public @ResponseBody List<Organization> getOrgListInJsonByPage(@PathVariable("pageNum") Integer pageNum) {
		log.debug("get org list by page, pageNum={}", pageNum);
		int pageSize = 20;
		return orgService.getOrgListByPage(pageNum, pageSize);
	}

//	// 多模查询机构信息接口
//	@RequestMapping(value = "/query", method = RequestMethod.POST)
//	@ResponseBody
//	public List<Organization> getOrgListInJsonByParm(@RequestBody SearchBean searchBean) {
//		log.debug("get post data:" + searchBean);
//		switch (searchBean.getSearchType()) {
//		case "parm.like(orgName,orgFullname,testIp,porIp)+page=list":
//			if ("" == searchBean.getParm()) {
//				int pageSize = 20;
//				return orgService.getOrgListByPage(searchBean.getPage(), pageSize);
//			}
//			return orgService.getTopNOrgList(6);
//		default:
//			return new ArrayList<Organization>();
//		}
//	}

	// 保存机构
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String doSave(@RequestBody Organization org) {
		log.debug("get post data:" + org);
//		return orgService.getTopNOrgList(6);
		return "123";
	}

	// 获取首页的数据
	@RequestMapping(value = "/summary", method = RequestMethod.GET)
	@ResponseBody
	public Summary getSummaryInJson(HttpServletRequest request) {
		log.debug("get summary data");
		return orgService.getSummary();
	}

	// 获取配置表信息config
	@RequestMapping(value = "/config", method = RequestMethod.POST)
	public @ResponseBody List<Config> getConfig1(@RequestBody Config config) {
		log.info("get query config: {} ", config);
		return configService.getConfigService(config);
	}

	//////////////////////////// 页面control///////////////////////////////////

}
