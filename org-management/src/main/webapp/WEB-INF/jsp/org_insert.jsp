<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div style="background-color: #fff;"  class="">

	<div class="row">
		<form id="defaultForm" method="POST" action="/org/save" class="form-horizontal">
			<!-- 操作区 -->
			<%@ include file="operate_area.jsp"%>
			
			<div class="form-group">
				<label for="orgName" class="col-sm-2 control-label">机构简称 <em class="boldRed">*</em></label>
				<div class="col-sm-6">
					<input name="orgName" type="text" class="form-control input-sm"
						id="orgName" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">机构全称 <em class="boldRed">*</em></label>
				<div class="col-sm-6">
					<input id="orgFullname" name="orgFullname" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">统一社会信用代码 <em class="boldRed">*</em></label>
				<div class="col-sm-6">
					<input id="orgcode18" name="orgcode18" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">组织机构代码</label>
				<div class="col-sm-6">
					<input id="orgcode9" type="text" class="form-control input-sm"
						id="" placeholder="根据统一社会信用代码自动生成" readonly>
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">接入方式</label>
				<div class="col-sm-2">
					<select id="gameMode" name="gameMode" class="form-control input-sm">
						<option value="1">网页接入</option>
						<option value="2">接口接入</option>
						<option value="3">进登记</option>
					</select>
				</div>
<!-- 			</div> -->
<!-- 			<div class="form-group"> -->
				<label for="lastname" class="col-sm-2 control-label">接入阶段</label>
				<div class="col-sm-2">
					<select id="gameStage" name="gameStage"
						class="form-control input-sm">
						<option value="1">培训阶段</option>
						<option value="2">联调阶段</option>
						<option value="3">生产阶段</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">测试IP</label>
				<div class="col-sm-6">
					<input id="testIp" name="ip" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">生产IP</label>
				<div class="col-sm-6">
					<input id="proIp" name="ip" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">联系人一</label> <label
					for="lastname" class="col-sm-1 control-label">姓名</label>
				<div class="col-sm-2">
					<input id="name1" name="name1" type="text" class="form-control input-sm" id="" placeholder="">
					<span class="help-block"/>
				</div>
				<label for="lastname" class="col-sm-1 control-label">电话</label>
				<div class="col-sm-2">
					<input id="phone1" name="phone1" type="text" class="form-control input-sm" id="" placeholder="">
					<span class="help-block" />
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label"></label> <label
					for="lastname" class="col-sm-1 control-label">邮箱</label>
				<div class="col-sm-5">
					<input id="email1" name="email1" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">联系人二</label> <label
					for="lastname" class="col-sm-1 control-label">姓名</label>
				<div class="col-sm-2">
					<input id="name2" name="name2" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
				<label for="lastname" class="col-sm-1 control-label">电话</label>
				<div class="col-sm-2">
					<input id="phone2" name="phone2" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label"></label> <label
					for="lastname" class="col-sm-1 control-label">邮箱</label>
				<div class="col-sm-5">
					<input id="email2" name="email2" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">登记时间 <em class="boldRed">*</em></label>
				<div class="col-sm-6">
					<div class="input-group date form_date" data-date=""
						data-date-format="yyyy-mm-dd" data-link-field="dtp_input2"
						data-link-format="yyyy-mm-dd">
						<input id="regDate" name="regDate" class="form-control" 
						size="16" type="text" value=""
							readonly> 
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-remove"></span>
							</span> 
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
					</div>
					<input type="hidden" id="dtp_input2" value="" />
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">备注</label>
				<div class="col-sm-6">
					<textarea id="note" name="note" type="text" style="resize: none;"
						class="form-control input-sm" id="" placeholder=""></textarea>
				</div>
			</div>
		</form>
	</div>
</div>