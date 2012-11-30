package net.moonlightbox.action.priv;

import net.moonlightbox.entity.system.User;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.opensymphony.xwork2.ActionContext;

public class LoginAction {
	String userName;
	String pwd;
	String gotoURL;
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getGotoURL() {
		return gotoURL;
	}
	public void setGotoURL(String gotoURL) {
		this.gotoURL = gotoURL;
	}
	public String execute() {
		if(ActionContext.getContext().getSession().get("user") != null){
			return "success";
		}else if(userName == null || pwd == null || userName.isEmpty() || pwd.isEmpty()){
			return "input";
		}else {
			DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
//			Key key = KeyFactory.createKey("User", 3);
//			Entity entity = datastore.get(key);
//			Entity entity = new Entity("User", 3);
//			entity.setProperty("UserName", userName);
//			entity.setProperty("PassWord", pwd);
//			entity.setProperty("FirstName", "Admin");
//			entity.setProperty("LastName", "System");
//			entity.setProperty("CreateTime", new Date());
//			datastore.put(entity);
//			datastore.delete(key);
			Query query = new Query("User");
			query.addFilter("UserName", Query.FilterOperator.EQUAL, userName);
			query.addFilter("PassWord", Query.FilterOperator.EQUAL, pwd);
			query.addFilter("IsActive", Query.FilterOperator.EQUAL, "Y");
			PreparedQuery pq = datastore.prepare(query);
			Entity entity = pq.asSingleEntity();
			
			if(entity != null) {
				User user = new User();
				user.setUserName(userName);
				user.setFirstName((String)entity.getProperty("FirstName"));
				user.setLastName((String)entity.getProperty("LastName"));
				ActionContext.getContext().getSession().put("user", user);
				if(gotoURL == null || gotoURL.isEmpty()){
					return "success";
				}else {
					return "forward";
				}
			}
			else {
				return "input";	
			}	
		}
	}
}
