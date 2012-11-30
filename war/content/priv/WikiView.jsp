<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="keyword" content="Note">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="cache-control" content="no-cache">
<title>My Notes</title>
<link type="text/css" rel="stylesheet" href="/style/common/base.css" />
<style type="text/css">
.DivTitle {
	font-size: 12px;
}
.DivAuthor {
	margin: 0px 0px 10px 0px;
}
.DivContent {
	margin: 0px auto;
	padding: 0px auto;
}
.DivPrePage {
	display: block;
	position: fixed;
	top: 50px;
	left: 0;
	float: left;
	min-height: 500px;
	width: 10%;
	height: 80%;
	padding-top: 200px;
	cursor: pointer;
	text-align: center;
	vertical-align: middle;
	z-index: 10;
}
.DivNextPage {
	display: block;
	position: fixed;
	top: 50px;
	right: 0;
	float: right;
	min-height: 500px;
	width: 10%;
	height: 80%;
	padding-top: 200px;
	cursor: pointer;
	text-align: center;
	vertical-align: middle;
	z-index: 10;
}
#ul_wikiList li {
	display: block;
	margin: 0px 0px 5px 0px;
	padding:0px 0px 10px 0px;
	border-bottom: 1px solid gray;
}
</style>

<script type="text/javascript">
function prePage() {
	var i = document.getElementById("pageIndex").value;
	i > 1 ? i-- : 1;
	location.href = "/priv/WikiView.do?pageIndex=" + i;
}
function nextPage() {
	var i = document.getElementById("pageIndex").value;
	var pageCount = document.getElementById("pageCount").value;
	i < pageCount ? i++ : pageCount;
	location.href = "/priv/WikiView.do?pageIndex=" + i;
}
</script>
</head>
<body>
	<input type="hidden" id="pageIndex" value="${pageIndex}"/>
	<input type="hidden" id="pageCount" value="${pageCount}"/>
	<jsp:include page="/common/Header.jsp"></jsp:include>
	<div class="ContentLayOut">
		<div class="Header" style="margin-bottom: 20px;">
			<b>My Wiki:</b>&nbsp;&nbsp;<a href="/priv/WikiEdit.do" style="float: right; margin-right: 50px;">Create a wik.</a>
			<hr/>
		</div>
		<ul id="ul_wikiList">
		<s:iterator value="wikiList" id="wiki">
			<li>
				<div class="DivTitle"><a href="/priv/Wiki.do?id=${id}"><s:property value="title"/></a></div>
				<div class="DivAuthor">by ${author} on ${createDate}</div>
				<div class="DivContent">${content}</div>
			</li>
		</s:iterator>
		</ul>
	</div>
	<div class="DivPrePage" onclick="prePage();" onmouseout='javascript:document.getElementById("PrePage").style.display="none"' onmouseover='javascript:document.getElementById("PrePage").style.display="inline"'>
		<span id="PrePage" style="width: 50px; display: none; font-size: 90px;font-weight:normal;font-style:normal;font-variant:normal; line-height: 160px; color: #ff4f73;">&lt;</span>
	</div>
	<div class="DivNextPage" onclick="nextPage();" onmouseout='javascript:document.getElementById("NextPage").style.display="none"' onmouseover='javascript:document.getElementById("NextPage").style.display="inline"'>
		<span id="NextPage" style="width: 50px; display: none; font-size: 90px;font-weight:normal;font-style:normal;font-variant:normal; line-height: 160px; color: #ff4f73;">&gt;</span>
	</div>
</body>
</html>