package net.moonlightbox.action.priv;

import com.opensymphony.xwork2.ActionContext;

public class LogoutAction {
	public String execute() {
		ActionContext.getContext().getSession().clear();
		return "success";
	}
}
