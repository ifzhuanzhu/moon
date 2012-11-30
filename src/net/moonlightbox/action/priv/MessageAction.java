package net.moonlightbox.action.priv;

import java.util.Date;

import net.moonlightbox.entity.system.User;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.opensymphony.xwork2.ActionContext;

public class MessageAction {
	private Long id;
	private String message;
	private String author;
	private String pageMsg;
	private String gotoURL;
	
	public String execute() {
		if(id==null){
			return "input";
		} else{
			try {
				DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
				Key key = KeyFactory.createKey("Message", id);
				Entity entity = datastore.get(key);
				if(entity != null){
					message = (String)entity.getProperty("Message");
					author = (String)entity.getProperty("Author");
					return "success";
				}else {
					id = null;
					return "input";
				}
			} catch (Exception e) {
				id = null;
				return "input";
			}
		}		
	}
	
	public String save() {
		try {
			User user = (User)ActionContext.getContext().getSession().get("user");
			author = user.getUserName();
			
			DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
			Entity msg;
			
			if(id==null) {// new
				msg = new Entity("Message");
				msg.setProperty("Message", message);
				msg.setProperty("Author", author);
				msg.setProperty("author", author);
				msg.setProperty("CreateDate", new Date());
			}
			else {// update
				Key key = KeyFactory.createKey("Message", id);
				msg = datastore.get(key);
				msg.setProperty("Message", message);
				msg.setProperty("Author", author);
				msg.setProperty("UpdateDate", new Date());
			}
			datastore.put(msg);
			
			pageMsg = "Save successfully!";
			gotoURL = "/priv/NoteView.do";
			return "forward";
		} catch (Exception e) {
			pageMsg = e.getMessage();
			return "input";
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPageMsg() {
		return pageMsg;
	}

	public void setPageMsg(String pageMsg) {
		this.pageMsg = pageMsg;
	}

	public String getGotoURL() {
		return gotoURL;
	}

	public void setGotoURL(String gotoURL) {
		this.gotoURL = gotoURL;
	}

}
