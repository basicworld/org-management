package com.wlfei.mvc.model;

import java.util.List;

import org.springframework.beans.BeanUtils;

import com.wlfei.mvc.service.ConfigService;
import com.wlfei.mvc.service.impl.ConfigServiceImpl;

/**
 * 机构bean
 * @author wlfei
 *
 */
public class Organization {
	private ConfigService configService = new ConfigServiceImpl();
	int id;  // 数据库 id
	String orgName;  // 机构简称
	String orgFullname;  // 机构全称
	String orgcode9;  // 9 位机构代码
	String orgcode18; // 18 位机构代码
	int gameStage; // 接入阶段
	int gameMode; // 接入方式
	String testIp; // 测试ip
	String testKey; // 测试Key
	String proIp; // 生产ip
	String proKey; // 生产Key
	List<Contact> contactList; // 机构联系人
	String regDate; // 登记时间
//	boolean isDelete; // 删除标记  0 未删除 1 删除
	String note; //备注
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getOrgFullname() {
		return orgFullname;
	}
	public void setOrgFullname(String orgFullname) {
		this.orgFullname = orgFullname;
	}
	public String getOrgcode9() {
		return orgcode9;
	}
	public void setOrgcode9(String orgcode9) {
		this.orgcode9 = orgcode9;
	}
	public String getOrgcode18() {
		return orgcode18;
	}
	public void setOrgcode18(String orgcode18) {
		this.orgcode18 = orgcode18;
	}
	public int getGameStage() {
		return gameStage;
	}
	public void setGameStage(int gameStage) {
		this.gameStage = gameStage;
	}
	public int getGameMode() {
		return gameMode;
	}
	public void setGameMode(int gameMode) {
		this.gameMode = gameMode;
	}
	public String getTestIp() {
		return testIp;
	}
	public void setTestIp(String testIp) {
		this.testIp = testIp;
	}
	public String getTestKey() {
		return testKey;
	}
	public void setTestKey(String testKey) {
		this.testKey = testKey;
	}
	public String getProIp() {
		return proIp;
	}
	public void setProIp(String proIp) {
		this.proIp = proIp;
	}
	public String getProKey() {
		return proKey;
	}
	public void setProKey(String proKey) {
		this.proKey = proKey;
	}
	public List<Contact> getContactList() {
		return contactList;
	}
	public void setContactList(List<Contact> contactList) {
		this.contactList = contactList;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	@Override
	public String toString() {
		return "Organization [id=" + id + ", orgName=" + orgName + ", orgFullname=" + orgFullname + ", orgcode9="
				+ orgcode9 + ", orgcode18=" + orgcode18 + ", gameStage=" + gameStage + ", gameMode=" + gameMode
				+ ", testIp=" + testIp + ", testKey=" + testKey + ", proIp=" + proIp + ", proKey=" + proKey
				+ ", contactList=" + contactList + ", regDate=" + regDate + ", note=" + note + "]";
	}
	
}
