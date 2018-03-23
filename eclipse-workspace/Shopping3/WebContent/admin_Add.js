
	function addData()
	{
		var selectedType = document.getElementById('type').value;
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
		var modalDataDiv = document.getElementById("modalData");
		var span = document.getElementsByClassName("close")[0];
		
		span.onclick = function() {
		    modal.style.display = "none";
		}
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
				
		var xmlObj = new XMLHttpRequest();
		xmlObj.onreadystatechange = function() 
	    {
	       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
	       {
	    	     	var response = xmlObj.responseText.trim();
	    	     	var responseArr = response.split('DELIMETER');
	    	     	modalDataDiv.innerHTML = responseArr[0];
	    	     	
	    	     	if(selectedType != "segment") 
	    			{
					var select = document.getElementById("selectSegmentId");
		    	     	var fields = responseArr[1].split(',');
		    	     	var responseSize = fields.length;
		    	     	
		    	     	var option = document.createElement('option');
		    	        option.value = "";
		    	        option.innerHTML = "Select Segment";
		    	        option.disabled = "disabled";
		    	        option.selected = "true";
		    	        select.appendChild(option);
		    	        
		    	   	    for (i = 0; i < responseSize; i++)
		    	   	    	{
			    	   	    var option = document.createElement('option');
			    	        option.value = fields[i];
			    	        option.innerHTML = fields[i];
			    	        select.appendChild(option);
		    	   	    	}    
	    			}	
	       }    
	    }
	    xmlObj.open("GET","addPopup?type="+selectedType, true);
	    xmlObj.send();	
	}
	
	function showCategory()
	{
		document.getElementById('selectCategoryId').options.length = 0;
		var selectBrandId = document.getElementById('selectBrandId');
		if(selectBrandId)
			selectBrandId.options.length = 0;
		
		var select = document.getElementById('selectCategoryId');
		var higherValue = document.getElementById('selectSegmentId').value;
		
		var xmlObj = new XMLHttpRequest();
		xmlObj.onreadystatechange = function() 
	    {
	       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
	       {
	    	     	var response = xmlObj.responseText.trim();
	    	     	var fields = response.split(',');
	    	     	var responseSize = fields.length;
	    	     	var option = document.createElement('option');
	    	        option.value = "";
	    	        option.innerHTML = "Select Category";
	    	        option.disabled = "disabled";
	    	        option.selected = "true";
	    	        select.appendChild(option);
	    	        
	    	        if(response == "")
	    	        		return;
	    	   	    for (i = 0; i < responseSize; i++)
	    	   	    	{
		    	   	    var option = document.createElement('option');
		    	        option.value = fields[i];
		    	        option.innerHTML = fields[i];
		    	        select.appendChild(option);
	    	   	    	}
	       }    
	    }
	    xmlObj.open("GET", "addSelectbox?type=category&higherValue="+higherValue, true);
	    xmlObj.send();
	}
	
	function showBrand()
	{
		document.getElementById('selectBrandId').options.length = 0;
		var select = document.getElementById('selectBrandId');
		var higherValue = document.getElementById('selectCategoryId').value;
		
		var xmlObj = new XMLHttpRequest();
		xmlObj.onreadystatechange = function() 
	    {
	       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
	       {
	    	     	var response = xmlObj.responseText.trim();
	    	     	var fields = response.split(',');
	    	     	var responseSize = fields.length;
	    	     	var option = document.createElement('option');
	    	        option.value = "";
	    	        option.innerHTML = "Select Brand";
	    	        option.disabled = "disabled";
	    	        option.selected = "true";
	    	        select.appendChild(option);
	    	        
	    	        if(response == "")
    	        			return;
	    	   	    for (i = 0; i < responseSize; i++)
	    	   	    	{
		    	   	    var option = document.createElement('option');
		    	        option.value = fields[i];
		    	        option.innerHTML = fields[i];
		    	        select.appendChild(option);
	    	   	    	}
	       }    
	    }
	    xmlObj.open("GET", "addSelectbox?type=brand&higherValue="+higherValue, true);
	    xmlObj.send();
	}
