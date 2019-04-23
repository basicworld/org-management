<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div style="background-color: #fff;">
	<div class="h40 pt5 row" style="background-color: #ddd;">
		<div class="col-sm-8">
			<!-- 搜索区 -->
			<div class="form-inline">
				<div class="form-group">
					<input type="text" class="form-control input-sm" id="searchParm"
						placeholder="机构名称/代码/IP">
				</div>
				<button class="btn btn-sm btn-primary" id="searchBtn" onclick="searchOrg(this)">提交</button>
			</div>
		</div>
		<div class="col-sm-4 mt5">
			<!-- 刷新按钮 -->
			<a id="reloadBtn" href="#" style="float: right;" onclick=""> <span
				class="glyphicon glyphicon-repeat"></span> 刷新
			</a>
		</div>

	</div>
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
			<tbody id="orgTableBody" pageNum=""></tbody>
		</table>
		<div id="pagerArea">
			<ul class="pager">
				<li id="prevPager" onclick="" class="disabled"><a href="#">上一页</a></li>
				<li id="nextPager" onclick="" class="disabled"><a href="#">下一页</a></li>
			</ul>
		</div>
	</div>
</div>
<script>
	$(document).ready(function() {
		loadOrgTableByPage(1);
	});
</script>