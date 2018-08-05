
$('.dropdown-trigger.filter-dropdown').dropdown({constrainWidth: false});

setTimeout(function(){ $('.recent-updates-indicator-mobile').hide(); }, 10000);

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
    $('#UpdateStatus').height("270");
    $('.show-on-status-focus').addClass('scale-in');
});
// localStorage.clear();
var motivate_interval = 10*60*1000;

function get_time_difference(difference, interval){

    var result = interval - difference;
    return humanizeDuration(result, { round: true, delimiter: ' and ' })
}


$('.extra-content-popup-show').on('click', function(){
    var actionurl = $(this).data('actionurl');
    $.ajax({
        type: 'GET',
        url: actionurl,
        success: function(data){
            $('#entra-content-modal').html(data);
        },
        error: function(x, t, m) {
            if(t==="timeout") {
                M.toast({html: 'Connection Error', classes: "red"})
            }
            else {
                M.toast({html: t, classes: "red"})
            }
        }
    });
});


$('.action-buttons').on('click', function(){
    el = $(this);
	actionurl = el.data('url');
    userid = el.data('userid');
    success_message = el.data('successmessage')
	type = el.data('type')
	$.ajax({
            type: 'POST',
            url: actionurl,
            timeout: 4000,
            success: function(data) {
                M.toast({html: success_message, classes: "green"})

                if(type === "follow"){
                    el.remove();
                }
                else{
                    var now = new Date();
                    localStorage.setItem(userid, now);
                }
            },
            fail: function() {
                if(type === "follow"){
                    el.show()    
                }
                
            },
            beforeSend: function(xhr) {
                $('.user-section-preloader-'+userid).removeClass('hide');
                if(type === "follow"){
                    el.hide()    
                }
                else{
                    if (localStorage.getItem(userid)){
                        var clicked_time = Date.parse(localStorage.getItem(userid));
                        var current_now = new Date();
                        if((current_now - clicked_time) < motivate_interval){
                            var html = "You can motivate in " + get_time_difference(current_now - clicked_time, motivate_interval);
                            M.toast({html: html, classes: "red"});
                            $('.user-section-preloader-'+userid).addClass('hide');
                            xhr.abort();
                        }
                    }
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
