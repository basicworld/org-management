// 
$(document).ready(function() {
	toastr.options.positionClass = 'toast-bottom-right';
	// 初次加载后，显示概览页--首页
	loadPage("summary", "#content", function(){
		initSummaryPage();
		toastr.info('欢迎登陆:' + "wlifei");
	});
	
});
// 用模板渲染 areaId处的网页
// tag: CRUD
function loadPage(pageName, areaId, callback) {
	$.ajax({
		method : "GET",
		url : window.location.protocol + "//" + window.location.host + "/oms/page/" + pageName,
		async: false,
		data: {},
		success : function(data, status, jqXHR) {
			$(areaId).html(data);  // 加载静态页面
			if (typeof callback === "function"){
		        callback();
		    }
		},
		error: function(){
			toastr.error("loadPage error：服务器连接失败");
		}
	}); // end ajax
}

// 内容刷新 从页面的operatearea的隐藏div中获取页面信息，然后根据信息进行刷新
function refresh(){
	// 获取参数 从#pageParm.attr("value")  json格式数据 
	var pageParm = JSON.parse($("#pageParm").attr("value"));
	switch(pageParm.pageName)
	{
	case "summary":
		initSummaryPage();
		toastr.info('summary刷新成功');
		break;
	case "org_insert":
		// 加载一个空页面
		loadPage("org_insert","#content",initOrgInsertPage);
		toastr.info('org_insert重置成功');
		break;
	case "org_list":
		getOrgList(renderOrgListPage, 0);
		toastr.info('org_list刷新成功');
		break;
	default:
		toastr.info('refresh error: 刷新异常');
		break;
	}
}

// 渲染机构页面  org -- 机构var  pos--渲染的类型，val=value  text=text  patentId--渲染的父 div id
function renderOrgPage(org, pos, parentId){
	org = unpackOrgData(org);
	toastr.info(org["orgName"]);
	targetIds = ["orgName", "orgFullname", "orgcode18", "orgcode9", "gameMode", "gameStage", "testIp", "proIp", "name1", "phone1", "email1", "name2", "phone2", "email2", "regDate", "note",];
	for (var i=0; i< targetIds.length; i++){
		targetId = targetIds[i];
		if(pos == "val"){
			$(parentId).find("#" + targetId).val(org[targetId]);
			
		} else if(pos == "text"){
			$(parentId).find("#" + targetId).text(org[targetId]);
			
		}
	}
}
// 返回按钮动作
function backToLastPage(){
	$("#content").empty();
	loadPage("org_list","#content", initOrgListPage);
}
// 查看机构详情
function showOrgDetail(e){
	toastr.info('showOrgDetail');
	// 查询机构id
	var id = $(e).parent().parent().children("td.listId").text();
	// 加载一个空页面  回调加载数据 并加载按钮
	loadPage("org_detail","#content", function(){
		var pageParm = {"pageNum": 0, "pageName": "org_detail", "searchParm":id};
		$("#pageParm").attr("value", JSON.stringify(pageParm));
		getOrgList(function(pageParm, orgList){
			org = orgList[0];
			renderOrgPage(org, "text", "#orgDetailTable");
		});
	});
	
	
}
// 删除机构
function delOrg(e){
	toastr.error('delOrg');
}
// 修改机构 
function editOrg(e){
	// 查询机构id
	var id = $(e).parent().parent().children("td.listId").text();
	// 查询本页面的pageParm
	var backPageInfo = JSON.parse($("#pageParm").attr("value"));
	// 加载一个空页面  回调加载数据 并加载按钮
	loadPage("org_edit","#content", function(){
		getOrgById(id, function(org){
			renderOrgPage(org, "val", "#defaultForm");
		});
		initOrgInsertPage(function(){
			backToLastPage();  // todo 待修改成提交保存 并返回到列表
			toastr.info('修改成功，返回到列表页面');
		});
	});
}
// build org page form data 把联系人map组装为list
function buildOrgFormData(array){
	var contact1 = {};
	contact1['name']=array.name1; delete(array.name1);
	contact1['phone']=array.phone1; delete(array.phone1);
	contact1['email']=array.email1; delete(array.email1);
	var contact2 = {};
	contact2['name']=array.name2; delete(array.name2);
	contact2['phone']=array.phone2; delete(array.phone2);
	contact2['email']=array.email2; delete(array.email2);
	array["contactList"]=[];
	array["contactList"].push(contact1);
	array["contactList"].push(contact2);
	return array;
}
// unpack org page data 把联系人list 解包 为map
function unpackOrgData(org){
	if (org.contactList == "") {
		org.name1="";
		org.phone1="";
		org.email1="";
		org.name2="";
		org.phone2="";
		org.email2="";
		
	}else {
		contactList = org.contactList.reverse();
		if (contactList.length >0){
			contact1=contactList.pop();
			org.name1=contact1.name;
			org.phone1=contact1.phone;
			org.email1=contact1.email;
		}
		if (contactList.length >0){
			contact2=contactList.pop();
			org.name2=contact1.name;
			org.phone2=contact1.phone;
			org.email2=contact1.email;
		}
	}
	delete(org.contactList);
	return org;
}
// json 化form
function getFormData($form, callback) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
      indexed_array[n['name']] = n['value'];
    });
    if (typeof callback === "function"){
        callback(indexed_array);
    }

    return indexed_array;
}

