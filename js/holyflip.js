	
$(document).ready(function(){
	// Open reload and fade in functions
	function reloadPage(){location.reload();}
	$('body').hide().fadeIn(2000) ;	

	// Array for Bible Books
	var item_array = ["genesis", "exodus", "john"];
	var random_item = item_array[Math.floor(Math.random() * item_array.length)];

	// Write the Verse to the Page
	$.getJSON('books/'+ random_item + '.json', function(jd) {
               
		// Finds the number of chapters from a chosen book.
		function countChapters(obj) {
 			var prop;
  			var propCount = 0;
			for (prop in obj) {
    				propCount++;
  			}
  			return propCount;
		}
		
		
		// Randomize the chapter
		var c = Math.floor((Math.random() * countChapters(jd.book)) + 1);
		
		// Find the number of verses in the random chapter
		function countVerses(obj) {
                        var prop;
                        var propCount = 0;
                        for (prop in obj) {
                                propCount++;
                        }
                        return propCount;
                }
		
		// Randomize verse number
		var v = Math.floor((Math.random() * countVerses(jd.book[c].chapter)) + 1);
	
		// Writes the Verse to the stage
		$('#stage').html('<strong>' + jd.book_name + " " + jd.book[c].chapter_nr  + ":" + jd.book[c].chapter[v].verse_nr  + '</strong>'); 
		$('#stage').append('<p> ' + jd.book[c].chapter[v].verse  + '</p>'); 
        
		// Control the Read Chapter in Context button
        	$('#readChapter').click(function() {
		$('#context').html("<h2>" + jd.book_name + " " + jd.book[c].chapter_nr + "</hr>");
		var vCount = countVerses(jd.book[c].chapter);
		var x = 0
		while (x <= vCount)
			{
				x++
				$('#context').append("<p>" + jd.book[c].chapter[x].verse_nr + ": " + jd.book[c].chapter[v].verse +"</p>");
			}
       		 });

		
 
	 });
								
	// Control the Holy Flip button
	$('#holyFlip').click(function() {
		$("body").fadeOut(1000,reloadPage)	
	});








});
