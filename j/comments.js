

// Get Comments //
function getComments () {
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
  
}

//End Get Comments



//Post Comments

 function postComments () {
	var theComment = {"nid":"105509","subject":"Comment Subject Text", "comment_body":{ "und":[{ "value":"Comment body text" }] }}


 	$.ajax({
  		type: "POST",
    	url: '/a/bible/serve/comment.json',
  		headers: {
  		'Content-Type':'application/json',
  		'Authorization':'Basic dGVzdDpKYW1tZXIxMg=='
  		},
  		data: JSON.stringify(theComment),
  	
		});

  }

// End Post Comments