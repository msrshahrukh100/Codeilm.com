$('.submit-click-response').on('click', function(){
    el = $(this)
	actionurl = el.data('url')
    value = el.data('value')
	$.ajax({
            type: 'POST',
            url: actionurl,
            data: {"value": value},
            timeout: 4000,
            success: function(data) {
                M.toast({html: "Thanks for your response", classes: "green"})
                $('.feedback-form-content').removeClass('hide')
            },
            fail: function() {
                console.log("error")
                if(type === "follow"){
                    el.show()    
                }
                
            },
            beforeSend: function(xhr) {
                $('.response-preloader').removeClass('hide');
            	var csrftoken = getCookie('csrftoken');
                console.log("csrf token is " + csrftoken)
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            },
            complete: function(){
                $('.response-preloader').addClass('hide');
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

$('.submit-click-response').on('mouseenter mouseleave', function(){
	$(this).toggleClass('pulse')
})