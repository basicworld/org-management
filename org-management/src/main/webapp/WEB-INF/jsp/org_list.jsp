<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div style="background-color: #fff;">
	<!-- 操作区 -->
	<div id="operateArea" class="h40 pt5 row"
		style="background-color: #eee;">
		<!-- 页面参数保存 -->
		<div id="pageParm" value='{"pageNum": 1, "pageName": "org_list", "searchParm":""}' style="display: none"></div>
		<!-- 两个按钮区 -->
		<div id="leftWell" style="text-align: left;" class="col-sm-6">
			<div class='form-inline'> <div class='form-group'> <input type='text' class='form-control input-sm' id='searchParm' placeholder='机构名称/代码/IP'> </div> <button class='btn btn-sm btn-primary' id='searchBtn' onclick='orgSearchBtnAction()'><span class='glyphicon glyphicon-search'></span> 搜索</button> </div>
		</div>
		<div id="rightWell" style="text-align: right;" class="col-sm-6">
			<button id='reloadBtn' class='btn btn-sm btn-default' onclick='refresh()'> <span class='glyphicon glyphicon-refresh'></span> 刷新 </button>
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