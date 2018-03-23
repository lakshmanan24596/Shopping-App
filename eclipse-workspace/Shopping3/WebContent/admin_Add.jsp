<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	
	<% String selectedType = request.getParameter("type");%>
	
	<% if(selectedType.equals("segment")) { %>
			<h4 align="center"><b>Add Segment</b></h4>
			<form action= "addData">
				Enter Segment Name: <input type="text" name="segmentName" required><br><br>
				<input type="hidden" name="id" value="segment">
				<button type="submit" style="border: 2px solid #4CAF50; margin-left: 320px;">Submit</button>
			</form>	
	<% } %>	
	
	<% if(selectedType.equals("category")) { %>
			<h4 align="center"><b>Add Category</b></h4>
			<form action= "addData">					
				Select Segment : <select name="selectSegment" required style="width:130px" id="selectSegmentId">			        
							     </select>
								<br><br>			    
				Enter Category Name : <input type="text" name="categoryName" required><br>
									  <input type="hidden" name="id" value="category">
									  <br>
				<button type="submit" style="border: 2px solid #4CAF50; margin-left: 320px;">Submit</button>		  
			</form>		
	<% } %>	
	
	<% if(selectedType.equals("brand")) { %>
		<h4 align="center"><b>Add Brand</b></h4>
		<form action= "addData">				
			Select Segment : <select name="selectSegment" required style="width:130px" id="selectSegmentId" onchange="showCategory()">							        
						    </select>
			<br><br>	
			Select Category : <select name="selectCategory" required style="width:130px" id="selectCategoryId">					        
							  </select>
			<br><br>
			Enter Brand Name : <input type="text" name="brandName" required><br>
								  <input type="hidden" name="id" value="brand">
								  <br>
			<button type="submit" style="border: 2px solid #4CAF50; margin-left: 320px;">Submit</button>		  
		</form>		
	<% } %>
	
	<% if(selectedType.equals("product")) { %>
		<h4 align="center"><b>Add Product</b></h4>
		<form action= "addData">					
			Select Segment : <select name="selectSegment" required style="width:130px" id="selectSegmentId" onchange="showCategory()">																	        
							  </select>
			<br><br>	
			Select Category : <select name="selectCategory" required  style="width:130px" id="selectCategoryId" onchange="showBrand()">																        
							  </select>
			<br><br>
			Select Brand : <select name="selectBrand" required style="width:130px" id="selectBrandId">								
							</select> <br><br>
	
			Enter Product Name : <input type="text" name="prodName" required><br><br>
		    Enter Product Size : <input type="text" name="prodSize" required><br><br>
			Enter Product Color : <input type="text" name="prodColor" required><br><br>
			Enter Product Quantity : <input type="text" name="prodQuantity" required><br><br>
			Enter Product Price : <input type="text" name="prodPrice" required><br><br>
			<input type="hidden" name="id" value="product">
			<button type="submit" style="border: 2px solid #4CAF50; margin-left: 320px;">Submit</button>		  
		</form>			
	<% } %>	
	
	<%@ page import="java.sql.*" %>
	<%
		String type = request.getParameter("type");
		if(!(type.equals("segment")))
		{	
			Class.forName("com.mysql.jdbc.Driver");
		 	Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/shopping","root","");	
		 	Statement stmt = conn.createStatement();
		 
		    String output = "DELIMETER";	
		   	String sql = "select segmentName from segment";		
		
			ResultSet rs = stmt.executeQuery(sql);            
		 	while(rs.next())
		 	{
		 		output += rs.getString(1) + ",";		 		
			}
						    
		   if(!output.equals(""))
		    		output = output.substring(0, output.length() - 1);
		   out.println(output);
		}
	%>
