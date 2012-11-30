package net.moonlightbox.filter;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.*;

public class PrivFilter implements Filter {

	@Override
	public void init(FilterConfig config) throws ServletException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		HttpSession session = httpRequest.getSession();
		String reqPath = httpRequest.getServletPath();
		if(session.getAttribute("user")==null && !isPassUrl(reqPath))
		{
			HttpServletResponse httpResponse = (HttpServletResponse)response;
			String redirectURL = "/priv/login.do";
			if(!reqPath.equals("/priv") && !reqPath.equals("/priv/logout.do")){
				redirectURL = String.format("%s%s%s", redirectURL, "?gotoURL=", URLEncoder.encode(reqPath, "UTF-8"));
			}
			httpResponse.sendRedirect(redirectURL);
		}else
		{
			chain.doFilter(request, response);
		}
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}
	
	private boolean isPassUrl(String url) {
		if(url.equals("/priv/login.do")) return true;
		if(url.equals("/priv/SignUp.do")) return true;
		return false;
	}

}
