package net.moonlightbox.action.priv;

import java.util.Date;

import net.moonlightbox.entity.system.User;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.opensymphony.xwork2.ActionContext;

public class NoteEditAction {
	private Long id;
	private String title;
	private String content;
	private String tags;
	private String author;
	private String pageMsg;
	private String gotoURL;
	
	public String execute() {
		if(id==null){
			return "input";
		} else{
			try {
				DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
				Key key = KeyFactory.createKey("Note", id);
				Entity entity = datastore.get(key);
				if(entity != null){
					title = (String)entity.getProperty("title");
					content = (String)entity.getProperty("content");
					tags = (String)entity.getProperty("tags");
					author = (String)entity.getProperty("author");
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
			Entity Note;
			if(id==null) {
				Note = new Entity("Note");
				Note.setProperty("title", title);
				Note.setProperty("content", content);
				Note.setProperty("tags", tags);
				Note.setProperty("author", author);
				Note.setProperty("createDate", new Date());
			}
			else {
				Key key = KeyFactory.createKey("Note", id);
				Note = datastore.get(key);
				Note.setProperty("title", title);
				Note.setProperty("content", content);
				Note.setProperty("tags", tags);
				Note.setProperty("author", author);
				Note.setProperty("updateDate", new Date());
			}
			datastore.put(Note);
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}
	
	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}
	
	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
	
	public void setContent(String content) {
		this.content = content;
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
