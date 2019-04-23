package com.wlfei.mvc.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.wlfei.mvc.model.Contact;
import com.wlfei.mvc.service.ContactService;

public class ContactServiceImpl implements ContactService {

	public List<Contact> getContactListByOrgId(Integer orgId) {
		List<Contact> contactList = new ArrayList<Contact>();
		contactList.add(demoGetOneContact());
		return contactList;
	}

	public Integer saveContactReturnId(Contact contact) {
		
		return 11;
	}
	
	private Contact demoGetOneContact() {
		Contact contact = new Contact();
		contact.setId(11);
		contact.setOrgId(1);
		contact.setName("张三");
		contact.setPosition("程序员");
		contact.setPhone("15766669999");
		contact.setEmail("zhangsan@baidu.com");
		contact.setNote("技术对接人");
		return contact;
	}

}
