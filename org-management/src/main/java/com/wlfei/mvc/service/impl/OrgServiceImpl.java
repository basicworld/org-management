package com.wlfei.mvc.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.javassist.expr.NewArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.wlfei.mvc.controller.MainController;
import com.wlfei.mvc.dao.ContactDao;
import com.wlfei.mvc.dao.OrgDao;
import com.wlfei.mvc.model.Contact;
import com.wlfei.mvc.model.Organization;
import com.wlfei.mvc.model.Summary;
import com.wlfei.mvc.service.ContactService;
import com.wlfei.mvc.service.OrgService;

@Service
public class OrgServiceImpl implements OrgService {
	private static Logger log = LoggerFactory.getLogger(MainController.class);
	// dao
	@Autowired
	private OrgDao orgDao;
	@Autowired
	private ContactDao contactDao;
	
	// 给多个机构查询联系人列表
	private List<Organization> getContactListForOrgList(List<Organization> orgList) {
		if (orgList == null){
			return new ArrayList<Organization>();
		}
		for(Organization org: orgList) {
			org.setContactList(contactDao.selectByOrgId(org.getId()));
		}
		return orgList;
	}
	// 插入机构联系人
	private void insertContactListForOrg(Organization org) {
		for(Contact contact: org.getContactList()) {
			contact.setOrgId(org.getId());  // 新增的机构，联系人的orgid默认为0，需要配置orgid
			contactDao.insertContact(contact);
		}
	}
	// 插入机构联系人
	private void updateContactListForOrg(Organization org) {
		for(Contact contact: org.getContactList()) {
			contact.setOrgId(org.getId());  // 新增的机构，联系人的orgid默认为0，需要配置orgid
			contactDao.updateContact(contact);
		}
	}
	
	// 根据机构id获取机构
	public List<Organization> getOrgByIdService(Integer id) {
		if (id == null || id < 1) {
			return new ArrayList<Organization>();
		}
		return getContactListForOrgList(orgDao.selectById(id));
	}

	public Organization getOrgByOrgcode9(String orgcode9) {
		// TODO Auto-generated method stub
		return null;
	}

	public Organization getOrgByOrgcode18(String orgcode18) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Organization> getOrgListByIp(String ip) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Organization> getOrgListByName(String orgName) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<Organization> selectRecentRegOrgService(Integer topn) {
		if (topn == null || topn < 1) {
			return new ArrayList<Organization>();
		}
		return getContactListForOrgList(orgDao.selectRecentRegOrg(topn));
	}
	// 新增机构
	public void insertOrgService(Organization org) {
		orgDao.insertOrg(org);
		insertContactListForOrg(org); // 新增联系人
	}
	// 更新机构
	public void updateOrgService(Organization org) {
		orgDao.updateOrg(org);
		// 如果库里没有机构联系人，则新创建联系人，如果有则更新联系人
		List<Contact> existContactList = contactDao.selectByOrgId(org.getId());
		if (existContactList.size()==0) {
			insertContactListForOrg(org); // 新增联系人
		}else {
			updateContactListForOrg(org);  // 更新联系人
		}
	}
	// 获取机构统计汇总信息
	public Summary getSummary() {
		return orgDao.selectSummary();
	}
	// 根据页码 页size查询所有机构
	public List<Organization> getOrgListByPageService(Integer pageNum, Integer pageSize) {
		// 非法值判断，如果小于0 则返回空列表
		if (pageNum == null || pageSize == null || pageNum < 1 || pageSize < 1) {
			return new ArrayList<Organization>();
		}
		return orgDao.selectByPage((pageNum - 1) * pageSize, pageSize);
	}
	// 检查机构信息
	@Override
	public String orgCheckService(String checkType, String checkValue, Integer id) {
		Boolean valid = true;
		switch (checkType) {
		case "orgcode18":
			List<Organization>orgList = orgDao.selectByOrgcode18(checkValue);
			// 返回的机构列表，如果存在不是本机构的其他机构，说明该机构的orgcode18 已经存在，校验不通过
			for(Organization org: orgList) {
				if (org.getId() != id) {valid=false; break;}
			}
			break;
		default:
			valid = true;
			break;
		}
		
		// 返回json格式的string
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("valid", valid);
		return JSON.toJSON(resultMap).toString();
	}

	@Override
	public List<Organization> getOrgListByParmService(String searchParm, Integer pageNum, Integer pageSize) {
		log.debug("getOrgListByParmService searchParm=" + searchParm + " pageNum=" + pageNum + " pageSize=" + pageSize);
		// 非法值判断，如果小于0 则返回空列表
		if (pageNum == null || pageSize == null || pageNum < 1 || pageSize < 1) {
			return new ArrayList<Organization>();
		}
		// 如果searchParm 是空值，则返回所有机构的列表  分页返回
		if(searchParm == null || searchParm=="") {
			return getOrgListByPageService(pageNum, pageSize);
		}
		
		// 如果searchParm 不为空
		return orgDao.selectByParmAndPage(searchParm, (pageNum - 1) * pageSize, pageSize);
	}

}
