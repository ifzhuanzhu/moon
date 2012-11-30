<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Moon Light Box</title>
<style type="text/css">
body {
	background-color: rgb(172, 218, 229);/*#0066FF;*/
	font-size: 11px;
	margin: 0px;
	padding: 0px;
}
.HomeBody {
	background-image: url('images/home_groud.png');
	background-repeat: no-repeat;
	background-size: auto;
	background-position: 0px;
	background-attachment: scroll;
}
.Header {
	left: 0px;
	right: 0px;
	top: 0px;
	height: 40px;
	position: relative;
	padding-top: 10px;
	z-index: 105;
	font-size: 13px;
	font-weight: bold;
	font-family: "helvetica neue",arial,sans-serif;
	color: #524d4d;
	
}
.ContentLayOut {
	position: relative;
	min-width: 933px;
	margin: 0px auto 0px auto;
	padding: 0px;
	border-width: medium;
}
.ContentItem {
	width: 190px;
	position: absolute;
	background-color: #ffffff;
	box-shadow: 0px 1px 3px rgba(34,25,25,0.4);
	margin: 0px;
	padding: 15px 15px 0px 15px;
}
</style>
</head>
<body class="HomeBody">
<div class="Header">
	<div style="position:absolute; left:50%;">You come now.</div>

</div>
<div class="ContentLayOut" style="width: 1180px;">
	<div class="Container">
		<div class="ContentItem" style="left: 0px; top: 0px; height: 280px;"></div>
		<div class="ContentItem" style="left: 240px; top: 0px; height: 210px;"></div>
		<div class="ContentItem" style="left: 480px; top: 0px; height: 220px;"></div>
		<div class="ContentItem" style="left: 720px; top: 0px; height: 270px;"></div>
		<div class="ContentItem" style="left: 960px; top: 0px; height: 230px;"></div>
	</div>
</div>
</body>
</html>