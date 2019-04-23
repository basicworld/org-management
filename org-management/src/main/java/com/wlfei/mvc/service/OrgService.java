package com.wlfei.mvc.service;

import java.util.List;

import com.wlfei.mvc.model.Organization;
import com.wlfei.mvc.model.Summary;

public interface OrgService {
	// 根据id获取机构
	Organization getOrgById(Integer id); 
	// 根据9为机构代码获取机构
	Organization getOrgByOrgcode9(String orgcode9); 
	// 根据18位机构代码获取机构
	Organization getOrgByOrgcode18(String orgcode18); 
	// 根据ip获取机构列表
	List<Organization> getOrgListByIp(String ip);
	// 分页获取机构列表 
	List<Organization> getOrgListByPage(Integer pageNum, Integer pageSize);
	// 根据机构名称获取机构列表
	List<Organization> getOrgListByName(String orgName);
	
	// 根据接入日期获取最近接入的top N 机构列表
	List<Organization> getTopNOrgList(Integer topn);
	
	// 插入机构信息，返回机构id
	Integer saveOrgReturnId(Organization org);
	
	// 简易报表
	Summary getSummary();
	
}
