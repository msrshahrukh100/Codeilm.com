$(function(){

	function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
	}

	$('.send-motivation').on('click', function(){
		actionurl = $(this).data('url')
		console.log(actionurl)
		$.ajax({
                type: 'POST',
                url: actionurl,
                success: function(data) {
                    console.log(data)
                },
                fail: function() {
                    console.log("error")
                },
                beforeSend: function(xhr) {
                	var csrftoken = getCookie('csrftoken');
                    xhr.setRequestHeader('X-CSRFToken', csrftoken);
                },
            });
	})
})