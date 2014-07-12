	
$(document).ready(function(){
	function reloadPage(){location.reload();}
	$('body').hide().fadeIn(2000) ;	

	
		
var item_array = ["genesis", "exodus", "john"];
var random_item = item_array[Math.floor(Math.random() * item_array.length)];

	


	
	$.getJSON('books/'+ random_item + '.json', function(jd) {
		var c = Math.floor((Math.random() * 21) + 1);
		var v = Math.floor((Math.random() * 15) + 1);
		$('#stage').html('<strong>' + jd.book_name + " " + jd.book[c].chapter_nr  + ":" + jd.book[c].chapter[v].verse_nr  + '</strong>'); 
		 $('#stage').append('<p> ' + jd.book[c].chapter[v].verse  + '</p>'); 
          });
								
	$('#something').click(function() {
		$("body").fadeOut(1000,reloadPage)	});

});