// 获取时间 
// 返回时间字符串，格式：yyyy-mm-dd
function getNow() { 
	var date = new Date();
	var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d; 
 
};
// 加载机构列表 到机构列表页面用于org_list
function renderOrgListPage(pageParm, data){
	console.log("renderOrgListPage");
	$("#orgTableBody").empty(); // 清空数据
	var pageNum = parseInt(pageParm.pageNum);
	var orgList = data;
	var org;
	var actionHtml = "<a href='#' onclick='showOrgDetail(this)'>详情</a> <a href='#' onclick='editOrg(this)'>编辑</a> <a href='#' onclick='delOrg(this)'>删除</a>";
	for (var i = 0; i < orgList.length; i++) {
		org = orgList[i];
		var text = "<tr> <td class='listId'></td><td class='orgName'></td> <td class='orgFullname'></td><td class='orgcode18'></td> <td class='gameModeStage'></td> <td class='regDate'></td><td class='action'></td> </tr>";
		var trObj = $(text);
		$(".listId", trObj).text(org.id);
		$(".orgName", trObj).text(org.orgName);
		$(".orgFullname", trObj).text(org.orgFullname);
		$(".orgcode18", trObj).text(org.orgcode18);
		
		var gameMode = getConfig("gameMode", org.gameMode);
		var gameStage = getConfig("gameStage", org.gameStage);
		$(".gameModeStage", trObj).text(gameMode+ "-" + gameStage);
		
		$(".regDate", trObj).text(org.regDate);
		$(".action", trObj).html(actionHtml);
		$("#orgTableBody").append(trObj);
	} // end for
	// 如果当前页是第一页，则没有 上一页
	if(pageNum==1){
		// 无上一页
		$("#prevPager").attr("class", "disabled");
		$("#prevPager").attr("onclick", "");
	}else{
		// 有上一页
		$("#prevPager").attr("class", "active");
		$("#prevPager").attr("onclick", "getOrgList(renderOrgListPage, -1)");
	}
	// 如果返回机构数量小于pagesize=20，说明没有下一页
	// 存在一个bug：如果刚好返回20家机构而且没有下一家，下一页按钮也能触发，但是下一页是空的
	// 不解决，太复杂
	if(orgList.length < 20){
		// 无下一页
		$("#nextPager").attr("class", "disabled");
		$("#nextPager").attr("onclick", "");
	} else{
		// 有下一页
		$("#nextPager").attr("class", "active");
		$("#nextPager").attr("onclick", "getOrgList(renderOrgListPage, 1)");
	}
	$("#pageParm").attr("value", JSON.stringify(pageParm));  // 查询参数写回pageParm
	
}
// 按条件搜索机构 用于org_list
// 条件来自pageParm
// adder用来搜索别的页，搜索下一页adder=1  搜索上一页adder=-1
// 回调函数必须满足形式：callback(pageParm, request_return_data);
function getOrgList(callback, adder){
	console.log("getOrgList=" + $("#pageParm").attr("value"));
	var pageParm = JSON.parse($("#pageParm").attr("value"));
	if (typeof adder != "undefined"){
		pageParm.pageNum += parseInt(adder);
	}
	$.ajax({
		type : "GET",
		url : window.location.protocol + "//" + window.location.host + "/oms/orgs",
		async: true,
		data: pageParm,
		dataType: 'json',
		success : function(data, status, jqXHR) {
			if (typeof callback === "function"){
		        callback(pageParm, data);
		    }
		},
		error: function(){
			toastr.error("getOrgList error：服务器连接失败");
		}
	}); // end ajax
}

