<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ page import="java.sql.*" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix = "sx" uri = "/struts-dojo-tags"%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="admin.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>

	<% String type = (String)request.getParameter("type"); %>
	
 	<%-- <% String message = (String) request.getAttribute("msg"); 
	   String type = (String) request.getAttribute("type");
	   if(message != null) { %>
			<script>
				var msg = "<%=message%>";
				alert(msg);
			</script>
	<% } %> --%>
	
	<%
		int limit = 5;
	    Class.forName("com.mysql.jdbc.Driver");
	 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root","");
	 	Statement stmt1 = conn.createStatement();
	 	Statement stmt2 = conn.createStatement();
	 	String sql1 = "";
	 	String sql2 = "";
	%>
	
	  <div style="text-align: center;margin-top: 35px;">		
	     	<input type="text" style="height: 35px; width: 400px;" name="search" id="searchId" placeholder="Search.." list="Datalist" autocomplete="off" onkeyup="searchOptionList()">  
	     	<datalist id="Datalist"></datalist> 		     
	 	 	<button type="button" style="height: 35px; width: 33px; margin-left: -4px;" id="searchButtonId" onclick="changeContent()" ><i class="fa fa-search"></i></button>
 	  </div> 
 	 
 	  <div id="myModal" class="modal" style="display:none">
		 <div class="modal-content" id="modalContent">
		   <span class="close">&times;</span>
			   <div id="modalData">		   		   		
			   </div>
		 </div> 
	  </div> 
		 	 
	<!-- *************************************************************************************************************************** -->
			
	<% if( type == null || type.equals("product")) { %>	
		<div>			     		
			<div style="margin-left: 10px;">
				Show 
				<select name="type" id="type" onchange="changeType()">
				    <option value="product" selected="selected">Product</option>
				    <option value="brand">Brand</option>
				    <option value="category">Category</option>
				    <option value="segment">Segment</option>
				</select>
			</div>
			<br>
			  
			  <%
			 	sql1 = "select productName, size, color, price, quantity, brandName from product inner join brand on product.brandId = brand.brandId order by productId desc limit " + limit + " offset 0;";			 	
			  	ResultSet rs1 = stmt1.executeQuery(sql1);
			  %>
			 	
		 	<table id="table" style="margin-left:13px">
		 		<tr>
			 		<th>Product Name</th>
			 		<th>Size</th>
			 		<th>Color</th>
			 		<th>Price</th>
			 		<th>Quantity</th>
			 		<th>Brand</th>
		 		</tr>	
		 		
		 		 <% int count = 1; %>
				 <% for(int i=1; rs1.next(); i++){ %>
				 	<tr>
				 	<% for(int j=1; j<=6; j++){ %>	 		
		            		<td id="td<%=count++%>"><%= rs1.getString(j)%></td>
		        		<% } %>
			 		   
		        		<td class="edit"><button type="button"  id="edit<%=i%>" onclick="editRecord(id)">Edit</button></td>
		        		<td class="delete"><button type="button" id="delete<%=i%>" onclick="deleteRecord(id)">Delete</button></td>
		        		</tr>
				<%}%> 			 
		 	</table>	 
		 	<br>
		 		  
			<% sql2 = "select count(*) from product;"; %>
		</div>
	<% } %>	
	
	<!-- *************************************************************************************************************************** -->
			
	<% if(type != null && type.equals("brand")) { %>
		<div>	
		     <div style="margin-left: 10px;">
				Show:
				<select name="type" id="type" onchange="changeType()">
				    <option value="product">Product</option>
				    <option value="brand" selected="selected">Brand</option>
				    <option value="category">Category</option>
				    <option value="segment">Segment</option>
				</select>
			</div>
			<br>
			
			  <%
			 	sql1 = "select brandName, categoryName from brand inner join category on brand.categoryId = category.categoryId order by brandId desc limit " + limit + " offset 0;";			 		
			    ResultSet rs1 = stmt1.executeQuery(sql1);
			  %>
			 	
		 	<table id="table" style="margin-left:13px">
		 		<tr>
			 		<th>Brand Name</th>
			 		<th>Category</th>
		 		</tr>	
		 		
		 		 <% int count = 1; %>
				 <% for(int i=1; rs1.next(); i++){ %>
				 	<tr>
				 	<% for(int j=1; j<=2; j++){ %>	 		
		            		<td id="td<%=count++%>"><%= rs1.getString(j)%></td>
		        		<% } %>
			 		   
		        		<td class="edit"><button type="button"  id="edit<%=i%>" onclick="editRecord(id)">Edit</button></td>
		        		<td class="delete"><button type="button" id="delete<%=i%>" onclick="deleteRecord(id)">Delete</button></td>
		        		</tr>
				<%}%> 			 
		 	</table>	 
		 	<br>
	
			 <%	sql2 = "select count(*) from brand;"; %>
		</div>
	<% } %>
	
	<!-- *************************************************************************************************************************** -->
	
	<% if(type != null && type.equals("category")) { %>
		<div>	
		     <div style="margin-left: 10px;">
				Show:
				<select name="type" id="type" onchange="changeType()">
				    <option value="product">Product</option>
				    <option value="brand">Brand</option>
				    <option value="category" selected="selected">Category</option>
				    <option value="segment">Segment</option>
				</select>
			</div>
			<br>
			 
			  <%
			 	sql1 = "select categoryName, segmentName from category inner join segment on category.segmentId = segment.segmentId order by categoryId desc limit " + limit + " offset 0;";				
			  	ResultSet rs1 = stmt1.executeQuery(sql1);
			  %>
			 	
		 	<table id="table" style="margin-left:13px">
		 		<tr>
			 		<th>Category Name</th>
			 		<th>Segment</th>
		 		</tr>	
		 		
		 		 <% int count = 1; %>
				 <% for(int i=1; rs1.next(); i++){ %>
				 	<tr>
				 	<% for(int j=1; j<=2; j++){ %>	 		
		            		<td id="td<%=count++%>"><%= rs1.getString(j)%></td>
		        		<% } %>
			 		   
		        		<td class="edit"><button type="button"  id="edit<%=i%>" onclick="editRecord(id)">Edit</button></td>
		        		<td class="delete"><button type="button" id="delete<%=i%>" onclick="deleteRecord(id)">Delete</button></td>
		        		</tr>
				<%}%> 			 
		 	</table>	 
		 	<br>
		 	 <%	sql2 = "select count(*) from category;"; %>			
		</div>
	<% } %>
	
	<!-- *************************************************************************************************************************** -->
	
	<% if(type != null && type.equals("segment")) { %>
		<div>	
		     <div style="margin-left: 10px;">
				Show:
				<select name="type" id="type" onchange="changeType()">
				    <option value="product">Product</option>
				    <option value="brand">Brand</option>
				    <option value="category">Category</option>
				    <option value="segment" selected="selected">Segment</option>
				</select>
			</div>
			<br>
			
			  <%			  	
			 	sql1 = "select segmentName from segment order by segmentId desc limit " + limit + " offset 0 ";			
			  	ResultSet rs1 = stmt1.executeQuery(sql1);
			  %>
			 	
		 	<table id="table" style="margin-left:13px">
		 		<tr>
			 		<th>Segment Name</th>
			 	</tr>	
		 		
		 		 <% int count = 1; %>
				 <% for(int i=1; rs1.next(); i++){ %>
				 	<tr>
					 	<% for(int j=1; j<=1; j++){ %>	 		
			            		<td id="td<%=count++%>"><%= rs1.getString(j)%></td>
			        		<% } %>
				 		   
			        		<td class="edit"><button type="button"  id="edit<%=i%>" onclick="editRecord(id)">Edit</button></td>
			        		<td class="delete"><button type="button" id="delete<%=i%>" onclick="deleteRecord(id)">Delete</button></td>
		        		</tr>
				<%}%> 			 
		 	</table>	 
		 	<br>
		 	<% sql2 = "select count(*) from segment;"; %>					
		</div>
	<% } %>
	
	<!-- *************************************************************************************************************************** -->	
	
		<div id="pageDiv" style="margin-top: 10px; margin-left: 420px;">	 		
	 		<button type="button" style="margin-left: 10px;" id="add" onclick="addData();"> Add </button> 
			  
			  <ul style="margin-top:-46px; margin-left: 90px;" class="pagination" id="page" style="width:100%; text-align:center">
			    <button id="page0" style="display:none" onclick="changePage(<%=0%>)"> &laquo; </button>
			    <button id="page1" value="1" onclick="changePage(<%=1%>)" style="padding: 7px 10px; border: 2px solid #4CAF50;"> 1 </button>
			    <button id="page2" value="2" onclick="changePage(<%=2%>)"> 2 </button>
			    <button id="page3" value="3" onclick="changePage(<%=3%>)"> 3 </button>
			    <button id="page4" onclick="changePage(<%=4%>)"> &raquo; </button>
			  </ul>	
			  			  
			  <p style="display:inline-block;margin-left:70px">Records Per Page</p>
			  <select name="records" id="records" onchange="changeContent()">
				    <% for(int i=1; i<=4; i++) { %>
					 	<option value="<%=i%>"><%=i%></option>  
				    <% } %>
				    <option value="5" selected="selected">5</option> 
				    <% for(int i=6; i<=10; i++) { %>
					 	<option value="<%=i%>"><%=i%></option>  
				    <% } %>
			  </select>
		</div>  
			
		<% 	
			ResultSet rs2 = stmt2.executeQuery(sql2);
		 	rs2.next();
		 	int size = rs2.getInt(1); 
		 	
			stmt1.close();
			stmt2.close();
			conn.close(); 
			
			if(size <= 5)
			{
				%> 
				<script>
					document.getElementById('page2').style.display = "none";
					document.getElementById('page3').style.display = "none";
					document.getElementById('page4').style.display = "none";
				</script>
				<%
			}
			else if(size <= 10)
			{
				%> 
				<script>
					document.getElementById('page3').style.display = "none";
					document.getElementById('page4').style.display = "none";
				</script>
				<%
			}
			else if(size <= 15)
			{
				%> 
				<script>
					document.getElementById('page4').style.display = "none";
				</script>
				<%
			}
		  %>
		  
	<!-- *************************************************************************************************************************** -->	
	
	<script type="text/javascript" src="admin_Action.js"></script>
	<script type="text/javascript" src="admin_Add.js"></script>
	<script type="text/javascript" src="admin_search.js"></script>
	<script type="text/javascript" src="admin_Delete.js"></script>
	<script type="text/javascript" src="admin_Edit.js"></script>
</body>
</html>
