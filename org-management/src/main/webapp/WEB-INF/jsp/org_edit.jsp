<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="org_insert.jsp"%>
<script>
	$("#leftWell").html("<button id='prevPageBtn' class='btn btn-sm btn-default' onclick='prevPageBtnAction()'> <span class='glyphicon glyphicon-chevron-left'></span> 返回列表 </button>");
	$("#rightWell").html("<button type='submit' class='btn btn-sm btn-primary' id='saveBtn'><span class='glyphicon glyphicon-ok'></span> 保存</button></div>");
	// restful api实现，使用put进行数据的更新
	$("#defaultForm").attr('method', 'PUT'); 
</script>