//  org list page search button action
function orgSearchBtnAction(){
	// 把查询参数写入到searchParm
	console.log("orgSrchBtnAction");
	var pageParm = JSON.parse($("#pageParm").attr("value"));
	pageParm.searchParm = $("#searchParm").val();
	$("#pageParm").attr("value", JSON.stringify(pageParm));
	getOrgList(renderOrgListPage); // 获取机构 加载机构到页面
}
// 菜单栏点击后的动作--加载相应页面
function navAction(e){
	var navValue = e.getAttribute("value");
	switch(navValue)
	{
	case "org_insert":  // 需要初始化数据 js 和按钮
		loadPage(navValue,"#content", initOrgInsertPage);
		break;
	case "org_list":  // 需要初始化数据 js 和按钮
		loadPage(navValue,"#content", function(){
			getOrgList(renderOrgListPage); // 获取机构 加载机构到页面
		});
		break;
	case "summary":  // 需要初始化数据 js 和按钮
		initSummaryPage();
		break;
	default:
		loadPage(navValue,"#content");
	}
}

// 导航栏动作
function clickHandler(e) {
	if (e.target instanceof HTMLUListElement)
		return;
	if (e.target instanceof HTMLLIElement)
		return;
	if (N) {
		N.className = "";
	}
	N = e.target.parentElement;
	N.className = "active";

}

// //////////////////////content js start/////////////////////////////
// 加载机构汇总信息
// CRUD
function loadSummary() {
	$.ajax({
		type : "GET",
		url : window.location.protocol + "//" + window.location.host + "/oms/summary",
		async: true,
		dataType: 'json',
		success : function(data, status, jqXHR) {
			var summary = data;
			$("#proIntCount").text(summary.proIntCount);
			$("#proWebCount").text(summary.proWebCount);
			$("#proTotalCount").text(summary.proTotalCount);
			$("#testIntCount").text(summary.testIntCount);
			$("#testWebCount").text(summary.testWebCount);
			$("#testTotalCount").text(summary.testTotalCount);
			$("#intCount").text(summary.intCount);
			$("#webCount").text(summary.webCount);
			$("#totalCount").text(summary.totalCount);
		},
		error: function(request) {  //失败的话
    		toastr.error('loadSummary error: 服务器连接失败');
    	},
	}); // end ajax
}

// //////////////////////content js end/////////////////////////////
// 初始化新建机构页面
function initOrgInsertPage(callback){
	console.log("in initOrgInsertPage");
	// 设置页面参数
	var pageParm = {"pageType": "org_insert", "pageNum": 0};
	$("#pageParm").attr("value", JSON.stringify(pageParm));
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
	            name1: {
	            	message: 'The value is not valid',
	            	validators: {
	                    stringLength: {
		                    min: 2,
		                    max: 10,
		                    message: '姓名长度应在2到10位之间'
		                },
	                }
	            },
	            name2: {
	            	message: 'The value is not valid',
	            	validators: {
	                    stringLength: {
		                    min: 2,
		                    max: 10,
		                    message: '姓名长度应在2到10位之间'
		                },
	                }
	            },
	            phone1: {
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
	            phone2: {
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
	            email1: {
	                validators: {
	                    emailAddress: {
	                        message: '邮箱地址不合法'
	                    }
	                }
	            },
	            email2: {
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
	        	data: JSON.stringify(getFormData($form, buildOrgFormData)),// 序列化表单值  
	        	contentType:'application/json;charset=utf-8',
	        	async: true,  
	        	error: function(request) {  //失败的话
	        		toastr.error('机构保存失败，请重试');
	        	},  
	        	success: function(data) {  //成功
	        		toastr.success('机构保存成功');
	        		if (typeof callback === "function"){
	    		        callback(data);
	    		    }
	        	}  
	        });
	    });
}

// summary 页面刷新： 加载空页面 加载数据
function initSummaryPage() {
	loadPage("summary", "#content", function(){
		var pageParm = JSON.parse($("#pageParm").attr("value"));
		loadSummary();
		getOrgList(function(pageParm, data){
			$("#recentOrgTableBody").empty();
			var orgList = data;
			var org;
			for (var i = 0; i < orgList.length; i++) {
				org = orgList[i];
				var text = "<tr> <td class='listId'></td> <td class='orgFullname'></td> <td class='gameModeStage'></td> <td class='regDate'></td> </tr>";
				var trObj = $(text);
				$(".listId", trObj).text(i+1);
				$(".orgFullname", trObj).text(org.orgFullname);
				$(".gameModeStage", trObj).text(org.gameMode+ " " + org.gameStage);
				$(".regDate", trObj).text(org.regDate);
				$("#recentOrgTableBody").append(trObj);
			} // end for
		});
	});
}

function getConfig(key, subKey){
	var configs = {
		"gameMode": {"1": "网页", "2": "接口"},
		"gameStage": {"2": "联调阶段", "3": "生产阶段", "1": "培训阶段"},
	};
	if (key != null && subKey !=null) {
		return configs[key][subKey];
		
	}else if(key != null){
		return configs[key];
		
	}else {
		return "";
	}
}