if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem("community_slug", "{{ community_slug }}");
    sessionStorage.setItem("user_profile_id", "{{ user_id }}");
} else {
  console.log("Local storage not available for your browser")
}

var root = document.getElementById("codeilm");
if(!root){
	alert("The document doesn't have an element with id root!")
}

var head = document.getElementsByTagName('HEAD')[0];
var x = document.querySelector('meta[name="viewport"]');
if(!x) {
	var meta = document.createElement('meta');
	meta.name = "viewport";
	meta.content = "width=device-width, initial-scale=1.0";
	head.appendChild(meta)
}




var css_link = document.createElement('link');
css_link.rel = 'stylesheet';
css_link.type = 'text/css';
css_link.href = '{{ css_file }}';
head.appendChild(css_link);


var js_link = document.createElement('script');
js_link.type = 'text/javascript';
js_link.src = '{{ js_file }}';
head.appendChild(js_link);