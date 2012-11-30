package net.moonlightbox.action.priv;

import java.util.Date;

import net.moonlightbox.entity.priv.Note;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public class NoteAction {
	private Long id;
	private Note note= new Note();

	public String execute() throws EntityNotFoundException {
		if(id!=null){
			DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
			Key key = KeyFactory.createKey("Note", id);
			Entity entity = datastore.get(key);
			note.setTitle((String)entity.getProperty("title"));
			note.setContent((String)entity.getProperty("content"));
			note.setAuthor((String)entity.getProperty("author"));
			note.setCreateDate((Date)entity.getProperty("createDate"));
		}
		return "success";
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public Note getNote() {
		return note;
	}

	public void setNote(Note note) {
		this.note = note;
	}

}
