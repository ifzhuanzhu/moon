package net.moonlightbox.action.ajax;

import java.util.HashMap;
import java.util.Map;

//import org.apache.struts2.json.annotations.JSON;

public class JasonTestAction {
	private String msg;
	private Map<String, String> map = new HashMap<String, String>();
	
	public void execute() {
		msg = "hello json!";
		map.put("key", "value");
		map.put("ajax", "java");
		map.put("data", "json");
		//return "success";
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Map<String, String> getMap() {
		return map;
	}

	public void setMap(Map<String, String> map) {
		this.map = map;
	}
}
