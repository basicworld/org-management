<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div style="background-color: #fff;" class="">

	<div class="row">
		<form id="defaultForm" method="POST" action="/oms/orgs"
			class="form-horizontal">
			<!-- 操作区 -->
			<div id="operateArea" class="h40 pt5" style="background-color: #eee;">
				<!-- 页面参数保存 -->
				<div id="pageParm" value='{"pageNum": 0, "pageName": "org_insert"}'
					style="display: none"></div>
				<!-- 两个按钮区 -->
				<div id="leftWell" style="text-align: left;" class="col-sm-6"></div>
				<div id="rightWell" style="text-align: right;" class="col-sm-6">
					<button type='submit' class='btn btn-sm btn-primary' id='saveBtn'>
						<span class='glyphicon glyphicon-ok'></span> 保存
					</button>
					&nbsp;&nbsp;
					<button type='' class='btn btn-sm btn-default' id='refreshBtn'
						onclick='refresh()'>
						<span class='glyphicon glyphicon-remove'></span> 重置
					</button>
				</div>
			</div>

			<div class="form-group" style="display: none">
				<label for="id" class="col-sm-2 control-label">机构ID <em
					class="boldRed">*</em></label>
				<div class="col-sm-6">
					<input name="id" type="text" class="form-control input-sm" id="id"
						placeholder="机构ID" readonly value="0">
				</div>
			</div>
			<div class="form-group">
				<label for="orgName" class="col-sm-2 control-label">机构简称 <em
					class="boldRed">*</em></label>
				<div class="col-sm-6">
					<input name="orgName" type="text" class="form-control input-sm"
						id="orgName" placeholder="必填项，机构简称或产品简称">
				</div>
			</div>
			<div class="form-group">
				<label for="orgFullname" class="col-sm-2 control-label">机构全称
					<em class="boldRed">*</em>
				</label>
				<div class="col-sm-6">
					<input id="orgFullname" name="orgFullname" type="text"
						class="form-control input-sm" placeholder="必填项，工商注册公司名称">
				</div>
			</div>
			<div class="form-group">
				<label for="orgcode18" class="col-sm-2 control-label">统一社会信用代码
					<em class="boldRed">*</em>
				</label>
				<div class="col-sm-6">
					<input id="orgcode18" name="orgcode18" type="text"
						class="form-control input-sm" placeholder="必填项，工商注册统一社会信用代码，长度18位">
				</div>
			</div>
			<div class="form-group">
				<label for="orgcode9" class="col-sm-2 control-label">组织机构代码</label>
				<div class="col-sm-6">
					<input id="orgcode9" name="orgcode9" type="text"
						class="form-control input-sm" placeholder="无需填写，根据统一社会信用代码自动生成"
						readonly>
				</div>
			</div>
			<div class="form-group">
				<label for="gameMode" class="col-sm-2 control-label">接入方式</label>
				<div class="col-sm-2">
					<select id="gameMode" name="gameMode" class="form-control input-sm">
						<!-- option load from js -->
					</select>
				</div>
				<!-- </div> -->
				<!-- <div class="form-group"> -->
				<label for="gameStage" class="col-sm-2 control-label">接入阶段</label>
				<div class="col-sm-2">
					<select id="gameStage" name="gameStage"
						class="form-control input-sm">
						<!-- option load from js -->
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="address" class="col-sm-2 control-label">快件地址</label>
				<div class="col-sm-6">
					<input id="address" name="address" type="text"
						class="form-control input-sm" id=""
						placeholder="如需寄送合同、UKEY等请填写快递收货地址">
				</div>
			</div>
			<div class="form-group">
				<label for="testIp" class="col-sm-2 control-label">测试IP</label>
				<div class="col-sm-6">
					<input id="testIp" name="testIp" type="text"
						class="form-control input-sm" id=""
						placeholder="接口接入机构需提供白名单IP，示例：1.1.1.1,2.2.2.2">
				</div>
			</div>
			<div class="form-group">
				<label for="proIp" class="col-sm-2 control-label">生产IP</label>
				<div class="col-sm-6">
					<input id="proIp" name="proIp" type="text"
						class="form-control input-sm" id=""
						placeholder="接口接入机构需提供白名单IP，示例：1.1.1.1,2.2.2.2">
				</div>
			</div>
			<div class="form-group">
				<label for="name1" class="col-sm-2 control-label">联系人一</label>
				<div style="display: none">
					<input name="uid1" type="text" class="form-control input-sm"
						id="uid2" placeholder="联系人一ID" readonly value="0">
				</div>
				<label for="lastname" class="col-sm-1 control-label">姓名</label>
				<div class="col-sm-2">
					<input id="name1" name="name1" type="text"
						class="form-control input-sm" id="" placeholder=""> <span
						class="help-block" />
				</div>
				<label for="phone1" class="col-sm-1 control-label">电话</label>
				<div class="col-sm-2">
					<input id="phone1" name="phone1" type="text"
						class="form-control input-sm" id="" placeholder=""> <span
						class="help-block" />
				</div>
			</div>
			<div class="form-group">
				<label for="email1" class="col-sm-2 control-label"></label> <label
					for="email1" class="col-sm-1 control-label">邮箱</label>
				<div class="col-sm-5">
					<input id="email1" name="email1" type="text"
						class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="name2" class="col-sm-2 control-label">联系人二</label>
				<div style="display: none">
					<input name="uid2" type="text" class="form-control input-sm"
						id="uid2" placeholder="联系人二ID" readonly value="0">
				</div>
				<label for="lastname" class="col-sm-1 control-label">姓名</label>
				<div class="col-sm-2">
					<input id="name2" name="name2" type="text"
						class="form-control input-sm" id="" placeholder="">
				</div>
				<label for="phone2" class="col-sm-1 control-label">电话</label>
				<div class="col-sm-2">
					<input id="phone2" name="phone2" type="text"
						class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="email2" class="col-sm-2 control-label"></label> <label
					for="email2" class="col-sm-1 control-label">邮箱</label>
				<div class="col-sm-5">
					<input id="email2" name="email2" type="text"
						class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="regDate" class="col-sm-2 control-label">登记时间 <em
					class="boldRed">*</em></label>
				<div class="col-sm-6">
					<div class="input-group date form_date" data-date=""
						data-date-format="yyyy-mm-dd" data-link-field="dtp_input2"
						data-link-format="yyyy-mm-dd">
						<input id="regDate" name="regDate" class="form-control" size="16"
							type="text" value="" readonly> <span
							class="input-group-addon"> <span
							class="glyphicon glyphicon-remove"></span>
						</span> <span class="input-group-addon"> <span
							class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="note" class="col-sm-2 control-label">备注</label>
				<div class="col-sm-6">
					<textarea id="note" name="note" type="text" style="resize: none;"
						class="form-control input-sm" id="" placeholder=""></textarea>
				</div>
			</div>
		</form>
	</div>
</div>