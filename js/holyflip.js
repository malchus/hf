// Global Variables
holyFlip = "/a/bible/flip/json"
// Write the Verse to the Stage //

function stageWriter(sTranslation, sBook, sChapter, sVerse) {
	$.getJSON('books/' + sTranslation + '/' + sBook + '.json', function(data) {
			$("#stage").fadeToggle(1000, function(){
			$("#stage").html(
				"<h1>" + data.book_name + ' ' + data.book[sChapter].chapter_nr + ':' + data.book[sChapter].chapter[sVerse].verse_nr + '</h1><p>' +
				data.book[sChapter].chapter[sVerse].verse + '</p><span>'+ sTranslation +"</span>"
				).fadeToggle();});


		// Find the number of verses in the random chapter
		function countVerses(obj) {var prop;var propCount = 0;for (prop in obj) {propCount++;}return propCount;}

		vCount = countVerses(data.book[sChapter].chapter);  // Logs Number of Verses to Global in case of Version Switch.	
			
			$('#context').html("<h2>" + data.book_name + " " + data.book[sChapter].chapter_nr + "</h2>");
				var x = 1;
				while (x <= vCount){ 
				
			$('#context').append("<p><span class='sup'>" + data.book[sChapter].chapter[x].verse_nr + "</span> " + data.book[sChapter].chapter[x].verse +"</p>");
			x++;		
		}; 	
				
				
	})
};

$(document).ready(function(){
		

// New random flip function
					
$('#holyFlip').click(function() {
	randomDecider();	
	});	
	
$('#previousChapter').click(function () {
	prev();
		})
		
$('#nextChapter').click(function () {
	next();
		})		
						
// Translation Selector FIX //	

$( ".translator" ).change(function() {
	$( "select option:selected" ).each(function() {		
		version_selector = $( this ).val();
		stageWriter(version_array[version_selector], book, chapter, verse)	;
			}); });
		







});



function prev() {
	if (chapter > 1) {
		chapter -- ;	
		stageWriter(version_array[version_selector], book, chapter, verse);
	}
	else {alert("No previous chapter, genious")}
};

function next() {
	if (chapter > 1) {
		chapter ++ ;	
		stageWriter(version_array[version_selector], book, chapter, verse);
	}
	else {alert("No next")}
};


//Initial Flipper  	

function randomDecider() {
var random_item = item_array[Math.floor(Math.random() * item_array.length)]; // Random Choice of Book
	
	// Get from Json File //	
	$.getJSON(current_version + random_item + '.json', function(jd) {

		// Finds the number of chapters from a chosen book.
		function countChapters(obj) {var prop;var propCount = 0;for (prop in obj) {propCount++;}return propCount;}
		 
		// Randomize the chapter
		var c = Math.floor((Math.random() * countChapters(jd.book)) + 1);
		
		// Find the number of verses in the random chapter
		function countVerses(obj) {var prop;var propCount = 0;for (prop in obj) {propCount++;}return propCount;}
		
		// Randomize verse number
		var v = Math.floor((Math.random() * countVerses(jd.book[c].chapter)) + 1);

		// Update Globals
		book = random_item;
		chapter = jd.book[c].chapter_nr;
		verse =jd.book[c].chapter[v].verse_nr;  	
		vCount = countVerses(jd.book[c].chapter);  // Logs Number of Verses to Global in case of Version Switch.
			stageWriter(version_array[version_selector], book, chapter, verse);
  	});

}