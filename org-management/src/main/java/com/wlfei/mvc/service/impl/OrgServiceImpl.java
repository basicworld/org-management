package com.wlfei.mvc.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.wlfei.mvc.model.Organization;
import com.wlfei.mvc.model.Summary;
import com.wlfei.mvc.service.ContactService;
import com.wlfei.mvc.service.OrgService;

public class OrgServiceImpl implements OrgService {
	private ContactService contactService = new ContactServiceImpl();

	public List<Organization> getOrgById(Integer id) {
		List<Organization> orgList = new ArrayList<Organization>();
		orgList.add(this.demoGetOneOrg());
		return orgList;
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

	public List<Organization> getTopNOrgList(Integer topn) {
		List<Organization> orgList = new ArrayList<Organization>();
		for (int i = 0; i < topn; i++) {
			Organization org = this.demoGetOneOrg();
			org.setId(i + 1);
			org.setOrgName(org.getOrgName() + (i + 1));
			orgList.add(org);
		}
		return orgList;
	}

	private Organization demoGetOneOrg() {
		Organization org = new Organization();
		org.setId(1);
		org.setOrgName("百度");
		org.setOrgFullname("百度有限公司");
		org.setOrgcode9("123456789");
		org.setOrgcode18("222333444123456789");
		org.setGameStage(1);
		org.setGameMode(2);
		org.setTestIp("1.1.1.1");
		org.setTestKey("asdggrrwegvfdvg3rw34");
		org.setProIp("2.2.2.2");
		org.setProKey("sadfaskjgireoqy888824");
		org.setContactList(contactService.getContactListByOrgId(1));
		org.setRegDate("2019-04-21");
		org.setNote("会员机构");
		return org;
	}

	public Integer saveOrgReturnId(Organization org) {
		// TODO Auto-generated method stub
		return null;
	}

	public Summary getSummary() {
		Summary summary = new Summary();
		summary.setProIntCount(1);
		summary.setProTotalCount(1);
		summary.setProWebCount(1);
		summary.setTestIntCount(1);
		summary.setTestTotalCount(1);
		summary.setTestWebCount(1);
		summary.setIntCount(1);
		summary.setTotalCount(1);
		summary.setWebCount(1);
		return summary;
	}

	public List<Organization> getOrgListByPage(Integer pageNum, Integer pageSize) {
		List<Organization> orgList = new ArrayList<Organization>();
		int startId = pageNum * pageSize;
		for (int i = startId; i < pageSize + startId; i++) {
			Organization org = this.demoGetOneOrg();
			org.setId(i + 1);
			org.setOrgName(org.getOrgName() + (i + 1));
			orgList.add(org);
			if (i >= 85) {
				break;
			}
		}
		return orgList;
	}

}
