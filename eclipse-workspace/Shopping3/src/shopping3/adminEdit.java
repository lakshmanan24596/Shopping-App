package shopping3;

import java.sql.*;
import javax.servlet.http.*;
import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class adminEdit extends ActionSupport 
{
	HttpServletRequest request = ServletActionContext.getRequest();
	String type = request.getParameter("type");
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
			String oldSegmentName = request.getParameter("oldSegmentName");	
			String newSegmentName = request.getParameter("newSegmentName");	
			sql2 = "update segment set segmentName='" + newSegmentName +   "' where segmentName='" + oldSegmentName + "';";	        
		}
	 	else if(type.equals("category"))
		{	
			String oldCategoryName = request.getParameter("oldCategoryName");	
			String newCategoryName = request.getParameter("newCategoryName");	
			String selectSegment = request.getParameter("selectSegment");
			try
			{
				sql1 = "select segmentId from segment where segmentName ='" + selectSegment + "';";
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
		 		int segmentId = rs.getInt("segmentId");	
			 	sql2 = "update category set categoryName='" + newCategoryName + "', segmentId=" + segmentId + " where categoryName='" + oldCategoryName + "';";
		    }
		}
		else if(type.equals("brand"))
		{
			String oldBrandName = request.getParameter("oldBrandName");	
			String newBrandName = request.getParameter("newBrandName");	
			String selectCategory = request.getParameter("selectCategory");
			try
			{
				sql1 = "select categoryId from category where categoryName ='" + selectCategory + "';";
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
		 		int categoryId = rs.getInt("categoryId");	
			 	sql2 = "update brand set brandName='" + newBrandName + "', categoryId=" + categoryId + " where brandName='" + oldBrandName + "';";
		        stmt2.executeUpdate(sql2);
		 	}
		}
		else if(type.equals("product"))
		{
			String oldName = request.getParameter("oldProductName");	
			String newName = request.getParameter("newProductName");	
			String selectBrand = request.getParameter("selectBrand");
			
			String size = request.getParameter("newSize");
			String color = request.getParameter("newColor");
			String price = request.getParameter("newPrice");
			String quantity = request.getParameter("newQuantity");						
			try
			{
				sql1 = "select brandId from brand where brandName ='" + selectBrand + "';";
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
		 		int brandId = rs.getInt("brandId");	
			 	sql2 = "update product set productName='"+newName+"',size="+size+",color='"+color+"',price="+price+",quantity="+quantity+",brandId="+brandId+" where productName='"+oldName+"';";
		        stmt2.executeUpdate(sql2);
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
		 			
		 	