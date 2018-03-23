<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="java.sql.*" %>

<%
	Class.forName("com.mysql.jdbc.Driver");
 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root","");	
 	Statement stmt = conn.createStatement();
	
 	String type = request.getParameter("type");
 	int offset = Integer.parseInt(request.getParameter("offset"));
 	String sql = "";
    String output = "";
	
    if(type.equals("product"))
    {
    		sql = "select productName from product order by productId desc limit 1 offset " + offset + ";";
    }
    else if(type.equals("brand"))
	{	
		sql = "select brandName from brand order by brandId desc limit 1 offset " + offset + ";";
	}	
	else if(type.equals("category"))
	{	
		sql = "select categoryName from category order by categoryId desc limit 1 offset " + offset + ";";
	}	
	else if(type.equals("segment"))
	{	
		sql = "select segmentName from segment order by segmentId desc limit 1 offset " + offset + ";";		
	}	
	ResultSet rs = stmt.executeQuery(sql);            
 	if(rs.next())
 	{
 		output += rs.getString(1);		 		
 	}

   out.println(output);
   stmt.close();
   conn.close();
%>
