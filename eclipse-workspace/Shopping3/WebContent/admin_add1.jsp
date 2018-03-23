<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="java.sql.*" %>

<%
	Class.forName("com.mysql.jdbc.Driver");
 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root","");	
 	Statement stmt1 = conn.createStatement();
 	Statement stmt2 = conn.createStatement();
	
 	String type = request.getParameter("type");
 	String higherValue = request.getParameter("higherValue");
 	String sql1 = "";
 	String sql2 = "";
    String output = "";
	
    if(type.equals("brand"))
	{	
    		sql1 = "select categoryId from category where categoryName ='"  + higherValue + "';";
		ResultSet rs1 = stmt1.executeQuery(sql1);            
	 	if(rs1.next())
	 	{
	 		int categoryId = Integer.parseInt(rs1.getString(1));
			sql2 = "select brandName from brand where categoryId =" + categoryId;
	 	}	
	}	
	else if(type.equals("category"))
	{	
		sql1 = "select segmentId from segment where segmentName ='"  + higherValue + "';";
		ResultSet rs1 = stmt1.executeQuery(sql1);            
	 	if(rs1.next())
	 	{
	 		int segmentId = Integer.parseInt(rs1.getString(1));		 		
			sql2 = "select categoryName from category where segmentId =" + segmentId;
	 	}	
	}	
       
	ResultSet rs2 = stmt2.executeQuery(sql2);            
 	while(rs2.next())
 	{
 		output += rs2.getString(1) + ",";		 		
	}
				    
   if(!output.equals(""))
    		output = output.substring(0, output.length() - 1);
   out.println(output);
%>

