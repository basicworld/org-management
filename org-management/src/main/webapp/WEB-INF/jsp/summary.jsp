<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div style="background-color: #fff;">
	<!-- 操作区 -->
	<%@ include file="operate_area.jsp"%>
	<div>
		<!-- 总体报表 -->
		<div>

			<table class="table table-condensed" id="summaryTable">
				<caption>总体数据</caption>
				<thead>
					<tr>
						<th>机构类型</th>
						<th>接口接入</th>
						<th>网页接入</th>
						<th>合计</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>生产接入机构</td>
						<td><em id="proIntCount"></em></td>
						<td><em id="proWebCount"></em></td>
						<td><em id="proTotalCount"></em></td>
					</tr>
					<tr>
						<td>测试接入机构</td>
						<td><em id="testIntCount"></em></td>
						<td><em id="testWebCount"></em></td>
						<td><em id="testTotalCount"></em></td>
					</tr>
					<tr>
						<td>合计</td>
						<td><em id="intCount"></em></td>
						<td><em id="webCount"></em></td>
						<td><em id="totalCount"></em></td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 近期机构列表 -->
		<table class="table table-condensed" id="recentOrgTable">
			<caption>近期添加机构</caption>
			<thead>
				<tr>
					<th>序号</th>
					<th>机构全称</th>
					<th>接入阶段</th>
					<th>接入日期</th>
				</tr>
			</thead>
			<tbody id="recentOrgTableBody">

			</tbody>
		</table>
		<!-- 模板 tr 隐藏的 -->
		<div id="orgTrTemplate" style="display: none">
			<tr>
				<td class="listId"></td>
				<td class="orgFullname"></td>
				<td class="gameModeStage"></td>
				<td class="regDate"></td>
			</tr>
		</div>
	</div>
</div>
<script>
	$(document).ready(function() {
		// 设置页面参数
		var pageParm = {"pageType": "summary", "pageNum": 0};
		$("#pageParm").attr("value", JSON.stringify(pageParm));
		// 加载操作区 按钮
		wrapOperateArea();
		// 加载数据
		loadOrgCount();
		loadRecentOrgTable();
	});
</script>