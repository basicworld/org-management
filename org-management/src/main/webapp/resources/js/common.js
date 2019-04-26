$(document).ready(function() {
	// 初次加载后，显示概览页--首页
	loadPage("summary", "#content");
	loadOrgCount();
	loadRecentOrgTable();
	// toastr
	toastr.options.positionClass = 'toast-bottom-right';
	// 
	toastr.info('欢迎登陆:' + "wlifei");
	
});

// 渲染操作区 主要是按钮
function wrapOperateArea(){
	console.log("in wrapOperateArea");
	// 获取参数 从#pageParm.attr("value")  json格式数据 
	// 例如 pageParm.pageType = "summary"; 就是渲染summary.jsp 的页面  pageParm.pageNum = 0; 表示没有分页
	var pageParm = JSON.parse($("#pageParm").attr("value"));
	console.log(pageParm.pageType);
	switch(pageParm.pageType)
	{
	case "summary":
		// 渲染左区 搜索按钮
		// 渲染右区 刷新按钮  保存按钮
		$("#rightWell").html("<button id='reloadBtn' class='btn btn-sm btn-default' onclick='reloadPage()'> <span class='glyphicon glyphicon-refresh'></span> 刷新 </button>");
		break;
	case "org_insert":
		$("#operateArea").attr("class", "h40 pt5"); // 解决宽度不一致问题
		// 渲染左区 搜索按钮
		// 渲染右区 刷新按钮  保存按钮
		$("#rightWell").html("<button type='submit' class='btn btn-sm btn-primary' id='saveBtn'><span class='glyphicon glyphicon-ok'></span> 保存</button> &nbsp;&nbsp; <button class='btn btn-sm btn-default' id='reloadBtn' onclick='reloadPage()'><span class='glyphicon glyphicon-remove'></span> 重置</button>");
		break;
	case "org_detail":
		// 渲染右区 刷新按钮  保存按钮
		$("#rightWell").html("<button class='btn btn-sm btn-default' id='editBtn' onclick='editPage()'><span class='glyphicon glyphicon-edit'></span> 编辑</button> &nbsp;&nbsp; <button class='btn btn-sm btn-primary' id='downloadBtn'><span class='glyphicon glyphicon-cloud-download'></span> 下载 </button>  &nbsp;&nbsp; <button class='btn btn-sm btn-primary' id='deleteBtn'><span class='glyphicon glyphicon-trash'></span> 删除 </button>");
		break;
	case "org_list":
		// 渲染左区 搜索按钮
		$("#leftWell").html("<div class='form-inline'> <div class='form-group'> <input type='text' class='form-control input-sm' id='searchParm' placeholder='机构名称/代码/IP'> </div> <button class='btn btn-sm btn-primary' id='searchBtn' onclick='searchOrg(this)'><span class='glyphicon glyphicon-search'></span> 搜索</button> </div>");
		// 渲染右区 刷新按钮  保存按钮
		$("#rightWell").html("<button id='reloadBtn' class='btn btn-sm btn-default' onclick='reloadPage()'> <span class='glyphicon glyphicon-refresh'></span> 刷新 </button>");
		break;
	default:
		break;
	}
	console.log("out wrapOperateArea");
}
// 页面刷新
function reloadPage(){
	// 获取参数 从#pageParm.attr("value")  json格式数据 
	var pageParm = JSON.parse($("#pageParm").attr("value"));
	switch(pageParm.pageType)
	{
	case "summary":
		loadOrgCount();
		loadRecentOrgTable();
		toastr.info('刷新成功');
		break;
	case "org_insert":
		// 加载一个空页面
		loadPage("org_insert","#content",initOrgInsertPage);
		toastr.info('重置成功');
		break;
	default:
		break;
	}
}
// 根据机构id获取机构
function getOrgById(id, callback){
	console.log("in getOrgById");
	var urlStr = window.location.protocol + "//" + window.location.host + "/org/queryById/";
	var pageNum = 1;
	$.ajax({
		method : "POST",
		url : urlStr,
		dataType: "json",
        data: { id: id },
		success : function(data, status, jqXHR) {
			if (typeof callback === "function"){
		        callback(data);
		    }
		}
	}); // end ajax
	console.log("out getOrgById");
}
// 渲染机构页面  org -- 机构var  pos--渲染的类型，val=value  text=text  patentId--渲染的父 div id
function wrapOrgPage(org, pos, parentId){
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
// 机构列表区页面跳转后页面的返回按钮 添加到操作区的leftWell
function wrapOperateAreaWithBtn(backPageInfo){
	console.log("in wrapOperateAreaWithBackBtn");
	$("#leftWell").html("<button id='backBtn' class='btn btn-sm btn-default' onclick='backToLastPage()'> <span class='glyphicon glyphicon-chevron-left'></span> 返回列表 </button>");
	$("#rightWell").html("<button type='submit' class='btn btn-sm btn-primary' id='saveBtn'><span class='glyphicon glyphicon-ok'></span> 保存</button></div>");
	console.log("out wrapOperateAreaWithBackBtn");
}
// 返回按钮动作
function backToLastPage(){
	$("#content").empty();
	loadPage("org_list","#content", initOrgListPage);
}
// 查看机构详情
function showDetail(e){
	toastr.info('showDetail');
	// 查询机构id
	var id = $(e).parent().parent().children("td.listId").text();
	// 查询本页面的pageParm
	var backPageInfo = JSON.parse($("#pageParm").attr("value"));
	// 加载一个空页面  回调加载数据 并加载按钮
	loadPage("org_detail","#content", function(){
		getOrgById(id, function(org){
			wrapOrgPage(org, "text", "#orgDetailTable");
		});
		wrapOperateAreaWithBtn(backPageInfo);
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
	loadPage("org_insert","#content", function(){
		getOrgById(id, function(org){
			wrapOrgPage(org, "val", "#defaultForm");
		});
		initOrgInsertPage(function(){
			backToLastPage();  // todo 待修改成提交保存 并返回到列表
			toastr.info('修改成功，返回到列表页面');
		});
		wrapOperateAreaWithBtn(backPageInfo);
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

// yyyy-mm-dd
function getNow() { 
	var date = new Date();
	var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d; 
 
};
// 加载机构列表 到 #wrapId
function wrapOrgList(data, wrapId, pageNum){
	pageNum = parseInt(pageNum);
	$(wrapId).empty();
	var orgList = data;
	var org;
	var actionHtml = "<a href='#' onclick='showDetail(this)'>详情</a> <a href='#' onclick='editOrg(this)'>编辑</a> <a href='#' onclick='delOrg(this)'>删除</a>";
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
	$("#reloadBtn").attr("pageNum", pageNum);
	if(pageNum==1){
		// 无上一页
		$("#prevPager").attr("class", "disabled");
		$("#prevPager").attr("onclick", "");
	}else{
		// 有上一页
		$("#prevPager").attr("class", "active");
		$("#prevPager").attr("onclick", "loadOrgTableByPage(" + (pageNum-1) + ")");
	}
	if(orgList.length < 20){
		// 无下一页
		$("#nextPager").attr("class", "disabled");
		$("#nextPager").attr("onclick", "");
	} else{
		// 有下一页
		$("#nextPager").attr("class", "active");
		$("#nextPager").attr("onclick", "loadOrgTableByPage(" + (pageNum +1) + ")");
	}
	
}
// 按条件搜索机构 刷新机构列表
function searchOrg(e){
	var urlStr = window.location.protocol + "//" + window.location.host + "/org/query/";
	var jsonData = {};
	jsonData["searchType"] = "parm.like(orgName,orgFullname,testIp,porIp)+page=list";  // 查询条件： 机构名称 或 ip，分页查询，返回list
	var pageParm = JSON.parse($("#pageParm").attr("value"));
	var pageNum = pageParm.pageNum;
	jsonData["page"] = pageNum;
	jsonData["parm"] = $("#searchParm").val();
	$.ajax({
		type : "POST",
		url : urlStr,
        data: JSON.stringify(jsonData),
        contentType:'application/json;charset=utf-8',
        async: true, 
		success : function(data, status, jqXHR) {
			wrapOrgList(data, "#orgTableBody", pageNum);
		}
	}); // end ajax
}
// 菜单栏点击后的动作--加载相应页面
function loadArea(e){
//	alert(e.getAttribute("value"));
	var navValue = e.getAttribute("value");
	switch(navValue)
	{
	case "org_insert":  // 需要初始化数据 js 和按钮
		loadPage(navValue,"#content", initOrgInsertPage);
		break;
	case "org_list":  // 需要初始化数据 js 和按钮
		loadPage(navValue,"#content", initOrgListPage);
		break;
	case "summary":  // 需要初始化数据 js 和按钮
		loadPage(navValue,"#content", initSummaryPage);
		break;
	default:
		loadPage(navValue,"#content");
	}
}
//  用模板渲染 areaId处的网页
// callback 函数，初始化js、页面按钮用
function loadPage(pageName, areaId, callback) {
	var urlStr = window.location.protocol + "//" + window.location.host
			+ "/org-man/template/" + pageName;
	$.ajax({
		method : "GET",
		url : urlStr,
		success : function(data, status, jqXHR) {
			$(areaId).html(data);  // 加载静态页面
			// 初始化js、页面按钮 等动态内容
			if (typeof callback === "function"){
		        callback();
		    }
		}
	}); // end ajax
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

//分页加载机构
function loadOrgTableByPage(pageNum) {
	pageNum = parseInt(pageNum);
	var urlStr = window.location.protocol + "//" + window.location.host
			+ "/org/query/page/"+pageNum;
	// alert(urlStr);
	$.ajax({
		method : "GET",
		url : urlStr,
		success : function(data, status, jqXHR) {
			wrapOrgList(data, "#orgTableBody", pageNum);
		}
	}); // end ajax
}
// //////////////////////content js start/////////////////////////////
// 加载机构汇总
function loadOrgCount() {
	console.log("in loadOrgCount");
	var urlStr = window.location.protocol + "//" + window.location.host
			+ "/org/summary";
	$.ajax({
		method : "GET",
		url : urlStr,
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
		}
	}); // end ajax
	console.log("out loadOrgCount");
}
// 加载近期添加机构
function loadRecentOrgTable(pageNum) {
	console.log("in loadRecentOrgTable");
	var urlStr = window.location.protocol + "//" + window.location.host
			+ "/org/query?top5";
	$.ajax({
		method : "GET",
		url : urlStr,
		success : function(data, status, jqXHR) {
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
		}
	}); // end ajax
	console.log("out loadRecentOrgTable");
}

// //////////////////////content js end/////////////////////////////
// 初始化新建机构页面
function initOrgInsertPage(callback){
	console.log("in initOrgInsertPage");
	// 设置页面参数
	var pageParm = {"pageType": "org_insert", "pageNum": 0};
	$("#pageParm").attr("value", JSON.stringify(pageParm));
	// 操作区
	wrapOperateArea();
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
function initOrgListPage() {
	// 设置页面参数
	var pageParm = {"pageType": "org_list", "pageNum": 1, "pageName": "org_list", "searchParm":""};
	$("#pageParm").attr("value", JSON.stringify(pageParm));
	// 加载操作区 按钮
	wrapOperateArea();
	// 获取机构列表
	loadOrgTableByPage(1);
	$('#searchBtn').trigger("click");
	$("#reloadBtn").click(function(){
		$('#searchBtn').trigger("click");
		toastr.info('刷新成功');
	});
}
// 
function initSummaryPage() {
	// 设置页面参数
	var pageParm = {"pageType": "summary", "pageNum": 0};
	$("#pageParm").attr("value", JSON.stringify(pageParm));
	// 加载操作区 按钮
	wrapOperateArea();
	// 加载数据
	loadOrgCount();
	loadRecentOrgTable();
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