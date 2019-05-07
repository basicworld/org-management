package com.wlfei.mvc.model;

/**
 * 联系人bean
 * @author wlfei
 *
 */
public class Contact {
	
	int id = -1;  // 数据库 id
	int orgId = -1;  // 机构id
	String name = "";  //姓名
	String position = ""; // 职务
	String phone = "";  // 电话
	String email = "";  // 邮箱
	String note = "";  // 备注
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOrgId() {
		return orgId;
	}
	public void setOrgId(int orgId) {
		this.orgId = orgId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	@Override
	public String toString() {
		return "Contact [id=" + id + ", orgId=" + orgId + ", name=" + name + ", position=" + position + ", phone="
				+ phone + ", email=" + email + ", note=" + note + "]";
	}
}
