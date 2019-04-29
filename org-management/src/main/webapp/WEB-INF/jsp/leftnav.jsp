<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<ul class="nav nav-pills nav-stacked">
	<li class="active"  value="summary" onclick="navAction(this)"><a href="#"><span class='glyphicon glyphicon-home'></span>
			概览</a></li>
	<li value="org_list" onclick="navAction(this)"><a href="#"><span
			class='glyphicon glyphicon-list'></span> 机构列表</a></li>
	<li value="org_insert" onclick="navAction(this)"><a href="#"><span
			class='glyphicon glyphicon-file'></span> 新建机构</a></li>
	<li value="user_setting" onclick="navAction(this)"><a href="#">个人设置</a></li>
	<li value="admin_userlist" onclick="navAction(this)"><a href="#">账号管理</a></li>
	<li value="admin_authority" onclick="navAction(this)"><a href="#">权限管理</a></li>
</ul>
<script>
	// 导航栏动作只是动画效果 不包括数据加载动作
	var ul = document.querySelector("ul");
	var N = ul.firstElementChild;
	ul.addEventListener("click", clickHandler);
</script>