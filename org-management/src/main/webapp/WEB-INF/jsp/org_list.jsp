<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div style="background-color: #fff;">
	<!-- 操作区 -->
	<%@ include file="operate_area.jsp"%>
	<div id="orgList">
		<!-- 机构分页列表 -->
		<table class="table table-condensed" id="recentOrgTable">
			<caption>机构列表</caption>
			<thead>
				<tr>
					<th>ID</th>
					<th>机构简称</th>
					<th>机构全称</th>
					<th>统一社会信用代码</th>
					<th>接入阶段</th>
					<th>登记时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id="orgTableBody"></tbody>
		</table>
		<div id="pagerArea">
			<ul class="pager">
				<li id="prevPager" onclick="" class="disabled"><a href="#">上一页</a></li>
				<li id="nextPager" onclick="" class="disabled"><a href="#">下一页</a></li>
			</ul>
		</div>
	</div>
</div>