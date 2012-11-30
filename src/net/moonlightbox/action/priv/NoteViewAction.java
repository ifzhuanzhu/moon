package net.moonlightbox.action.priv;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.moonlightbox.entity.priv.Note;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

public class NoteViewAction {
	private int pageIndex;
	private int pageCount;
	private int noteCount;
	private List<Note> noteList = new ArrayList<Note>();

	@SuppressWarnings("deprecation")
	public String execute() {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query query = new Query("Note");
		PreparedQuery pq = datastore.prepare(query);
		
		noteCount = pq.countEntities();
		pageCount = (noteCount % 5 == 0 ? noteCount/5 : noteCount/5+1); 
		pageIndex = pageIndex > pageCount ? pageCount : pageIndex;
		if(pageIndex < 1) {
			pageIndex=1;
		}

		for (Entity entity : pq.asIterable(FetchOptions.Builder.withLimit(5).offset(5*(pageIndex-1)))) {
			Note note = new Note();
			note.setId(entity.getKey().getId());
			note.setTitle((String)entity.getProperty("title"));
			note.setContent((String)entity.getProperty("content"));
			note.setAuthor((String)entity.getProperty("author"));
			note.setCreateDate((Date)entity.getProperty("createDate"));
			note.setUpdateDate((Date)entity.getProperty("updateDate"));
			noteList.add(note);
		}
		return "success";
	}

	public int getPageIndex() {
		return (pageIndex < 1 ? 1:pageIndex);
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageCount() {
		return pageCount;
	}

	public int getNoteCount() {
		return noteCount;
	}
	
	public List<Note> getNoteList() {
		return noteList;
	}

	public void setNoteList(List<Note> noteList) {
		this.noteList = noteList;
	}

	
}
