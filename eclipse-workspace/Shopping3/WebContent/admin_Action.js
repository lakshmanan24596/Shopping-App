
	document.getElementById("searchId")
    .addEventListener("keyup", function(event) {
    		event.preventDefault();
	    if (event.keyCode === 13) {
	        document.getElementById("searchButtonId").click();
	    }
    });

	function changeType()
	{
		document.getElementById('searchId').value = "";
		changeContent();
	}

	function changeContent()
	{
		var selectedType = document.getElementById('type').value;
		var selectedRecords = document.getElementById('records').value;
		var selectedSearchValue = document.getElementById('searchId').value;
		
		document.getElementById('page1').style.border = "2px solid #4CAF50";
		document.getElementById('page1').style.padding = "7px 10px";
		document.getElementById('page2').style.border = null;
		document.getElementById('page2').style.padding = null;
		document.getElementById('page3').style.border = null;
		document.getElementById('page3').style.padding = null;
		
		document.getElementById('pageDiv').style.display = null;
		document.getElementById('table').style.display = null;
			
		var selectedPage = 1;
		checkPage(selectedType, selectedRecords, selectedPage);
		
		var xmlObj = new XMLHttpRequest();
		xmlObj.onreadystatechange = function() 
	    {
	       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
	       {
	    	     	var response = xmlObj.responseText;
	    	     	createTable(response);
	       }    
	    }
		xmlObj.open("GET", "changeContent?selectedType="+selectedType+"&selectedRecords="+selectedRecords+"&selectedPage="+selectedPage+"&selectedSearchValue="+selectedSearchValue, true);
	    xmlObj.send();
	}
	
	function changePage(page)
	{
		var pageNum = document.getElementById('page'+page).value;
		var selectedType = document.getElementById('type').value;
		var selectedRecords = document.getElementById('records').value;
		var selectedSearchValue = document.getElementById('searchId').value;
		var selectedPage;
		
		if(page == 1)
		{	
			document.getElementById('page1').style.border = "2px solid #4CAF50";
			document.getElementById('page1').style.padding = "7px 10px";
			document.getElementById('page2').style.border = null;
			document.getElementById('page2').style.padding = null;
			document.getElementById('page3').style.border = null;
			document.getElementById('page3').style.padding = null;
			selectedPage = parseInt(document.getElementById('page1').value);
		}
		else if(page == 2)
		{
			document.getElementById('page1').style.border = null;
			document.getElementById('page1').style.padding = null;
			document.getElementById('page2').style.border = "2px solid #4CAF50";
			document.getElementById('page2').style.padding = "7px 10px";
			document.getElementById('page3').style.border = null;
			document.getElementById('page3').style.padding = null;
			selectedPage = parseInt(document.getElementById('page2').value);
		}
		else if(page == 3)
		{
			document.getElementById('page1').style.border = null;
			document.getElementById('page1').style.padding = null;
			document.getElementById('page2').style.border = null;
			document.getElementById('page2').style.padding = null;
			document.getElementById('page3').style.border = "2px solid #4CAF50";
			document.getElementById('page3').style.padding = "7px 10px";
			selectedPage = parseInt(document.getElementById('page3').value);
		}
		
		else if(page == 0) //prev
		{
			if(parseInt(document.getElementById('page1').value) == 1)
				return;
			
			document.getElementById('page1').value = parseInt(document.getElementById('page1').value) - 3;
			document.getElementById('page2').value = parseInt(document.getElementById('page2').value) - 3;
			document.getElementById('page3').value = parseInt(document.getElementById('page3').value) - 3;			
			document.getElementById('page1').innerHTML = document.getElementById('page1').value;
			document.getElementById('page2').innerHTML = document.getElementById('page2').value;
			document.getElementById('page3').innerHTML = document.getElementById('page3').value;
			
			document.getElementById('page1').style.border = "2px solid #4CAF50";
			document.getElementById('page1').style.padding = "7px 10px";
			document.getElementById('page2').style.border = null;
			document.getElementById('page2').style.padding = null;
			document.getElementById('page3').style.border = null;
			document.getElementById('page3').style.padding = null;		
						
			document.getElementById('page2').style.display = null;
			document.getElementById('page3').style.display = null;
			document.getElementById('page4').style.display = null;
			
			selectedPage = parseInt(document.getElementById('page1').value);
			
			if(selectedPage == 1)
				document.getElementById('page0').style.display = "none";
		}
		else if(page == 4) //next
		{
			document.getElementById('page0').style.display = null;
			document.getElementById('page1').value = parseInt(document.getElementById('page1').value) + 3;
			document.getElementById('page2').value = parseInt(document.getElementById('page2').value) + 3;
			document.getElementById('page3').value = parseInt(document.getElementById('page3').value) + 3;
			
			document.getElementById('page1').innerHTML = document.getElementById('page1').value;
			document.getElementById('page2').innerHTML = document.getElementById('page2').value;
			document.getElementById('page3').innerHTML = document.getElementById('page3').value;
			
			document.getElementById('page1').style.border = "2px solid #4CAF50";
			document.getElementById('page1').style.padding = "7px 10px";
			document.getElementById('page2').style.border = null;
			document.getElementById('page2').style.padding = null;
			document.getElementById('page3').style.border = null;
			document.getElementById('page3').style.padding = null;			
			selectedPage = parseInt(document.getElementById('page1').value);
			checkPage(selectedType, selectedRecords, selectedPage);
		}
		
		var xmlObj = new XMLHttpRequest();
		xmlObj.onreadystatechange = function() 
	    {
	       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
	       {
	    	     	var response = xmlObj.responseText;
	    	   	    createTable(response);
	       }    
	    }
	    xmlObj.open("GET", "changeContent?selectedType="+selectedType+"&selectedRecords="+selectedRecords+"&selectedPage="+selectedPage+"&selectedSearchValue="+selectedSearchValue, true);
	    xmlObj.send();
	}
	
	function checkPage(selectedType, selectedRecords, selectedPage)
	{
		var xmlObj = new XMLHttpRequest();
		xmlObj.onreadystatechange = function() 
	    {
	       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
	       {
	    	     	var totalRecordCount = xmlObj.responseText;
	    	     	var size = (totalRecordCount / selectedRecords) - (selectedPage-1);	 
	    	     	
	    	     	if(size > 3)
    	     		{
	    	     		document.getElementById('page2').style.display = null;
	    	     		document.getElementById('page3').style.display = null;    	     		
	    	     		document.getElementById('page4').style.display = null;	    	     		
    	     		}
	    	     	else if(size > 2)
	    	     	{
	    	     		document.getElementById('page2').style.display = null;
	    	     		document.getElementById('page3').style.display = null;
	    	     		document.getElementById('page4').style.display = "none";
	    	     	}
	    	     	else if(size > 1)
    	     		{	 
	    	     		document.getElementById('page2').style.display = null;
	    	     		document.getElementById('page3').style.display = "none";
	    	     		document.getElementById('page4').style.display = "none";	    	     		
    	     		}
	    	     	else
	    	     	{
	    	     		document.getElementById('page2').style.display = "none";
	    	     		document.getElementById('page3').style.display = "none";
	    	     		document.getElementById('page4').style.display = "none";
	    	     	}	
	    	     	document.getElementById('page1').value = selectedPage;	    	     		
    				document.getElementById('page1').innerHTML = selectedPage;
    	     		document.getElementById('page2').value = selectedPage + 1;	    	     		
    				document.getElementById('page2').innerHTML = selectedPage + 1;
    				document.getElementById('page3').value = selectedPage + 2;	    	     		
    				document.getElementById('page3').innerHTML = selectedPage + 2;
    				
    				if(selectedPage == 1)
    					document.getElementById('page0').style.display = "none";
    				else
    					document.getElementById('page0').style.display = null; 				
	       }    
	    }
	    xmlObj.open("GET", "checkPage?selectedType="+selectedType, true);
	    xmlObj.send();
	}
	
	function createTable(response)
	{
		response = response.trim();
		var selectedType = document.getElementById('type').value;
		var responseArr = response.split(':');
		
		var body = document.body;
	    var tbl = document.createElement('table');
	    var tbdy = document.createElement('tbody');
	    
   	    if(selectedType == "product")
   		{
	   	    	var th = document.createElement('th');
   	    		th.innerHTML = "Product Name";
   	    		tbdy.appendChild(th);
   	    		var th = document.createElement('th');
   	    		th.innerHTML = "Size";
   	    		tbdy.appendChild(th);
   	    		var th = document.createElement('th');
   	    		th.innerHTML = "Color";
   	    		tbdy.appendChild(th);
   	    		var th = document.createElement('th');
   	    		th.innerHTML = "Price";
   	    		tbdy.appendChild(th);
   	    		var th = document.createElement('th');
   	    		th.innerHTML = "Quantity";
   	    		tbdy.appendChild(th);
   	    		var th = document.createElement('th');
   	    		th.innerHTML = "Brand";
   	    		tbdy.appendChild(th);
   		}
   	    else if(selectedType == "brand")
   	    	{
   	    		var th = document.createElement('th');
   	    		th.innerHTML = "Brand Name";
   	    		tbdy.appendChild(th);
   	    		var th = document.createElement('th');
   	    		th.innerHTML = "Category";
   	    		tbdy.appendChild(th);
   	    	}
	   	else if(selectedType == "category")
	    	{
	    		var th = document.createElement('th');
	    		th.innerHTML = "Category Name";
	    		tbdy.appendChild(th);
	    		var th = document.createElement('th');
	    		th.innerHTML = "Segment";
	    		tbdy.appendChild(th);
	    	}
	   	else if(selectedType == "segment")
	    	{
	    		var th = document.createElement('th');
	    		th.innerHTML = "Segment Name";
	    		tbdy.appendChild(th);
	    	}
   	    
   	    if(response == "")
   	    		responseArr.length = 0;
   	   
   	    var count = 1;
   	    for (i = 0; i < responseArr.length; i++)
   	    	{
   	    		var tr = document.createElement('tr');
   	    		var field = responseArr[i];
   	    		var fieldArr = field.split(',');
   	    		var len = fieldArr.length;
   	    		for(j = 0; j < len + 2; j++)
	    		{
   	    			if(j < len)
   	    			{	
	   	    			var td = document.createElement('td');
	   	    			td.setAttribute("id", "td"+(count++));
	   	    			td.appendChild(document.createTextNode(fieldArr[j]));
   	    			}
   	    			else if(j ==  len)
	    			{
   	    				var td = document.createElement('td');
   	    				var button = document.createElement('button');
   	    				button.setAttribute("id", "edit" + (i+1));
   	    				button.setAttribute("value", "edit" + (i+1));
   	    				button.setAttribute("onclick", "editRecord(id)");
   	    				td.setAttribute("class", "edit");
   	    				button. innerHTML = "Edit";
   	    				td.appendChild(button);
	    			}
   	    			else if(j == len+1)
	    			{
   	    				var td = document.createElement('td');
   	    				var button = document.createElement('button');
   	    				button.setAttribute("id", "delete" + (i+1));
   	    				button.setAttribute("value", "delete" + (i+1));
   	    				button.setAttribute("onclick", "deleteRecord(id)");
   	    				td.setAttribute("class", "delete");
   	    				button.innerHTML = "Delete";
   	    				td.appendChild(button);
	    			}
   	    			tr.appendChild(td);
   	    		}
   	    		tbdy.appendChild(tr);
   	    	}
   	    tbl.appendChild(tbdy);
   	    tbl.setAttribute('id', 'NewTable');
   	    body.appendChild(tbl);
	    
   	    document.getElementById('table').innerHTML = document.getElementById('NewTable').innerHTML;
   	    var table = document.getElementById('table');
   	    	table.setAttribute('style', 'margin-left:13px');
	    var x = document.getElementById("NewTable");
	    x.remove(x.selectedIndex);	    
	}
	
	
	