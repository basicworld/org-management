<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<ul class="nav nav-pills nav-stacked">
	<li class="active"><a href="#" value="summary" onclick="loadArea(this)">概览</a></li>
	<li><a href="#" value="org_list" onclick="loadArea(this)">机构列表</a></li>
	<li><a href="#" value="add_org" onclick="loadArea(this)">新建机构</a></li>
	<li><a href="#" value="user_setting" onclick="loadArea(this)">个人设置</a></li>
	<li><a href="#" value="admin_userlist" onclick="loadArea(this)">账号管理</a></li>
	<li><a href="#" value="admin_authority" onclick="loadArea(this)">权限管理</a></li>
</ul>
<script>
	// 导航栏动作
	var ul = document.querySelector("ul");
	var N = ul.firstElementChild;
	ul.addEventListener("click", clickHandler);
</script>