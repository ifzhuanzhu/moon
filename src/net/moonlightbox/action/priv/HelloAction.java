package net.moonlightbox.action.priv;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public class HelloAction {
	private Entity user;
	
	public Entity getUser() {
		return user;
	}

	public String execute() {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		
		try{
			Key userKey = KeyFactory.stringToKey("admin");
			user = datastore.get(userKey);
		}catch (Exception e) {
			// TODO: handle exception
		}
		/*Entity user = new Entity("User", "admin");
		user.setProperty("PassWord", "123");
		user.setProperty("FirstName", "Admin");
		user.setProperty("LastName", "System");
		user.setProperty("CreateDate", new Date());
		datastore.put(user);*/
		
		
		return "success";
	}
}
