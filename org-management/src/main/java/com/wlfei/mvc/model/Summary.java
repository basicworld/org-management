package com.wlfei.mvc.model;

/**
 * 简易报表
 * @author lenovo
 *
 */
public class Summary {
	int proIntCount;  // 生产接口接入
	int proWebCount;  // 生产web接入
	int proTotalCount;  // 生产总接入
	int testIntCount;  // 测试接口接入
	int testWebCount;  // 测试web接入
	int testTotalCount;  // 测试总接入
	int intCount;  // 接口总接入
	int webCount; // web总接入
	int totalCount;  // 接口+web总接入
	public int getProIntCount() {
		return proIntCount;
	}
	public void setProIntCount(int proIntCount) {
		this.proIntCount = proIntCount;
	}
	public int getProWebCount() {
		return proWebCount;
	}
	public void setProWebCount(int proWebCount) {
		this.proWebCount = proWebCount;
	}
	public int getProTotalCount() {
		return proTotalCount;
	}
	public void setProTotalCount(int proTotalCount) {
		this.proTotalCount = proTotalCount;
	}
	public int getTestIntCount() {
		return testIntCount;
	}
	public void setTestIntCount(int testIntCount) {
		this.testIntCount = testIntCount;
	}
	public int getTestWebCount() {
		return testWebCount;
	}
	public void setTestWebCount(int testWebCount) {
		this.testWebCount = testWebCount;
	}
	public int getTestTotalCount() {
		return testTotalCount;
	}
	public void setTestTotalCount(int testTotalCount) {
		this.testTotalCount = testTotalCount;
	}
	public int getIntCount() {
		return intCount;
	}
	public void setIntCount(int intCount) {
		this.intCount = intCount;
	}
	public int getWebCount() {
		return webCount;
	}
	public void setWebCount(int webCount) {
		this.webCount = webCount;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	
}
