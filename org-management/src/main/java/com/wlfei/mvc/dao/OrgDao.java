package com.wlfei.mvc.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.wlfei.mvc.model.Organization;
import com.wlfei.mvc.model.Summary;
@Mapper
public interface OrgDao {
	// 获取机构汇总信息
	@Select(value="SELECT pi.proIntCount, pw.proWebCount, ti.testIntCount, tw.testWebCount, " + 
			"pi.proIntCount + pw.proWebCount  AS  proTotalCount," + 
			"ti.testIntCount + tw.testWebCount AS testTotalCount," + 
			"pi.proIntCount + ti.testIntCount  AS  intCount," + 
			"pw.proWebCount  + tw.testWebCount AS webCount," + 
			"pi.proIntCount + pw.proWebCount + ti.testIntCount + tw.testWebCount AS totalCount" + 
			" FROM (" + 
			"(SELECT COUNT(*) AS proIntCount FROM organization o WHERE o.game_stage=3 AND o.game_mode=2) pi," + 
			"(SELECT COUNT(*) AS proWebCount FROM organization o WHERE o.game_stage=3 AND o.game_mode=1) pw," + 
			"(SELECT COUNT(*) AS testIntCount FROM organization o WHERE o.game_stage=2 AND o.game_mode=2) ti," + 
			"(SELECT COUNT(*) AS testWebCount FROM organization o WHERE o.game_stage=2 AND o.game_mode=1) tw)")
	public Summary selectSummary();
	
	// 获取最近添加的N家机构
	@Select(value="SELECT id,org_name as orgName,org_fullname as orgFullname,orgcode9,orgcode18,game_mode as gameMode,game_stage as gameStage,test_ip as testIp,test_key as testKey,pro_ip as proIp,pro_key as proKey,address,reg_date as regDate,note "
			+ "FROM organization WHERE is_delete!=1 ORDER BY reg_date DESC LIMIT #{limitNum}")
	public List<Organization> selectRecentRegOrg(@Param("limitNum") Integer limitNum);
	
	// 新增机构  返回自增id
	@Options(useGeneratedKeys = true, keyProperty="id")
	@Insert(value="INSERT INTO organization(org_name,org_fullname,orgcode9,orgcode18,game_mode,game_stage,test_ip,test_key,pro_ip,pro_key,address,reg_date,note) " + 
			"VALUES(#{orgName},#{orgFullname},#{orgcode9},#{orgcode18},#{gameMode},#{gameStage},#{testIp},#{testKey},#{proIp},#{proKey},#{address},#{regDate},#{note})")
	void insertOrg(Organization org);
	
	// 修改机构  返回自增id
	@Options(useGeneratedKeys = true, keyProperty="id")
	@Update(value="update organization set org_name=#{orgName},org_fullname=#{orgFullname},orgcode9=#{orgcode9},orgcode18=#{orgcode18},game_mode=#{gameMode},game_stage=#{gameStage},test_ip=#{testIp},test_key=#{testKey},pro_ip=#{proIp},pro_key=#{proKey},address=#{address},reg_date=#{regDate},note=#{note} "
			+ "where id = #{id}")
	void updateOrg(Organization org);
	
	// 根据统一社会信用代码搜索机构
	@Select(value="SELECT id,org_name as orgName,org_fullname as orgFullname,orgcode9,orgcode18,game_mode as gameMode,game_stage as gameStage,test_ip as testIp,test_key as testKey,pro_ip as proIp,pro_key as proKey,address,reg_date as regDate,note "
			+ "FROM organization WHERE is_delete!=1 and orgcode18=#{orgcode18}")
	List<Organization> selectByOrgcode18(@Param("orgcode18") String orgcode18);
	
	// 根据数据库id搜索机构
	@Select(value="SELECT id,org_name as orgName,org_fullname as orgFullname,orgcode9,orgcode18,game_mode as gameMode,game_stage as gameStage,test_ip as testIp,test_key as testKey,pro_ip as proIp,pro_key as proKey,address,reg_date as regDate,note "
			+ "FROM organization WHERE is_delete!=1 and id=#{id}")
	List<Organization> selectById(@Param("id") Integer id);
	
	// 根据页码、页容量搜索机构 逆序输出-- 最新添加的机构在前面
	@Select(value="SELECT id,org_name as orgName,org_fullname as orgFullname,orgcode9,orgcode18,game_mode as gameMode,game_stage as gameStage,test_ip as testIp,test_key as testKey,pro_ip as proIp,pro_key as proKey,address,reg_date as regDate,note "
			+ "FROM organization WHERE is_delete!=1 ORDER BY id DESC limit #{offset}, #{pageSize}")
	List<Organization> selectByPage(@Param("offset") Integer offset, @Param("pageSize") Integer pageSize);

	@Select(value="SELECT id,org_name as orgName,org_fullname as orgFullname,orgcode9,orgcode18,game_mode as gameMode,game_stage as gameStage,test_ip as testIp,test_key as testKey,pro_ip as proIp,pro_key as proKey,address,reg_date as regDate,note "
			+ "FROM organization WHERE is_delete!=1 "
			+ "and (org_name like \"%\"#{kword}\"%\" or org_fullname like \"%\"#{kword}\"%\" or orgcode9 like \"%\"#{kword}\"%\" or orgcode18 like \"%\"#{kword}\"%\" or test_ip like \"%\"#{kword}\"%\" or pro_ip like \"%\"#{kword}\"%\") "
			+ "ORDER BY id DESC limit #{offset}, #{pageSize}")
	public List<Organization> selectByParmAndPage(@Param("kword") String kword, @Param("offset") Integer offset, @Param("pageSize") Integer pageSize);
}
