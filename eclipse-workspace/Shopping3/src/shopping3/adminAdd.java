package shopping3;

import java.sql.*;
import javax.servlet.http.*;
import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class adminAdd extends ActionSupport 
{
	HttpServletRequest request = ServletActionContext.getRequest();
	String type = request.getParameter("id");
	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception 
	{	    
	    Class.forName("com.mysql.jdbc.Driver");
	 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root","");	
	 	Statement stmt1 = conn.createStatement();
		Statement stmt2 = conn.createStatement();
	 	String sql1 = "";
	 	String sql2 = "";
	 	ResultSet rs;
			
		if(type.equals("segment"))
		{	
			String segmentName = request.getParameter("segmentName");
			sql2 = "insert into segment (segmentName) values('" + segmentName + "');";
		}
		
		else if(type.equals("category"))
		{
			String selectSegment = request.getParameter("selectSegment");
			String categoryName = request.getParameter("categoryName");
			try
			{
				sql1 = "select segmentId from segment where segmentName = " + "'" + selectSegment + "';";
				rs = stmt1.executeQuery(sql1);
			}	
		 	catch (Exception e) 
		    {
		        e.printStackTrace();
		        request.setAttribute("msg", e);
		        return "error";
		    }
		 	if(rs.next())
		 	{ 
		 		int segmentId  = rs.getInt("segmentId");
		 	 	sql2 = "insert into category (categoryName, segmentId) values('" + categoryName + "'," + segmentId + ");";	 	
		 	}
		}
		
		else if(type.equals("brand"))
		{
			String selectCategory = request.getParameter("selectCategory");
			String brandName = request.getParameter("brandName");
			try
			{
				sql1 = "select categoryId from category where categoryName = '" + selectCategory + "';";
				rs = stmt1.executeQuery(sql1);
			}
			catch (Exception e) 
		    {
		        e.printStackTrace();
		        request.setAttribute("msg", e);
		        return "error";
		    }
		 	if(rs.next())
		 	 { 
		 		int categoryId  = rs.getInt("categoryId");
		 	 	sql2 = "insert into brand (brandName, categoryId) values('" + brandName + "'," + categoryId + ");";	 	
		 	 }	
		}
		
		else if(type.equals("product"))
		{
			String selectBrand = request.getParameter("selectBrand");
			String prodName = request.getParameter("prodName"); 
			String size = request.getParameter("prodSize");
			String color = request.getParameter("prodColor");
		    String quantity = request.getParameter("prodQuantity");
		    String price = request.getParameter("prodPrice");		    
		    try
		    {
			    sql1 = "select brandId from brand where brandName = '" + selectBrand + "';";
		 	 	rs = stmt1.executeQuery(sql1);
		    }
		    catch (Exception e) 
		    {
		        e.printStackTrace();
		        request.setAttribute("msg", e);
		        return "error";
		    }		    
	 	 	if(rs.next())
	 	 	{
	 	 		int brandId  = rs.getInt("brandId");
		 	 	sql2 = "insert into product (productName, size, color, price, quantity, brandId) values ('" + prodName + "'," + size + ",'" + color + "'," + price + "," + quantity + "," + brandId + ");";	 	
		 	}	 
		}
		
		try
		{
			stmt2.executeUpdate(sql2);
			request.setAttribute("msg", "Success");
			
	        stmt1.close();
	        stmt2.close();
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
		 			
		 	