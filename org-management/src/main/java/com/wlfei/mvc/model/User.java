package com.wlfei.mvc.model;


/**
 * 系统用户
 * @author lenovo
 *
 */
public class User {
	private Integer id; // 用户id
	private String username; // 登陆用户名
	private String realname;  // 真实姓名
	private String password;  // 密码
	private String email;   // 邮件
	private String Position;  // 职务
	private String note;  // 备注
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", realname=" + realname + ", password=" + password
				+ ", email=" + email + ", Position=" + Position + ", note=" + note + "]";
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPosition() {
		return Position;
	}
	public void setPosition(String position) {
		Position = position;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
}
