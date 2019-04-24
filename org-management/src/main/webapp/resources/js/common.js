$(document).ready(function() {
	// 初次加载后，显示概览页--首页
	loadPage("summary", "#content");
	loadOrgCount();
	loadRecentOrgTable();
	// toastr
	toastr.options.positionClass = 'toast-bottom-right';
	
});
// 根据机构id获取机构
function getOrgById(id, callback){
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
}
// 渲染机构编辑页面
function wrapOrgPage(org){
	org = unpackOrgData(org);
	console.log(org.name1);
	$("#defaultForm").find("#orgName").val(org.orgName);
	$("#defaultForm").find("#orgFullname").val(org.orgFullname);
	$("#defaultForm").find("#orgcode18").val(org.orgcode18);
	$("#defaultForm").find("#orgcode9").val(org.orgcode9);
	$("#defaultForm").find("#gameMode").val(org.gameMode);
	$("#defaultForm").find("#gameStage").val(org.gameStage);
	$("#defaultForm").find("#testIp").val(org.testIp);
	$("#defaultForm").find("#proIp").val(org.proIp);
	$("#defaultForm").find("#name1").val(org.name1);
	$("#defaultForm").find("#phone1").val(org.phone1);
	$("#defaultForm").find("#email1").val(org.email1);
	$("#defaultForm").find("#name2").val(org.name2);
	$("#defaultForm").find("#phone2").val(org.phone2);
	$("#defaultForm").find("#email2").val(org.email2);
	$("#defaultForm").find("#regDate").val(org.regDate);
	$("#defaultForm").find("#note").val(org.note);
}
// 查看机构详情
function showDetail(e){
	// 查询机构id
	var id = $(e).parent().parent().children("td.listId").text();
	// 加载一个空页面
	loadPage("add_org","#content");
	alert("id=" + id);
	// 根据机构id获取机构信息 并渲染到空页面
	getOrgById(id, wrapOrgPage);
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
			console.log(contact1.email);
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
		$(".gameModeStage", trObj).text(org.gameMode+ " " + org.gameStage);
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
	console.log("in searchOrg");
	searchParm = $("#searchParm").val();
	var urlStr = window.location.protocol + "//" + window.location.host + "/org/query/";
	var pageNum = 1;
	$.ajax({
		method : "POST",
		url : urlStr,
		dataType: "json",
        data: { searchParm: searchParm },
		success : function(data, status, jqXHR) {
			wrapOrgList(data, "#orgTableBody", pageNum);
		}
	}); // end ajax
	console.log("out searchOrg");
}
// 菜单栏点击后加载相应页面
function loadArea(e){
//	alert(e.getAttribute("value"));
	var navValue = e.getAttribute("value");
	loadPage(navValue,"#content");
}
//  用模板渲染 areaId处的网页
function loadPage(pageName, areaId) {
	var urlStr = window.location.protocol + "//" + window.location.host
			+ "/org-man/template/" + pageName;
	$.ajax({
		method : "GET",
		url : urlStr,
		success : function(data, status, jqXHR) {
			var page = data;
			$(areaId).html(page);
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
// 触发刷新首页数据
function reloadHomePage() {
	loadOrgCount();
	loadRecentOrgTable();
	toastr.info('刷新成功');
}
// //////////////////////content js end/////////////////////////////
