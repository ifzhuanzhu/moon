<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>

<style type="text/css">
ul {
	display: block;
	font-family: 'Microsoft Yahei', Tahoma;
	font-size: 12px;
	height: 197px;
	line-height: 15px;
	list-style-type: disc;
	margin-bottom: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	padding-bottom: 0px;
	padding-left: 0px;
	padding-right: 0px;
	padding-top: 0px;
	width: 270px;
}
li {
display: list-item;
font-family: 'Microsoft Yahei', Tahoma;
font-size: 12px;
height: 73px;
line-height: 15px;
list-style-image: none;
list-style-position: outside;
list-style-type: none;
margin-bottom: 0px;
margin-left: 0px;
margin-right: 0px;
margin-top: 0px;
padding-bottom: 0px;
padding-left: 0px;
padding-right: 0px;
padding-top: 0px;
position: relative;
text-align: -webkit-auto;
width: 270px;
}
.labeltxtdefault {
color: #666;
cursor: text;
display: block;
font-family: 'Microsoft Yahei';
font-size: 15px;
height: 19px;
left: 15px;
line-height: 19px;
list-style-image: none;
list-style-position: outside;
list-style-type: none;
position: absolute;
text-align: -webkit-auto;
top: 17px;
width: 219px;
}
.input_txt {
-webkit-appearance: none;
-webkit-rtl-ordering: logical;
-webkit-user-select: text;
background-color: white;
border-bottom-color: #D9D9D9;
border-bottom-left-radius: 3px;
border-bottom-right-radius: 3px;
border-bottom-style: solid;
border-bottom-width: 1px;
border-left-color: #D9D9D9;
border-left-style: solid;
border-left-width: 1px;
border-right-color: #D9D9D9;
border-right-style: solid;
border-right-width: 1px;
border-top-color: #D9D9D9;
border-top-left-radius: 3px;
border-top-right-radius: 3px;
border-top-style: solid;
border-top-width: 1px;
color: #666;
cursor: auto;
display: inline-block;
font-family: 'Microsoft Yahei';
font-size: 15px;
font-weight: normal;
height: 19px;
letter-spacing: normal;
line-height: normal;
list-style-image: none;
list-style-position: outside;
list-style-type: none;
margin-bottom: 20px;
margin-left: 0px;
margin-right: 0px;
margin-top: 0px;
padding-bottom: 16px;
padding-left: 14px;
padding-right: 0px;
padding-top: 16px;
text-align: -webkit-auto;
text-indent: 0px;
text-shadow: none;
text-transform: none;
width: 254px;
word-spacing: 0px;
}
.SignUpBtn {
color: black;
cursor: pointer;
display: inline-block;
font-family: Arial;
/*font-size: 0px;*/
font-weight: normal;
height: 48px;
letter-spacing: normal;
line-height: 150px;
list-style-image: none;
list-style-position: outside;
list-style-type: none;
margin-bottom: 0px;
margin-left: 0px;
margin-right: 0px;
margin-top: 0px;
overflow-x: hidden;
overflow-y: hidden;
padding-bottom: 0px;
padding-left: 0px;
padding-right: 0px;
padding-top: 0px;
text-align: center;
/*text-indent: 0px;
text-shadow: none;
text-transform: none;*/
width: 148px;
/* word-spacing: 0px; */
}
</style>

</head>
<body>
<div style="position: absolute; top: 15px; left: 45px;">
	<div>
		<form action="" method="post">
			<ul>
				<li>
					<label id="emailAddrLabel" for="emailAddr" class="labeltxtdefault">Email Address</label>
					<input type="text" id="emailAddr" name="user.emailAddr" class="input_txt" />
				</li>
				<li>
					<label id="userNameLabel" for="userName" class="labeltxtdefault">User Name</label>
					<input type="text" id="userName" name="user.userName" class="input_txt" />
				</li>
				<li>
					<label id="passWordLabel" for="passWord" class="labeltxtdefault">Pass Word</label>
					<input type="password" id="passWord" name="user.passWord" class="input_txt" />
				</li>
				<li>
					<label id="passWordValidateLabel" for="passWordValidate" class="labeltxtdefault">Pass Word Confirm</label>
					<input type="password" id="passWordValidate" name="passWordValidate" class="input_txt" />
				</li>
				<li>
					<input type="submit" id="signup" value="Sign Up" class="SignUpBtn" />
				</li>
			</ul>
		</form>
	</div>
</div>

</body>


<script type="text/javascript">
function $(id) {
	return document.getElementById(id);
}

document.getElementById("emailAddr").onfocus = function() { _onfocus("emailAddr") };
document.getElementById("userName").onfocus =  function() { _onfocus("userName") };
document.getElementById("passWord").onfocus =  function() { _onfocus("passWord") };
document.getElementById("passWordValidate").onfocus =  function() { _onfocus("passWordValidate") };
document.getElementById("emailAddr").onblur = function() { _onblur("emailAddr") };
document.getElementById("userName").onblur = function() { _onblur("userName") };
document.getElementById("passWord").onblur = function() { _onblur("passWord") };
document.getElementById("passWordValidate").onblur = function() { _onblur("passWordValidate") };
function _onfocus(f_id){
	$(f_id+"Label").style.display = "none";
}
function _onblur(f_id){
	if(!$(f_id).value){
		$(f_id+"Label").style.display = "";
	}
}
</script>
</html>