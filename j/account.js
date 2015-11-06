$(document).ready(function(){

$('#settings').append('<div>Hello ' + $.cookie("username") + '</div>');

// Ajax call to login after form submission //
				
$( "form" ).on( "submit", function( event ) {
	event.preventDefault();
	var frm = $('form');
	var formData = frm.serializeArray();

	logMeIn = {"username": formData[0].value, "password":formData[1].value};
	$.post( "/a/bible/serve/user/login", logMeIn)
			.done(function( data ) {
				sessName = data.session_name;
        		sessId = data.sessid;
        		document.cookie="HFSessionName=" + sessName;
        		document.cookie="HFSessID=" + sessId;
        		document.cookie="username=" + data.user.name;
        		document.cookie="token=" + data.token;
				$('body').append('<div>' + data.sessid + '</div>');
				$('body').append('<div>' + data.user.name + '</div>');	
				$('body').append('<div>' + document.cookie + '</div>');	
				console.log("got CRSF-Token:", data.token);	
 			});
});
				
				
			
		

// Get Comments //
$('#comment').click(function(){
	$.ajax({
    	url: '/a/bible/serve/api-comments?nid=105509',
		headers: {
			'Authorization':'Basic dGVzdDpKYW1tZXIxMg==',
			'Content-Type':'application/json'
    	},
		success: function(data){
			$.each(data, function( a ) {
  				$('<p>'+ (data[a].subject) + '</p>').appendTo('.comments')
			});
    	}
  	});
	
})
//End Get Comments



})

