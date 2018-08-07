
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

function my_notification_callback(data) {
	$('#dropdown-notifications').html("")
	if(data.last_notifications_list.length !== 0){
		$('#dropdown-no-notification').html("")
	}
	for (var i=0; i < data.unread_list.length; i++) {
	    msg = data.unread_list[i];
	    var notification = "<li class='collection-item avatar notification-list-item'><img src="+ msg.data.image_url +" class='circle'><p class='title notification-text'>" + msg.verb + "<br><span class='grey-text right'>" + msg.timesince + " ago</span></p></li>"
	    // var notification = "<li><a href='#!'>" + msg.actor + " " + msg.verb + "</a></li>"
	    $('#dropdown-notifications').append(notification)
	    }

	for (var i=0; i < data.last_notifications_list.length; i++) {
	    msg = data.last_notifications_list[i];
	    var notification = "<li class='collection-item avatar notification-list-item'><img src="+ msg.data.image_url +" class='circle'><p class='title notification-text'>" + msg.verb + "<br><span class='grey-text right'>" + msg.timesince + " ago</span></p></li>"
	    // var notification = "<li><a href='#!'>" + msg.actor + " " + msg.verb + "</a></li>"
	    $('#dropdown-no-notification').append(notification)
	    }
}

function my_fill_notification_badge(data) {
    if(data.unread_count !== 0){
        $('#no-notification').hide()
        $('#notifications-count-active').fadeIn()
        $('#notifications-count').html(data.unread_count)
    }
    else{
        $('#notifications-count-active').hide()
        $('#no-notification').fadeIn()
    }
}

function mark_user_notifications_read(){
    var actionurl = $('#mark_notifications_read_url').data('url')
    $.ajax({
            type: 'POST',
            url: actionurl,
            success: function(data) {
                // console.log(data)
            },
            fail: function() {
                console.log("error")
            },
            beforeSend: function(xhr) {
                var csrftoken = getCookie('csrftoken');
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            },
        });
}


$('.dropdown-trigger-notification').dropdown({coverTrigger: false, constrainWidth: false, onCloseEnd: mark_user_notifications_read});


$('.insert-emoticon').on('click', function(){
	var status_input = $('#status_input');
	var emoticon = $(this).text();
	var initial_val = status_input.val();
	status_input.focus();
	status_input.val(initial_val + emoticon);
});
