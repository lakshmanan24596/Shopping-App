
	function deleteRecord(id)
	{
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
		
		var xmlObj = new XMLHttpRequest();
		xmlObj.onreadystatechange = function() 
	    {
	       if(xmlObj.readyState == 4 && xmlObj.status == 200) 
	       {
	    	     	var response = xmlObj.responseText.trim();
	    	     	document.getElementById('hidden1').value = type;
	    	     	document.getElementById('hidden2').value = response;
	    	     	document.getElementById('text').innerHTML = "Are you sure you want to delete " + response + " " + type + "?";
	       }    
	    }
	    xmlObj.open("GET", "deletePopup?type="+type+"&offset="+offset, true); 
	    xmlObj.send();
	    
		modal.style.display = "block";
		var modalContent = document.getElementById('modalContent');
		var div = document.getElementById("modalData");
					
		div.innerHTML =
			'<h4 align="center" id="text"></h4><br>'+
			'<form action= "deleteData">'+
				'<input type="hidden" id="hidden1" name="type" value="">'+
				'<input type="hidden" id="hidden2" name="recordName" value="">'+
				'<div style="text-align:center">'+
					'<button type="submit" style="border: 2px solid #f44336; display:inline block; margin:10px">Delete</button>'+
					'<button type="button" onclick="hideModal()" style="border: 2px solid #4CAF50; display:inline block; margin:10px">Cancel</button>'+
				'</div>'+
			'</form>	';
		modalContent.appendChild(div);
	}
	
	function hideModal()
	{
		var modal = document.getElementById('myModal');		
		modal.style.display = "none";
	}
	
	
	