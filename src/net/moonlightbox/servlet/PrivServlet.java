package net.moonlightbox.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class PrivServlet extends HttpServlet {

	@Override
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		Object user = session.getAttribute("user");
		if(user==null){
			response.sendRedirect("/priv/login.do");
		}else {
			RequestDispatcher rd;
			rd = request.getRequestDispatcher("content/priv/priv.jsp");
			rd.forward(request, response);
		}
	}
	
}
