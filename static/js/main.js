$(function(){


	

	$('#status_input_form').on('focus', function(){
		$('.show-on-status-focus').removeClass('hide')
	})
	$('#status_input_form').on('blur', function(){
		$('.show-on-status-focus').addClass('hide')
	})
})