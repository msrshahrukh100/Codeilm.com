
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
