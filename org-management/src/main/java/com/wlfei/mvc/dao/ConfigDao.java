package com.wlfei.mvc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.StatementType;

import com.wlfei.mvc.model.Config;

// 配置信息接口
@Mapper
public interface ConfigDao {
	// 注意不要使用重载，mybatis处理不好 ：https://blog.csdn.net/unix21/article/details/52239514
	// 根据key获取value
	@Select(value="select s_key as `key`, s_sub_key as `subKey`, s_value as `value` from config where s_key=#{key}")
	public List<Config> getConfigWithOneKey(Config config);

	@Select(value="select s_key as `key`, s_sub_key as `subKey`, s_value as `value` from config where s_key=#{key} and s_sub_key=#{subKey}")
	public List<Config> getConfigWithTwoKey(Config config);
}
