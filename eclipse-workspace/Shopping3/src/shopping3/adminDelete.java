package shopping3;

import java.sql.*;
import javax.servlet.http.*;
import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class adminDelete extends ActionSupport 
{
	HttpServletRequest request = ServletActionContext.getRequest();
	String type = request.getParameter("type");
	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception 
	{	    
	    Class.forName("com.mysql.jdbc.Driver");
	 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root","");	
	 	Statement stmt = conn.createStatement();
	 	String sql = "";
		
	 	String name = request.getParameter("recordName");		
		if(type.equals("segment"))
	 		sql = "delete from segment where segmentName = '" + name + "';";
	 	else if(type.equals("category"))
	 		sql = "delete from category where categoryName = '" + name + "';";
	 	else if(type.equals("brand"))
	 		sql = "delete from brand where brandName = '" + name + "';";
	 	else if(type.equals("product"))
	 		sql = "delete from product where productName = '" + name + "';";
	 	
	 	try
		{
			stmt.executeUpdate(sql);
			request.setAttribute("msg", "Success");
			
	        stmt.close();
	      	conn.close();
		}
		catch (Exception e) 
	    {
			e.printStackTrace();
	        request.setAttribute("msg", e);
	        return "error";
	    }
	 	return "success";
	}
	
	public String getType()
	{
		return type;
	}
}	
		 			
		 	