package com.wlfei.mvc.service;

import java.util.List;

import com.wlfei.mvc.model.Contact;

public interface ContactService {
	// 根据机构id获取联系人列表
	List<Contact> getContactListByOrgId(Integer orgId);
	// 报错联系人，返回id
	Integer saveContactReturnId(Contact contact);
}
