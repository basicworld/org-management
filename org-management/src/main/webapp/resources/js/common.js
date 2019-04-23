$(document).ready(function() {
	// 初次加载后，显示概览页--首页
	loadPage("summary", "#content");
	loadOrgCount();
	loadRecentOrgTable();
	// toastr
	toastr.options.positionClass = 'toast-bottom-right';
	
});
// json 化form
function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
      indexed_array[n['name']] = n['value'];
    });

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
			$("#orgTableBody").empty();
			var orgList = data;
			var org;
			for (var i = 0; i < orgList.length; i++) {
				org = orgList[i];
				var text = "<tr> <td class='listId'></td><td class='orgName'></td> <td class='orgFullname'></td><td class='orgcode18'></td> <td class='gameModeStage'></td> <td class='regDate'></td><td class='action'></td> </tr>";
				var trObj = $(text);
				$(".listId", trObj).text(i+1);
				$(".orgName", trObj).text(org.orgName);
				$(".orgFullname", trObj).text(org.orgFullname);
				$(".orgcode18", trObj).text(org.orgcode18);
				$(".gameModeStage", trObj).text(org.gameMode+ " " + org.gameStage);
				$(".regDate", trObj).text(org.regDate);
				$(".action", trObj).text("详情 编辑 删除");
				$("#orgTableBody").append(trObj);
			} // end for
			$("#orgTableBody").attr("pageNum", pageNum);
			$("#reloadBtn").attr("onclick", "loadOrgTableByPage(" + pageNum + ")");
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
	var urlStr = window.location.protocol + "//" + window.location.host
			+ "/org/query/page/"+pageNum;
	// alert(urlStr);
	$.ajax({
		method : "GET",
		url : urlStr,
		success : function(data, status, jqXHR) {
			$("#orgTableBody").empty();
			var orgList = data;
			var org;
			for (var i = 0; i < orgList.length; i++) {
				org = orgList[i];
				var text = "<tr> <td class='listId'></td><td class='orgName'></td> <td class='orgFullname'></td><td class='orgcode18'></td> <td class='gameModeStage'></td> <td class='regDate'></td><td class='action'></td> </tr>";
				var trObj = $(text);
				$(".listId", trObj).text(i+1);
				$(".orgName", trObj).text(org.orgName);
				$(".orgFullname", trObj).text(org.orgFullname);
				$(".orgcode18", trObj).text(org.orgcode18);
				$(".gameModeStage", trObj).text(org.gameMode+ " " + org.gameStage);
				$(".regDate", trObj).text(org.regDate);
				$(".action", trObj).text("详情 编辑 删除");
				$("#orgTableBody").append(trObj);
			} // end for
			$("#orgTableBody").attr("pageNum", pageNum);
			$("#reloadBtn").attr("onclick", "loadOrgTableByPage(" + pageNum + ")");
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
	console.log("in reloadHomePage");
	loadOrgCount();
	loadRecentOrgTable();
	console.log("out reloadHomePage");
}
// //////////////////////content js end/////////////////////////////
