<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="java.sql.*" %>

<%
	Class.forName("com.mysql.jdbc.Driver");
 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root","");	
 	Statement stmt = conn.createStatement();
 	
 	String type = request.getParameter("type");
 	String sql = "";
 	String output = "";
	
    if(type.equals("brand"))
	{		
		sql = "select brandName from brand";
	}	
	else if(type.equals("category"))
	{	
		sql = "select categoryName from category";
	}	
	else if(type.equals("segment"))
	{	
		sql = "select segmentName from segment";		
	}	
       
	ResultSet rs = stmt.executeQuery(sql);            
 	while(rs.next())
 	{
 		output += rs.getString(1) + ",";		 		
	}
				    
   if(!output.equals(""))
    		output = output.substring(0, output.length() - 1);
   out.println(output);
%>

