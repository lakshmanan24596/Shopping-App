<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

    <%@ page import="java.sql.*" %>  
	<%  
		String value = request.getParameter("value");
		String type = request.getParameter("type");
		try
		{  
			Class.forName("com.mysql.jdbc.Driver");
		 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root",""); 
		 	Statement stmt = conn.createStatement();
		 	
		 	String sql = "";
		 	String output = "";
		 	
		 	if(type.equals("segment"))
		 	{
		 		sql = "select segmentName from segment where segmentName like '"+ value +"%' order by segmentId desc;"; 
		 		ResultSet rs = stmt.executeQuery(sql); 
		 		while(rs.next())
					output += rs.getString("segmentName") + ",";	
		 	}	
			else if(type.equals("category"))
			{	
				sql = "select categoryName from category where categoryName like '"+ value +"%' order by categoryId desc;"; 
				ResultSet rs = stmt.executeQuery(sql); 
				while(rs.next()) 
					output += rs.getString("categoryName") + ",";		
			}	
			else if(type.equals("brand"))
			{	
				sql = "select brandName from brand where brandName like '"+ value +"%' order by brandId desc;"; 
				ResultSet rs = stmt.executeQuery(sql); 
				while(rs.next())
					output += rs.getString("brandName") + ",";
			}	
			else if(type.equals("product"))
			{	
				sql = "select productName from product where productName like '"+ value +"%' order by productId desc;"; 
				ResultSet rs = stmt.executeQuery(sql); 
				while(rs.next())
					output += rs.getString("productName") + ",";	
			}	
			
			if(!output.equals(""))
           		output = output.substring(0, output.length() - 1);
			out.println(output);
			
			stmt.close();
			conn.close();  
		}
		catch(Exception e)
		{
			System.out.println(e);
			out.println(e);
		}   
	%>  
