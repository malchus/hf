// HolyFLip Javascript //

// Login Bits //
$(document).ready(function(){


// document.cookie="HFname=John Doe; expires=Thu, 18 Dec 2016 12:00:00 UTC; path=/"; <- Make the Cookie


function getCookie () {			// Check for previous Session Cookie//
	var breakCookie = document.cookie.split(';');
	var crumb = breakCookie.length;
	var x = 0
	while (x < crumb) {
		
		if (breakCookie[x].indexOf("HFname") > 0){
		$('<div>' + breakCookie[x] + '</div>').appendTo('#account');
		}
		x++;
	}
	
}








p1 = document.URL.split('&');																	// Variable to pull parameters from URl


if ( p1[1] ) {
		newFlip = "/a/bible/api/" + $( "#switchVersion" ).val() + "/" + p1[3] + "/" + p1[4] + "/" + p1[5];
		ShowVerse(newFlip);
	} else {  															// idea to determine if user is using bookmark or initiating newflip //
		newFlip = "/a/bible/flip/json/" + $( "#switchVersion" ).val();
}

// Function that grabs verses from drupal api  and displays it to a page. //
function ShowVerse (call) {																		// call is path to json api //
	$.getJSON(call, function( data ) {															// Json Call to api //
  	var items = [];																				// Place holder for verse array //
  	var verses = data.nodes.length // Number of Verse passed through JSON to display.			// Count the number of verses from call //
  	var verseLoop=0; // Counter for display verses.												// Counter for while loop //
  	translation = data.nodes[0].node.Synonyms;			
  	book = data.nodes[0].node.field_book;
  	chapter = data.nodes[0].node.field_chapter;
  	verse = data.nodes[0].node.field_verse;
  	while (verseLoop < verses) {
  		items.push( '<h2 class="verse">' + data.nodes[verseLoop].node.title + '</h2><p>' + data.nodes[verseLoop].node.body + '</p><span>' + data.nodes[verseLoop].node.field_translation + '</span>');
  		verseLoop++ }
	$( ".flip" ).empty().append(items);	
		history.pushState(null, "", "?&verse&" + translation + "&" + book + "&" + chapter + "&" + verse );	
		$(document).prop('title', data.nodes[0].node.title + ' | HolyFlip!'); 				// Change the Page title //
		
		

});


}
// End Grabber Function //


// Flip //
$( "#switch" ).click(function () {
	
 ShowVerse("/a/bible/flip/json/" + $( "#switchVersion" ).val());
 window.onpopstate = function(event) {
			
	p2 = document.URL.split('&');
		newFlip2 = "/j/?&verse&" + $( "#switchVersion" ).val() + "&" + p2[3] + "&" + p2[4] + "&" + p2[5];
  		window.location.replace(newFlip2);		
  		
  					// Adds URL of the New Flip for Bookmarking purposes //	
	};
});


// End Flip//

// make a history (most recent five verses) can also use this to help with back button problem. ///




// Read in Context
function ShowChapter() { 
	var urlGet = document.URL.split('&');
	var base = "/a/bible/reader/" + $( "#switchVersion" ).val() + "/" + urlGet[3] + "/" + urlGet[4];

	$.getJSON(base, function( data ) {	
	var verseCounter = data.nodes.length;
	var x = 0;
	while (x < verseCounter) {
		$('<p>'+ data.nodes[x].node.field_verse + " " + data.nodes[x].node.body +'</p>').appendTo('.chapterReader');
		x++
	}
	
	});

}


$('.chapterReader h2').click(function(){
	ShowChapter();
});


// Finish Context Reader


// closing document ready brack 

});




