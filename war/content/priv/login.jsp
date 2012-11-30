<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Log in</title>

<link type="text/css" rel="stylesheet" href="/style/common/base.css" />
<style type="text/css">
.loginBar {
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	margin: 0px;
	padding: 0px;
	background-color: gray;
	color: white;
}
li {
	display: inline;
}
</style>
</head>
<body>
	<div class="loginBar">
		<div style="display: inline; position: relative; float: left;">
			<form method="post">
				<ul>
				<li>
					UserName:
					<input type="text" id="userName" name="userName" />
					&nbsp;
				</li>
				<li>
					PassWord:
					<input type="password" id="pwd" name="pwd" />
				</li>
				<li>
					<input type="submit" id="submit" value="Log In" />
				</li>
				</ul>
			</form>
		</div>
		<div style="display: inline; position: relative; float: right;">
			<ul>
				<li><input type="button" id="signup" value="Sign Up" onclick="javascript: location.href='/priv/SignUp.do'" /></li>
			</ul>
		</div>
	</div>
</body>
</html>