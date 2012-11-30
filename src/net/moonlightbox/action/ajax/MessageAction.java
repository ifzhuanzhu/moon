package net.moonlightbox.action.ajax;

import java.util.Date;

import net.moonlightbox.action.ajax.common.AjaxBaseAction;
import net.moonlightbox.entity.priv.Message;
import net.moonlightbox.entity.system.User;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.opensymphony.xwork2.ActionContext;

public class MessageAction extends AjaxBaseAction {
	private Long id;
	private Message msg;
	private String message;
	
	public void execute() {
		if(id==null){
			this.setResult("error");
			return;
		} else{
			try {
				DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
				Key key = KeyFactory.createKey("Message", id);
				Entity entity = datastore.get(key);
				if(entity != null){
					msg.setMessage((String)entity.getProperty("Message"));
					msg.setAuthor((String)entity.getProperty("Author"));
					msg.setCreateDate((Date)entity.getProperty("CreateDate"));
					return;
				}else {
					id = null;
				}
			} catch (Exception e) {
				id = null;
			}
		}

		this.setResult("success");
	}
	
	public String insert() {
		try {
			if(msg == null){
				msg = new Message();
				msg.setMessage(message);
			}
			User user = (User)ActionContext.getContext().getSession().get("user");
			msg.setAuthor(user.getUserName());
			msg.setCreateDate(new Date());
			
			DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
			Entity messageEntity;
			messageEntity = new Entity("Message");
			messageEntity.setProperty("Message", msg.getMessage());
			messageEntity.setProperty("Author", msg.getAuthor());
			messageEntity.setProperty("CreateDate", msg.getCreateDate());
				
			datastore.put(messageEntity);

		} catch (Exception e) {
			this.setResult("error");
		}

		this.setResult("success");
		return "success";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Message getMsg() {
		return msg;
	}

	public void setMsg(Message msg) {
		this.msg = msg;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
