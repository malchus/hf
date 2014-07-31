// Global Variables

item_array = ["genesis", "exodus", "leviticus", "numbers", "deuteronomy","joshua", "judges", "ruth", "1sam", "2sam", "1kings", "2kings", "1chronicles", "2chronicles", "ezra","nehemiah", "esther", "job", "psalms", "proverbs", "ecclesiastes","songofsolomon", "isaiah", "jeremiah", "lamentations","ezekiel","daniel","hosea","joel","amos","obadiah","jonah","micah","nahum","habakkuk","zephaniah","haggai","zechariah","malachi","matthew","mark","luke","john","acts","romans","1corinthians","2corinthians","galatians","ephesians","philippians","colossians","1thessalonians","2thessalonians","1timothy","2timothy","titus","philemon","hebrews","james","1peter","2peter","1john","2john","3john","jude","revelation"];
version_array = ["kjv","nasb","amp"];
version_selector = 0;
book = null;
chapter = null;
verse = null;
current_version ="books/"+version_array[version_selector]+"/";






// Write the Verse to the Stage //

function stageWriter(sTranslation, sBook, sChapter, sVerse) {
	$.getJSON('books/' + sTranslation + '/' + sBook + '.json', function(data) {
			$("#stage").fadeToggle(1000, function(){
			$("#stage").html(
				"<h1>" + data.book_name + ' ' + data.book[sChapter].chapter_nr + ':' + data.book[sChapter].chapter[sVerse].verse_nr + '</h1><p>' +
				data.book[sChapter].chapter[sVerse].verse + '</p>'
				).fadeToggle();});


		// Find the number of verses in the random chapter
		function countVerses(obj) {var prop;var propCount = 0;for (prop in obj) {propCount++;}return propCount;}

		vCount = countVerses(data.book[10].chapter);  // Logs Number of Verses to Global in case of Version Switch.	
			
			$('#context').html("<h2>" + data.book_name + " " + data.book[sChapter].chapter_nr + "</h2>");
				var x = 1;
				while (x <= vCount){ 
				
			$('#context').append("<p><span class='sup'>" + data.book[sChapter].chapter[x].verse_nr + "</span> " + data.book[sChapter].chapter[x].verse +"</p>");
			x++;		
		}; 	
				
				
	})
};

$(document).ready(function(){
	randomDecider();					
						
// New random flip function
					
$('#holyFlip').click(function() {
		randomDecider();
		stageWriter(version_array[version_selector], book, chapter, verse);		
 });	
						
// Translation Selector FIX THIS TO MATCH NEW FLIPPER//	
	
$( ".translator" ).change(function() {
	$( "select option:selected" ).each(function() {
		
		version_selector = $( this ).val();
		
		$.getJSON(current_version + book +'.json', function(d) {
			stageWriter(d.book_name,d.book[chapter],d.book[chapter].chapter[verse]);
		})	}); });
		
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
			
  	});

}



});
