<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>My Priv</title>
<link type="text/css" rel="stylesheet" href="/style/common/base.css" />

<style type="text/css">
body {
	margin: 0;
	padding: 0;
}
</style>
<script type="text/javascript">
function ajaxTest() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "/priv/AjaxTest.do", false);
	xmlHttp.send();
	document.getElementById("ajaxResult").innerHTML = xmlHttp.responseText;
	alert(xmlHttp.responseText);
}

function jsonTest() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "/ajax/JasonTest.do", false);
	xmlHttp.send();
	document.getElementById("ajaxResult").innerHTML = xmlHttp.responseText;
	alert(xmlHttp.responseText);
}

function AddMessage() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/ajax/Message!insert.do", false);
	var queryStr = "message="+document.getElementById("text_msg").value;
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
	xmlHttp.send(queryStr);
	var responseJson = eval("["+xmlHttp.responseText+"]");
	var li = document.createElement("li");
	li.innerText = responseJson[0].msg.message;
	var ul = document.getElementById("ul_homestream")
	ul.insertBefore(li, ul.firstChild);
	//alert(responseJson);
}
</script>
</head>
<body>
<jsp:include page="/common/Header.jsp"></jsp:include>
<div class="ContentLayOut">
	<div style="margin-left: 5px;">
		My HomePage!
		<div id="div_msg" style="width: 300px;">
			<textarea id="text_msg" placeholder="What's on your mind?" style="width: 100%;"></textarea>
			<div style="text-align: right;">
				<input type="button" id="btn_ajax" value="post" onclick="AddMessage()" />
			</div>
		</div>
		<div id="homecontent">
			<ul id="ul_homestream"></ul>
		</div>
	</div>
</div>
</body>
</html>