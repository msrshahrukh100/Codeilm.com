
$('.send-motivation').on('click', function(){
	actionurl = $(this).data('url')
    userid = $(this).data('userid')
	console.log(actionurl)
	$.ajax({
            type: 'POST',
            url: actionurl,
            timeout: 4000,
            success: function(data) {
                console.log(data)
                M.toast({html: 'Motivation Sent!', classes: "green"})

            },
            fail: function() {
                console.log("error")
            },
            beforeSend: function(xhr) {
                $('.user-section-preloader-'+userid).removeClass('hide');
            	var csrftoken = getCookie('csrftoken');
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            },
            complete: function(){
                $('.user-section-preloader-'+userid).addClass('hide');
            },
            error: function(x, t, m) {
                if(t==="timeout") {
                    M.toast({html: 'Connection Error', classes: "red"})
                }
                else {
                    alert(t);
                }
            }

        });
})

$('.status-list').on('click', '.load-more-status', function(){
    var el = $(this)
    actionurl = el.data('href')
    console.log(actionurl)

    $.ajax({
        type: 'GET',
        url: actionurl,
        timeout: 4000,
        success: function(data) {
            console.log(data)
            $('.temp-content').remove();
            $('.status-list').append(data);
        },
        fail: function() {
            console.log("error")
        },
        beforeSend: function(xhr) {
            // $('.user-section-preloader-'+userid).removeClass('hide');
            // var csrftoken = getCookie('csrftoken');
            // xhr.setRequestHeader('X-CSRFToken', csrftoken);
            el.hide()
            $('.show-more-status-preloader').removeClass('hide');

        },
        complete: function(){
            
        },
        error: function(x, t, m) {
            if(t==="timeout") {
                M.toast({html: 'Connection Error', classes: "red"})
                $('.show-more-status-preloader').addClass('hide');
                el.show();
            }
            else {
                alert(t);
            }
        }

    });
})
