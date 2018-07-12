
$('.dropdown-trigger.filter-dropdown').dropdown({constrainWidth: false});

var $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'vertical',

  getSortData: {
    name: '[data-name]',
    progress: function( itemElem ) {
      var progress = $( itemElem ).find('.progress').text();
      return parseFloat( progress.replace( /[\(\)]/g, '') );
    },
    progress_inv: function( itemElem ) {
      var progress = $( itemElem ).find('.progress').text();
      return 1 / parseFloat( progress.replace( /[\(\)]/g, '') );
    }
  }
});


$('.filter-by').on('click', function(e){
    e.preventDefault();
    var by = $(this).data('by');
    if(by === "increase-progress"){
        $grid.isotope({ sortBy: "progress" });
    }
    else if(by === "decrease-progress"){
        $grid.isotope({ sortBy: "progress_inv" });
    }
    else if(by === "name"){
        $grid.isotope({ sortBy: "name" });
    }
});

$('#status_input').on('focus', function(){
    $('.show-on-status-focus').removeClass('hide');
});

$('.action-buttons').on('click', function(){
    el = $(this)
	actionurl = el.data('url')
    userid = el.data('userid')
    success_message = el.data('successmessage')
	type = el.data('type')
	$.ajax({
            type: 'POST',
            url: actionurl,
            timeout: 4000,
            success: function(data) {
                M.toast({html: success_message, classes: "green"})
                if(type === "follow"){
                    el.remove()
                }
            },
            fail: function() {
                console.log("error")
                if(type === "follow"){
                    el.show()    
                }
                
            },
            beforeSend: function(xhr) {
                $('.user-section-preloader-'+userid).removeClass('hide');
                if(type === "follow"){
                    el.hide()    
                }
            	var csrftoken = getCookie('csrftoken');
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            },
            complete: function(){
                $('.user-section-preloader-'+userid).addClass('hide');
            },
            error: function(x, t, m) {
                if(t==="timeout") {
                    M.toast({html: 'Connection Error', classes: "red"})
                    if(type === "follow"){
                        el.show()    
                    }
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

    $.ajax({
        type: 'GET',
        url: actionurl,
        timeout: 4000,
        success: function(data) {
            $('.temp-content').remove();
            $('.status-list').append(data);
        },
        fail: function() {
            console.log("error")
        },
        beforeSend: function(xhr) {
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
