package com.wlfei.mvc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.wlfei.mvc.model.Contact;

@Mapper
public interface ContactDao {
	// 查询机构联系人
	@Select(value="SELECT id, org_id AS orgId, s_name AS name, s_position AS position, s_phone AS phone, s_email AS email, s_note AS note  FROM contact WHERE is_delete != 1 AND org_id=#{orgId}")
	List<Contact> selectByOrgId(@Param("orgId") Integer orgId);
	
	// 新增机构联系人
	@Options(useGeneratedKeys = true, keyProperty="id")
	@Insert(value="INSERT INTO contact(org_id, s_name, s_position, s_phone, s_email, s_note) " + 
			"VALUES (#{orgId}, #{name}, #{position}, #{phone}, #{email}, #{note})")
	void insertContact(Contact contact);
	
	// 更新机构联系人
	@Options(useGeneratedKeys = true, keyProperty="id")
	@Update(value="update contact set org_id=#{orgId}, s_name=#{name}, s_position=#{position}, s_phone=#{phone}, s_email=#{email}, s_note=#{note} " + 
			"where id=#{id}")
	void updateContact(Contact contact);
}
