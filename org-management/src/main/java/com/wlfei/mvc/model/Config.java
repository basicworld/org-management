package com.wlfei.mvc.model;

public class Config {
	private int id;
	private String key;
	private String subKey;
	private String value;
	private String note;
	@Override
	public String toString() {
		return "Config [id=" + id + ", key=" + key + ", subKey=" + subKey + ", value=" + value + ", note=" + note + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getSubKey() {
		return subKey;
	}
	public void setSubKey(String subKey) {
		this.subKey = subKey;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
}
