<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div style="background-color: #fff;"  class="">

	<div class="row">
		<form id="defaultForm" method="POST" action="/org/save" class="form-horizontal">
			<div class="h40 pt5 row" style="background-color: #ddd;">
				<div style="text-align:left;" class="col-sm-6"></div>
				<div style="text-align:right;" class="col-sm-6">
					<button style="" type="submit" class="btn btn-sm btn-primary" id="saveBtn">提交</button>
					&nbsp;&nbsp;
					<button style="" class="btn btn-sm btn-default" id="saveBtn"
						onclick="saveNewOrg(this)">重置</button>
				</div>
			</div>
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
					<input name="orgFullname" type="text" class="form-control input-sm" id="" placeholder="">
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
						<option value="">网页接入</option>
						<option value="">接口接入</option>
						<option value="">进登记</option>
					</select>
				</div>
<!-- 			</div> -->
<!-- 			<div class="form-group"> -->
				<label for="lastname" class="col-sm-2 control-label">接入阶段</label>
				<div class="col-sm-2">
					<select id="gameStage" name="gameStage"
						class="form-control input-sm">
						<option value="">培训阶段</option>
						<option value="">联调阶段</option>
						<option value="">生产阶段</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">测试IP</label>
				<div class="col-sm-6">
					<input name="ip" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">生产IP</label>
				<div class="col-sm-6">
					<input name="ip" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">联系人一</label> <label
					for="lastname" class="col-sm-1 control-label">姓名</label>
				<div class="col-sm-2">
					<input name="name" type="text" class="form-control input-sm" id="" placeholder="">
					<span class="help-block"/>
				</div>
				<label for="lastname" class="col-sm-1 control-label">电话</label>
				<div class="col-sm-2">
					<input name="phone" type="text" class="form-control input-sm" id="" placeholder="">
					<span class="help-block" />
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label"></label> <label
					for="lastname" class="col-sm-1 control-label">邮箱</label>
				<div class="col-sm-5">
					<input name="email" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label">联系人二</label> <label
					for="lastname" class="col-sm-1 control-label">姓名</label>
				<div class="col-sm-2">
					<input name="name" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
				<label for="lastname" class="col-sm-1 control-label">电话</label>
				<div class="col-sm-2">
					<input name="phone" type="text" class="form-control input-sm" id="" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-2 control-label"></label> <label
					for="lastname" class="col-sm-1 control-label">邮箱</label>
				<div class="col-sm-5">
					<input name="email" type="text" class="form-control input-sm" id="" placeholder="">
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
					<textarea name="note" type="text" style="resize: none;"
						class="form-control input-sm" id="" placeholder=""></textarea>
				</div>
			</div>
		</form>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function() {
// orgcode9 自动生成
$("#orgcode18").blur(function(){
	if($.trim(this.value).length == 18){
		$("#orgcode9").val($.trim(this.value).substring(8,17));
	}
}).keyup(function(){
	$(this).triggerHandler("blur");
}).focus(function(){
	$(this).triggerHandler("blur");
});
// 日期选择
$('.form_date').datetimepicker({
	language : 'zh-CN',
	weekStart : 1,
	todayBtn : 1,
	autoclose : 1,
	todayHighlight : 1,
	startView : 2,
	minView : 2,
	pickerPosition:'top-left',
	forceParse : 0
});
$("#regDate").val(getNow());  // yyyy-mm-dd
// 格式校验
$('#defaultForm')
    .bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	orgName: {
                message: 'The orgName is not valid',
                validators: {
                    notEmpty: {
                        message: '机构简称不能为空'
                    }
                }
            },
        	orgFullname: {
                message: 'The orgFullname is not valid',
                validators: {
                    notEmpty: {
                        message: '机构全称不能为空'
                    }
                }
            },
            
        	orgcode18: {
                message: 'The orgFullname is not valid',
                validators: {
                    notEmpty: {
                        message: '统一社会信用代码不能为空'
                    },
	                stringLength: {
	                    min: 18,
	                    max: 18,
	                    message: '统一社会信用代码必须为18位'
	                },
	                regexp: {
                        regexp: /^[a-zA-Z0-9]+$/,
                        message: '统一社会信用代码必须为英文字母和数字的组合，不能含有特殊字符'
                    }
                }
            },
            ip: {
            	message: 'The value is not valid',
            	validators: {
	                regexp: {
                        regexp: /^[0-9\.;]+$/,
                        message: '只能包含IP和英文分号，示例:1.1.1.1;2.2.2.2'
                    }
                }
            },
            name: {
            	message: 'The value is not valid',
            	validators: {
                    stringLength: {
	                    min: 2,
	                    max: 10,
	                    message: '姓名长度应在2到10位之间'
	                },
                }
            },
            phone: {
            	message: 'The value is not valid',
            	validators: {
	                regexp: {
                        regexp: /^[0-9\-]+$/,
                        message: '只能包含数字和英文短横线，示例:15611112222'
                    },
                    stringLength: {
	                    min: 6,
	                    max: 11,
	                    message: '号码长度应在6到11位之间'
	                },
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: '邮箱地址不合法'
                    }
                }
            },
        }
    })
    .on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        $.ajax({  
            type: $form.attr('method'),   //提交的方法
            url: $form.attr('action'), //提交的地址  
            data: JSON.stringify(getFormData($form)),// 序列化表单值  
            async: true,  
            error: function(request) {  //失败的话
                 toastr.error('机构保存失败，请重试');
            },  
            success: function(data) {  //成功
                 toastr.success('机构保存成功');
                 loadPage("add_org", "#content");
            }  
         });
    });
});
</script>