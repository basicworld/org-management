package com.wlfei.mvc.service;

import java.util.List;

import com.wlfei.mvc.model.Organization;
import com.wlfei.mvc.model.Summary;

public interface OrgService {
	// 根据id获取机构
	List<Organization> getOrgByIdService(Integer id); 
	// 根据9为机构代码获取机构
	Organization getOrgByOrgcode9(String orgcode9); 
	// 根据18位机构代码获取机构
	Organization getOrgByOrgcode18(String orgcode18); 
	// 根据ip获取机构列表
	List<Organization> getOrgListByIp(String ip);
	// 分页获取机构列表 
	List<Organization> getOrgListByPageService(Integer pageNum, Integer pageSize);
	// 根据关键字分页获取机构列表
	// 查询机构简称、全称、机构代码、统一社会信用代码、测试ip、生产ip
	// searchParm  查询关键字
	List<Organization> getOrgListByParmService(String searchParm, Integer pageNum, Integer pageSize);
	// 根据机构名称获取机构列表
	List<Organization> getOrgListByName(String orgName);
	
	// 根据接入日期获取最近接入的top N 机构列表
	List<Organization> selectRecentRegOrgService(Integer topn);
	
	// 插入机构信息，返回机构id
	void insertOrgService(Organization org);
	// 插入机构信息，返回机构id
	void updateOrgService(Organization org);
	
	// 简易报表
	Summary getSummary();
	// 机构输入信息核验
	String orgCheckService(String checkType, String checkValue, Integer id);
	
}
