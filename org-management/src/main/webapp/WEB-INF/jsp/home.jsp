<%@page import="com.fasterxml.jackson.annotation.JsonInclude.Include"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<!-- jquery -->
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery-1.11.3.min.js"></script>
<!-- common -->
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/common.js"></script>
<!-- Bootstrap -->
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/bootstrap-datetimepicker.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/bootstrapValidator.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/bootstrapValidator.zh-CN.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/toastr.min.js"></script>
<!-- css -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/bootstrap.min.css"
	type="text/css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/bootstrap-datetimepicker.min.css"
	type="text/css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/bootstrapValidator.css"
	type="text/css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/base.css"
	type="text/css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/toastr.css"
	type="text/css" />
<!-- HTML5 shim 和 Respond.js 是为了让 IE8 支持 HTML5 元素和媒体查询（media queries）功能 -->
<!-- 警告：通过 file:// 协议（就是直接将 html 页面拖拽到浏览器中）访问页面时 Respond.js 不起作用 -->
<!--[if lt IE 9]>
      <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
    <![endif]-->
<title>机构信息管理系统</title>
</head>
<body>
	<!-- 顶部导航栏 开始 -->
	<div>
		<%@ include file="header.jsp"%>
	</div>
	<!-- 顶部导航栏 结束 -->
	<div class="container">
		<div class="row" style="height: 100%;">
			<!-- 左侧导航栏开始 -->
			<div class="col-sm-2">
				<%@ include file="leftnav.jsp"%>
			</div>
			<!-- end class="col-sm-2" -->
			<!-- 左侧导航栏结束 -->

			<!-- 登陆参数保存 -->
			<div id="loginParm" value="{}" style="display: none"></div>
			<!-- 内容区开始 -->
			<div class="col-sm-10" id="content"></div>
			<!-- end class="col-sm-10" -->
			<!-- 内容区结束 -->
		</div>
		<!-- end class="row" -->
	</div>
	<!-- end class="container" -->
</body>
</html>