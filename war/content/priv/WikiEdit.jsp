<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Wiki Edit</title>

<link type="text/css" rel="stylesheet" href="/style/common/base.css" />
<style type="text/css">
body {
	/* background-color: rgb(172, 218, 229); */
	color: #333;
}
</style>

<script type="text/javascript" src="/js/nicEdit/nicEdit.js"></script>
<script type="text/javascript">
//<![CDATA[
bkLib.onDomLoaded(function() {
new nicEditor(
		{buttonList : ['fontSize','bold','italic','underline','strikeThrough','subscript','superscript','html','image']}).panelInstance('content');
});
//]]>
</script>
</head>
<body>
	<jsp:include page="/common/Header.jsp"></jsp:include>
	<div class="ContentLayOut">
		<p style="font-weight: bold;">Create a wiki.</p><hr/>
		
		<form action="WikiEdit!save.do" method="post">
			<input type="hidden" id="id" name="id" value="${id}" />
			<table>
				<tr>
					<td style="text-align: right; font-weight: bold;">Title:</td>
					<td><input type="text" id="title" name="title" value="${ title }" style="width: 500px;" /></td>
				</tr>
				<tr>
					<td style="vertical-align: top; text-align: right; font-weight: bold;">Body:</td>
					<td>
						<textarea id="content" name="content" rows="20" style="width: 500px;">${ content }</textarea>
					</td>
				</tr>
				<tr>
					<td style="text-align: right; font-weight: bold;">Tags:</td>
					<td><input type="text" id="tags" name="tags" value="${ tags }" style="width: 500px;" /></td>
				</tr>
				<tr>
					<td></td>
					<td>
					<input type="submit" id="submit" value="save" />
					</td>
				</tr>
			</table>
		</form>
		<br/>
		<s:iterator value="wikiMap" id="wk">
			${wk.key} : ${wk.value}<br/>
		</s:iterator>
	
	</div>
</body>
</html>