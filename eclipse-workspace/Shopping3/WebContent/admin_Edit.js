		
	function editRecord(id)
	{
		var selectType;
		var type = document.getElementById('type').value;
		var record = document.getElementById('records').value;
		var pageNum;
		
		if(document.getElementById('page1').style.border == "2px solid rgb(76, 175, 80)")
			pageNum = parseInt(document.getElementById('page1').value);
		else if(document.getElementById('page2').style.border == "2px solid rgb(76, 175, 80)")
			pageNum = parseInt(document.getElementById('page2').value);
		else if(document.getElementById('page3').style.border == "2px solid rgb(76, 175, 80)")
			pageNum = parseInt(document.getElementById('page3').value);
		
		var idNum = parseInt(id.charAt(id.length - 1));
		var offset = ((record * (pageNum-1)) + idNum) - 1;
		
		var modal = document.getElementById('myModal');		
		var span = document.getElementsByClassName("close")[0];
		
		span.onclick = function() {
		    modal.style.display = "none";
		}
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
		
		//***********************************************************************
		
		if(type == "segment")
		{
			modal.style.display = "block";
			var modalContent = document.getElementById('modalContent');
			var div = document.getElementById("modalData");
						
			div.innerHTML =
				'<h4 align="center"><b>Edit Segment</b></h4><br>'+
				 '<form action="editData">'+ 
		            'Segment name <input type="text" name="newSegmentName" id="NewSegmentNameId" value="">'+  
		            '<input type="hidden" name="type" value="segment"><br>'+
	  			    '<input type="hidden" id="oldSegmentNameId" name="oldSegmentName" value=""><br>'+
	  			    '<button type="submit" style="border: 2px solid #4CAF50; margin-left: 320px;">Submit</button>'+
				 ' </form>'; 			
			modalContent.appendChild(div);
			
			var td_id = idNum;
     		var oldSegmentName = document.getElementById('td'+td_id).innerHTML;
     		document.getElementById('oldSegmentNameId').value = oldSegmentName;
     		document.getElementById('NewSegmentNameId').value = oldSegmentName;
		}
		else if(type == "category")
		{
			modal.style.display = "block";
			var modalContent = document.getElementById('modalContent');
			var div = document.getElementById("modalData");
						
			div.innerHTML =
				'<h4 align="center"><b>Edit Category</b></h4><br>'+
				'<form action="editData">'+ 
			        'Category Name <input type="text" name="newCategoryName" id="newCategoryNameId" value=""><br><br>'+  					
					'Select segment <select name="selectSegment" id="selectSegmentId" style="width:160px"></select> <br><br>'+					
					'<input type="hidden" name="type" value="category">'+
					'<input type="hidden" name="oldCategoryName" id="oldCategoryNameId" value=""><br>'+
					'<button type="submit" style="border: 2px solid #4CAF50; margin-left: 320px;">Submit</button>'+
				'</form>';			
			modalContent.appendChild(div);
			selectType = "segment";
		}
		else if(type == "brand")
		{
			modal.style.display = "block";
			var modalContent = document.getElementById('modalContent');
			var div = document.getElementById("modalData");
						
			div.innerHTML =
				'<h4 align="center"><b>Edit Brand</b></h4><br>'+
				'<form action="editData">'+ 
					'Brand Name <input type="text" name="newBrandName" id="newBrandNameId" value=""><br><br>'+  					
					'Select category <select name="selectCategory" id="selectCategoryId" style="width:160px"></select> <br><br>'+					
					'<input type="hidden" name="type" value="brand">'+
					'<input type="hidden" name="oldBrandName" id="oldBrandNameId" value=""><br>'+
					'<button type="submit" style="border: 2px solid #4CAF50; margin-left: 320px;">Submit</button>';	
				'</form>';	
			modalContent.appendChild(div);
			selectType = "category";
		}
		else if(type == "product")
		{
			modal.style.display = "block";
			var modalContent = document.getElementById('modalContent');
			var div = document.getElementById("modalData");
						
			div.innerHTML =
				'<h4 align="center"><b>Edit Product</b></h4><br>'+
				'<form action="editData">'+ 
			        'Product Name <input type="text" name="newProductName" id="newProductNameId" value=""><br><br>'+  
			        'Size <input type="text" name="newSize" id="newSizeId" value=""><br><br>'+ 
			        'Color <input type="text" name="newColor" id="newColorId" value=""><br><br>'+ 
			        'Price <input type="text" name="newPrice" id="newPriceId" value=""><br><br>'+ 
			        'Quantity <input type="text" name="newQuantity" id="newQuantityId" value=""><br><br>'+ 
			        
					'Select Brand <select name="selectBrand" id="selectBrandId" style="width:160px"></select> <br><br>'+					
					'<input type="hidden" name="type" value="product">'+
					'<input type="hidden" name="oldProductName" id="oldProductNameId" value=""><br>'+
					'<button type="submit" style="border: 2px solid #4CAF50; margin-left: 320px;">Submit</button>'+
				'</form>';			
			modalContent.appendChild(div);
			selectType = "brand";
		}
		
	    //***********************************************************************
		
		if(type != "segment")
		{
			var xmlObj = new XMLHttpRequest();
			xmlObj.onreadystatechange = function() 
		    {
		       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
		       {
		    	     	var response = xmlObj.responseText.trim();
		    	     	if(type == "category")
		    	     	{	
		    	     		responseArr = response.split(",");
		    	     		var select = document.getElementById('selectSegmentId');
		    	     		for(i=0; i<responseArr.length; i++)
		    	     		{
		    	     			var option = document.createElement('option');
				    	        option.value = responseArr[i];
				    	        option.innerHTML = responseArr[i];
				    	        select.appendChild(option);
		    	     		}
		    	     		var td_id1 = idNum * 2;
		    	     		var oldSegmentName = document.getElementById('td'+(td_id1)).innerHTML;
		    	     		document.getElementById('selectSegmentId').value = oldSegmentName;
		    	     		
		    	     		var td_id2 = (idNum * 2) - 1;
		    	     		var oldCategoryName = document.getElementById('td'+(td_id2)).innerHTML;
		    	     		document.getElementById('oldCategoryNameId').value = oldCategoryName;
		    	     		document.getElementById('newCategoryNameId').value = oldCategoryName;
		    	     	}	
		    	     	else if(type == "brand")
		    	     	{	
		    	     		responseArr = response.split(",");
		    	     		var select = document.getElementById('selectCategoryId');
		    	     		for(i=0; i<responseArr.length; i++)
		    	     		{
		    	     			var option = document.createElement('option');
				    	        option.value = responseArr[i];
				    	        option.innerHTML = responseArr[i];
				    	        select.appendChild(option);
		    	     		}
		    	     		var td_id1 = idNum * 2;
		    	     		var oldCategoryName = document.getElementById('td'+(td_id1)).innerHTML;
		    	     		document.getElementById('selectCategoryId').value = oldCategoryName;
		    	     		
		    	     		var td_id2 = (idNum * 2) - 1;
		    	     		var oldBrandName = document.getElementById('td'+(td_id2)).innerHTML;
		    	     		document.getElementById('oldBrandNameId').value = oldBrandName;
		    	     		document.getElementById('newBrandNameId').value = oldBrandName;
		    	     	}
		    	     	else if(type == "product")
	    	     		{
		    	     		responseArr = response.split(",");
		    	     		var select = document.getElementById('selectBrandId');
		    	     		for(i=0; i<responseArr.length; i++)
		    	     		{
		    	     			var option = document.createElement('option');
				    	        option.value = responseArr[i];
				    	        option.innerHTML = responseArr[i];
				    	        select.appendChild(option);
		    	     		}
		    	     		var td_id1 = idNum * 6;
		    	     		var oldBrandName = document.getElementById('td'+(td_id1)).innerHTML;
		    	     		document.getElementById('selectBrandId').value = oldBrandName;
		    	     		
		    	     		var td_id2 = (idNum * 6) - 5;
		    	     		var oldProductName = document.getElementById('td'+(td_id2)).innerHTML;
		    	     		document.getElementById('oldProductNameId').value = oldProductName;
		    	     		document.getElementById('newProductNameId').value = oldProductName;
		    	     		
		    	     		var td_id3 = (idNum * 6) - 4;
		    	     		var oldSize = document.getElementById('td'+(td_id3)).innerHTML;
		    	     		document.getElementById('newSizeId').value = oldSize;
		    	     		
		    	     		var td_id4 = (idNum * 6) - 3;
		    	     		var oldColor = document.getElementById('td'+(td_id4)).innerHTML;
		    	     		document.getElementById('newColorId').value = oldColor;
		    	     		
		    	     		var td_id5 = (idNum * 6) - 2;
		    	     		var oldPrice = document.getElementById('td'+(td_id5)).innerHTML;
		    	     		document.getElementById('newPriceId').value = oldPrice;
		    	     		
		    	     		var td_id6 = (idNum * 6) - 1;
		    	     		var oldQuantity = document.getElementById('td'+(td_id6)).innerHTML;
		    	     		document.getElementById('newQuantityId').value = oldQuantity;
	    	     		}
		       }    
		    }
		    xmlObj.open("GET", "editPopup?type="+selectType, true);
		    xmlObj.send();
		}    
	}

	