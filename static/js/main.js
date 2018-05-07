$(function(){
	$('.add-pulse').hover(
		function(){
			$(this).toggleClass("pulse")
	});
	$('#status_input').on('focus', function(){
		$('.show-on-status-focus').removeClass('hide')
	})
	$('#status_input').on('blur', function(){
		$('.show-on-status-focus').addClass('hide')
	})
})