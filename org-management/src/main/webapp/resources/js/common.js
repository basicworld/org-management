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
	console.log("refresh:"+pageParm.pageName);
	switch(pageParm.pageName)
	{
	case "summary":
		initSummaryPage();
		toastr.info('summary刷新成功');
		break;
	case "org_insert":
//		document.getElementById("defaultForm").reset()
		// 加载一个空页面
		loadPage("org_insert","#content", function(){
			initOrgInsertPage(refresh);
		});
//		loadPage("org_insert","#content", initOrgInsertPage);
//		toastr.info('org_insert重置成功');
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
//	toastr.info("加载机构信息："+org["orgName"]);
	targetIds = ["id", "orgName", "orgFullname", "orgcode18", "orgcode9", "gameMode", "gameStage", "testIp", "proIp", "uid1", "name1", "phone1", "email1", "uid2", "name2", "phone2", "email2", "regDate", "note","address"];
	for (var i=0; i< targetIds.length; i++){
		targetId = targetIds[i];
		if(pos == "val"){
			$(parentId).find("#" + targetId).val(org[targetId]);
			
		} else if(pos == "text"){
			if (targetId == "gameMode"){org[targetId] = getConfig("gameMode", org[targetId]);}
			if (targetId == "gameStage"){org[targetId] = getConfig("gameStage", org[targetId]);}
			$(parentId).find("#" + targetId).text(org[targetId]);
			
		}
	}
}
// 机构详情、机构编辑页面的 返回按钮动作
function prevPageBtnAction(){
	$("#content").empty();
	loadPage("org_list","#content", function(){
		getOrgList(renderOrgListPage); // 获取机构 加载机构到页面
	});
}
// 查看机构详情
function showOrgDetail(e){
	// 查询机构id
	var id = parseInt($(e).attr("orgId"));
	// 加载一个空页面  回调加载数据
	loadPage("org_detail","#content", function(){
		var pageParm = {"pageNum": 0, "pageName": "org_detail", "searchParm":id};
		$("#pageParm").attr("value", JSON.stringify(pageParm));
		$("#editBtn").attr("orgid", id);
		$("#downloadBtn").attr("orgid", id);
		$("#deleteBtn").attr("orgid", id);
		getOrgList(function(pageParm, orgList){
			org = orgList[0];
			renderOrgPage(org, "text", "#orgDetailTable");
		});
	});
	
	
}
// 删除机构
// e=this
// confirm 确认标记 true/false/null 如果确认 再真正执行删除  没有确认标记只进行删除警告
// callback 删除之后的动作
function delOrg(e, confirm, callback){
	var pageParm = JSON.parse($("#pageParm").attr("value"));
	// 查询机构id
	var id = parseInt($(e).attr("orgId"));
	// 如果第一次点击删除按钮，则标记为待删除 
	if (typeof confirm == "undefined" || confirm == false){
		// 机构列表页面的删除，删除后刷新页面
		if (pageParm.pageName == "org_list"){
			$(e).attr("onclick", 'delOrg(this, true, refresh)');
			$(e).parents("tr").first().addClass("text-danger text-bold");
		}
		// 机构详情页面的删除，删除后返回到机构列表
		if (pageParm.pageName == "org_detail"){
			$(e).attr("onclick", 'delOrg(this,true,prevPageBtnAction)');
			$("tbody").addClass("text-danger text-bold");
		}
		toastr.error('再次点击删除按钮执行删除');
	} else if( confirm == true ){ // 真正执行删除
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
		toastr.error("删除成功");
		if(typeof callback == 'function' ){
			callback();
		}
	}
}
// 修改机构 
function editOrg(e){
	// 查询机构id
	var id = parseInt($(e).attr("orgId"));
	// 加载一个空页面  回调加载数据
	loadPage("org_edit","#content", function(){
		// 初始化新建机构页面的js动作，回调函数是保存按钮提交后的动作
		initOrgInsertPage(function(){  
			loadPage("org_list","#content", function(){ 
				getOrgList(renderOrgListPage); // 获取机构 加载机构到页面
			});
		});
		// 构建查询参数 查询机构信息后渲染到机构编辑页面
		var pageParm = {"pageNum": 0, "pageName": "org_edit", "searchParm":id};
		$("#pageParm").attr("value", JSON.stringify(pageParm));
//		toastr.info("editOrg:"+JSON.stringify(pageParm));
		getOrgList(function(pageParm, orgList){
			org = orgList[0];
			renderOrgPage(org, "val", "#defaultForm");
		});
	});
	
}
// build org page form data 把联系人map组装为list
function buildOrgFormData(array){
	var contact1 = {};
	contact1['name']=array.name1; delete(array.name1);
	contact1['phone']=array.phone1; delete(array.phone1);
	contact1['email']=array.email1; delete(array.email1);
	contact1['id']=array.uid1; delete(array.uid1);
	contact1['orgId']=array.id;
	var contact2 = {};
	contact2['name']=array.name2; delete(array.name2);
	contact2['phone']=array.phone2; delete(array.phone2);
	contact2['email']=array.email2; delete(array.email2);
	contact2['id']=array.uid2; delete(array.uid2);
	contact2['orgId']=array.id;
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
		org.uid1="";
		org.name2="";
		org.phone2="";
		org.email2="";
		org.uid2="";
		
	}else {
		contactList = org.contactList.reverse();
		if (contactList.length >0){
			contact1=contactList.pop();
			org.name1=contact1.name;
			org.phone1=contact1.phone;
			org.email1=contact1.email;
			org.uid1=contact1.id;
		}
		if (contactList.length >0){
			contact2=contactList.pop();
			org.name2=contact2.name;
			org.phone2=contact2.phone;
			org.email2=contact2.email;
			org.uid2=contact2.id;
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
function renderOrgListPage(pageParm, orgList){
	console.log("renderOrgListPage orgList.length=" + orgList.length);
	$("#orgTableBody").empty(); // 清空数据
	var pageNum = parseInt(pageParm.pageNum);
	var org;
	var actionHtml = "<div><a href='#' onclick='showOrgDetail(this)' orgId=''> 详情</a> <a href='#' onclick='editOrg(this)' orgId=''> 编辑</a> <a href='#' onclick='delOrg(this)' orgId=''> 删除</a></div>";
	for (var i = 0; i < orgList.length; i++) {
		org = orgList[i];
		var text = "<tr> <td class='orgId'></td><td class='orgName'></td> <td class='orgFullname'></td><td class='orgcode18'></td> <td class='gameStage'></td> <td class='regDate'></td><td class='action'></td> </tr>";
		var trObj = $(text);
		$(".orgId", trObj).text(org.id);
		$(".orgName", trObj).text(org.orgName);
		$(".orgFullname", trObj).text(org.orgFullname);
		$(".orgcode18", trObj).text(org.orgcode18);
		
//		var gameMode = getConfig("gameMode", org.gameMode);
		var gameStage = getConfig("gameStage", org.gameStage);
		$(".gameStage", trObj).text(gameStage);
		
		$(".regDate", trObj).text(org.regDate);
		
		// 操作按钮配置
		var actionObj = $(actionHtml).find("a").each(function(i,e){$(e).attr("orgId", org.id)});
		$(".action", trObj).html(actionObj);
		
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
		loadPage(navValue,"#content", function(){
			initOrgInsertPage(refresh);
		});
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
// 初始化新建机构页面的js动作
function initOrgInsertPage(callback){
	var pageParm = JSON.parse($("#pageParm").attr("value"));
	// 构建select
	var gameModes = getConfig("gameMode");
	for(key in gameModes){
		var text = '<option value=""></option>';
		var optionObj = $(text);
		optionObj.attr("value", key);
		optionObj.text(gameModes[key]);
		$('select[name="gameMode"]').append(optionObj);
	}
	var gameStages = getConfig("gameStage");
	for(key in gameStages){
		var text = '<option value=""></option>';
		var optionObj = $(text);
		optionObj.attr("value", key);
		optionObj.text(gameStages[key]);
		$('select[name="gameStage"]').append(optionObj);
	}
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
		                remote: {
		                	type: 'GET',
		                	url: window.location.protocol + "//" + window.location.host + "/oms/orgcheck",
		                	message: '统一社会信用代码重复，无法提交',
		                	data: {
		                		checkValue: function() {
	                              return $('input[name="orgcode18"]').val();
	                              },
	                            checkType: "orgcode18",
	                            id: function() {
		                              return $('input[name="id"]').val();
	                              },
	                        },
		                	delay: 1000,
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
	        	async: true,  
	        	data: {
	        		_method: $form.attr('method'),
	        		'orgList': JSON.stringify([getFormData($form, buildOrgFormData)]),
	        	},// 序列化表单值  
	        	dataType: 'json',
	        	success: function(data) {  //成功
	        		toastr.success('机构保存成功');
	        		if (typeof callback === "function"){
	        			callback(data);
	        		}
	        	}, 
	        	error: function(request) {  //失败的话
	        		toastr.error('机构保存失败，请重试');
	        	},  
	        });
	    });
}

// summary 页面刷新： 加载空页面 加载数据
function initSummaryPage() {
	loadPage("summary", "#content", function(){
		var pageParm = JSON.parse($("#pageParm").attr("value"));
		// 机构汇总信息
		loadSummary();
		// 近期添加的机构
		getOrgList(function(pageParm, data){
			$("#recentOrgTableBody").empty();
			var orgList = data;
			var org;
			for (var i = 0; i < orgList.length; i++) {
				org = orgList[i];
				var text = "<tr> <td class='listId'></td> <td class='orgName'></td> <td class='orgFullname'></td> <td class='gameStage'></td> <td class='regDate'></td> </tr>";
				var trObj = $(text);
				$(".listId", trObj).text(org.id);
				$(".orgName", trObj).text(org.orgName);
				$(".orgFullname", trObj).text(org.orgFullname);
				$(".gameStage", trObj).text(getConfig("gameStage", org.gameStage));
				$(".regDate", trObj).text(org.regDate);
				$("#recentOrgTableBody").append(trObj);
			} // end for
		});
	});
}

function getConfig(key, subKey){
	var configs = {};
	$.ajax({
		type : "GET",
		url : window.location.protocol + "//" + window.location.host + "/oms/config",
		async: true,
		data: {"key": key, "subKey":subKey},
		dataType: 'json',
		success : function(data, status, jqXHR) {
			for (conf in data){
				conf
			};
		},
		error: function(){
			toastr.error("getOrgList error：服务器连接失败");
		}
	}); // end ajax
	var configs = {
		"gameMode": {"1": "网页", "2": "接口", "3":"业务发生机构", "99":"未确定"},
		"gameStage": { "1": "培训阶段", "2": "联调阶段", "3": "生产阶段", "99":"退出接入"},
	};
	if (key != null && subKey !=null) {
		return configs[key][subKey];
		
	}else if(key != null){
		return configs[key];
		
	}else {
		return "";
	}
}