<%@page import="com.google.appengine.api.datastore.FetchOptions"%>
<%@page import="java.util.List"%>
<%@page import="com.google.appengine.api.datastore.Query"%>
<%@page import="com.google.appengine.api.datastore.Key"%>
<%@page import="com.google.appengine.api.datastore.DatastoreServiceFactory"%>
<%@page import="com.google.appengine.api.datastore.DatastoreService"%>
<%@page import="com.google.appengine.api.datastore.KeyFactory"%>
<%@page import="com.google.appengine.api.datastore.Entity"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Hello</title>
</head>
<body>
Hello!<br/>
<% 	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	//Key userKey = KeyFactory.stringToKey("admin");
	Query q = new Query("User");
	List<Entity> userList = datastore.prepare(q).asList(FetchOptions.Builder.withDefaults());
%>
<% for(Entity user : userList){ %>
<p><%=user.getProperty("FirstName") %></p>
<p><%=user.getProperty("LastName") %></p>
<p><%=user.getProperty("CreateDate") %></p>
<% } %>
</body>
</html>