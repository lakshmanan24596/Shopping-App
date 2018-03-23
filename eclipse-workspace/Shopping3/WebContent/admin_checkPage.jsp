<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="java.sql.*" %>

<%
	Class.forName("com.mysql.jdbc.Driver");
 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root","");	
 	Statement stmt = conn.createStatement();
	
 	String selectedType = request.getParameter("selectedType");
 	String sql = "";
    int count;
	
	if(selectedType.equals("product"))
	{	
	 	sql = "select count(*) from product;";
	}
	else if(selectedType.equals("brand"))
	{	
		sql = "select count(*) from brand;";		
	}	
	else if(selectedType.equals("category"))
	{	
		sql = "select count(*) from category;";		
	}	
	else if(selectedType.equals("segment"))
	{	
		sql = "select count(*) from segment;";		
	}
	
	ResultSet rs = stmt.executeQuery(sql);
 	rs.next();
 	count = rs.getInt(1); 
    out.println(count);
%>
