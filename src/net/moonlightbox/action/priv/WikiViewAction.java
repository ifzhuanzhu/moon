package net.moonlightbox.action.priv;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.moonlightbox.entity.priv.Wiki;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

public class WikiViewAction {
	private int pageIndex;
	private int pageCount;
	private int wikiCount;
	private List<Wiki> wikiList = new ArrayList<Wiki>();

	@SuppressWarnings("deprecation")
	public String execute() {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query query = new Query("Wiki");
		PreparedQuery pq = datastore.prepare(query);
		
		wikiCount = pq.countEntities();
		pageCount = (wikiCount % 5==0 ? wikiCount/5 : wikiCount/5+1); 
		pageIndex = pageIndex > pageCount ? pageCount : pageIndex;
		if(pageIndex < 1) {
			pageIndex=1;
		}

		for (Entity entity : pq.asIterable(FetchOptions.Builder.withLimit(5).offset(5*(pageIndex-1)))) {
			Wiki wiki = new Wiki();
			wiki.setId(entity.getKey().getId());
			wiki.setTitle((String)entity.getProperty("title"));
			wiki.setContent((String)entity.getProperty("content"));
			wiki.setAuthor((String)entity.getProperty("author"));
			wiki.setCreateDate((Date)entity.getProperty("createDate"));
			wiki.setUpdateDate((Date)entity.getProperty("updateDate"));
			wikiList.add(wiki);
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

	
	public List<Wiki> getWikiList() {
		return wikiList;
	}

	public void setWikiList(List<Wiki> wikiList) {
		this.wikiList = wikiList;
	}
	
	
}
