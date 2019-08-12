// should get the community id somehow
// make a call to the get-static-files
// embed the response to the head of the document

if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem("community_slug", "{{ community_slug }}");
} else {
  console.log("Local storage not available for your browser")
}

var root = document.getElementById("root");
if(!root){
	alert("The document doesn't have an element with id root!")
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
	  console.log(this.responseText);
	  var affiliate = document.createElement('div');
	  affiliate.id = 'affiliate';
	  affiliate.innerHTML = this.responseText
	  document.getElementsByTagName('body')[0].appendChild(affiliate)
	}
}; 

xhttp.open("GET", "https://codeilm.com/api/affiliates/get-static-files/", true);

xhttp.send();