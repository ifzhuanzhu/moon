package net.moonlightbox.action.priv;

import java.util.Date;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import net.moonlightbox.entity.system.User;

public class SignUpAction {
	private User user;
	
	public String execute() {
		if(user != null){
			DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
			Entity entity = new Entity("User");
			entity.setProperty("EmailAddr", user.getEmailAddr());
			entity.setProperty("UserName", user.getUserName());
			entity.setProperty("PassWord", user.getPassWord());
			entity.setProperty("FirstName", user.getFirstName());
			entity.setProperty("LastName", user.getLastName());
			entity.setProperty("CreateTime", new Date());
			entity.setProperty("IsActive", "N");
			datastore.put(entity);
			return "success";
		}
		else {
			return "input";
		}
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
