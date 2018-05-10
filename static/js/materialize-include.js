$(function(){
	// alert("hello2")
	$('.sidenav').sidenav();
	$('.tooltipped').tooltip();
	$('.modal').modal();
	$('.tabs').tabs();
	$('.dropdown-trigger').dropdown({coverTrigger: false, constrainWidth: false});
	$('select').formSelect();
	$('.slider').slider({indicators:false});
	
})