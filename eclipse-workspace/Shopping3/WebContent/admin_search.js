		
	function searchOptionList()
	{
		var selectedValue = document.getElementById("searchId").value;
		var dataList = document.getElementById('Datalist');		
		document.getElementById('Datalist').innerHTML = "";
		var type = document.getElementById("type").value;
		
		var xmlObj = new XMLHttpRequest();
		xmlObj.onreadystatechange = function() 
	    {
	       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
	       {
	    	   		var response = xmlObj.responseText.trim();
	    	   	    var fields = response.split(',');
	    	   	    for (i = 0; i < fields.length; i++)
	    	   	    	{
		    	   	    var option = document.createElement('option');
		    	        option.value = fields[i].trim();
		    	        dataList.appendChild(option);
	    	   	    	}
	       }
	    }
		xmlObj.open("GET", "searchOption?value="+selectedValue+"&type="+type, true);
		xmlObj.send();
	}