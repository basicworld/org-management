<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div style="background-color: #fff;">
	<!-- 操作区 -->
	<%@ include file="operate_area.jsp"%>
	<div id="orgDetail" class="col-sm-10">
		<!-- 机构详细信息 -->
		<table class="table table-condensed table-bordered" id="orgDetailTable">
			<caption>机构详情</caption>
			<tbody>
				<tr><td bgcolor="#eee"><strong>机构简称</strong></td><td id="orgName"></td><td bgcolor="#eee"><strong>机构全称</strong></td><td id="orgFullname"></td></tr>
				<tr><td bgcolor="#eee"><strong>组织机构代码</strong></td><td id="orgcode9"></td><td bgcolor="#eee"><strong>统一社会信用代码</strong></td><td id="orgcode18"></td></tr>
				<tr><td bgcolor="#eee"><strong>接入阶段</strong></td><td><txt id="gameMode"></txt> <txt id="gameStage"></txt></td><td bgcolor="#eee"><strong>登记日期</strong></td><td id="regDate"></td></tr>
				<tr><td bgcolor="#eee"><strong>测试IP</strong></td><td id="testIp"></td><td bgcolor="#eee"><strong>测试KEY</strong></td><td id="testKey"></td></tr>
				<tr><td bgcolor="#eee"><strong>生产IP</strong></td><td id="proIp"></td><td bgcolor="#eee"><strong>生产KEY</strong></td><td id="proKey"></td></tr>
				<tr><td bgcolor="#eee"><strong>联系人</strong></td><td bgcolor="#eee"><strong>姓名/职务</strong></td><td bgcolor="#eee"><strong>电话</strong></td><td bgcolor="#eee"><strong>邮箱</strong></td></tr>
				<tr><td><strong>第一对接人</strong></td><td><txt id="name1"></txt> <txt id="position1"></txt></td><td id="phone1"></td><td id="email1"></td></tr>
				<tr><td><strong>第二对接人</strong></td><td><txt id="name2"></txt> <txt id="position2"></txt></td><td id="phone2"></td><td id="email2"></td></tr>
				<tr><td bgcolor="#eee"><strong>地址</strong></td><td colspan="3" id="address"></td></tr>
				<tr><td bgcolor="#eee"><strong>备注</strong></td><td colspan="3" id="note"></td></tr>
			</tbody>
		</table>
	</div>
</div>