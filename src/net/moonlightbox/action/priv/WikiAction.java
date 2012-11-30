package net.moonlightbox.action.priv;

import java.util.Date;

import net.moonlightbox.entity.priv.Wiki;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public class WikiAction {
	private Long id;
	private Wiki wiki = new Wiki();

	public String execute() throws EntityNotFoundException {
		if(id!=null){
			DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
			Key key = KeyFactory.createKey("Wiki", id);
			Entity entity = datastore.get(key);
			wiki.setTitle((String)entity.getProperty("title"));
			wiki.setContent((String)entity.getProperty("content"));
			wiki.setAuthor((String)entity.getProperty("author"));
			wiki.setCreateDate((Date)entity.getProperty("createDate"));
		}
		return "success";
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	
	public Wiki getWiki() {
		return wiki;
	}

	public void setWiki(Wiki wiki) {
		this.wiki = wiki;
	}	

}
