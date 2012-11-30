<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Note</title>

<link type="text/css" rel="stylesheet" href="/style/common/base.css" />

<style type="text/css">
</style>
</head>
<body>
	<jsp:include page="/common/Header.jsp"></jsp:include>
	<div class="ContentLayOut">
		<div class="ContentHeader" style="margin-bottom: 15px;">
			<h3>${ wiki.title }</h3>
			<hr/>
			<div style="display: inline; font-weight: normal;font-size: 11px;">
				by ${wiki.author} on ${wiki.createDate} &nbsp;&nbsp;
			</div>
			<span style="padding: 0 4px;">|</span>
			<a href="/priv/WikiEdit.do?id=${ id }">Edit</a>
		</div>
		<div style="">
			${ wiki.content }
		</div>
	</div>
</body>
</html>