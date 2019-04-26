package com.wlfei.mvc.model;

// 查询条件bean
public class SearchBean {
	String searchType="";  // 查询条件
	@Override
	public String toString() {
		return "SearchBean [searchType=" + searchType + ", parm=" + parm + ", page=" + page + "]";
	}
	String parm="";  // 用户输入字段
	int page=-1;  // 分页用字段
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getParm() {
		return parm;
	}
	public void setParm(String parm) {
		this.parm = parm;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
}
