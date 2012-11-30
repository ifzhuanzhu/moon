package net.moonlightbox.action.priv;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public class AjaxTestAction {
	private String msg;
	private InputStream inputStream;
	
	public String execute() throws Exception {
		msg="helllo world!";
		inputStream = new ByteArrayInputStream("Hello Ajax!".getBytes("UTF-8"));
		return "success";
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}
}
