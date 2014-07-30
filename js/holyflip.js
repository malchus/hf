// Global Variables

item_array = ["genesis", "exodus", "leviticus", "numbers", "deuteronomy","joshua", "judges", "ruth", "1sam", "2sam", "1kings", "2kings", "1chronicles", "2chronicles", "ezra","nehemiah", "esther", "job", "psalms", "proverbs", "ecclesiastes","songofsolomon", "isaiah", "jeremiah", "lamentations","ezekiel","daniel","hosea","joel","amos","obadiah","jonah","micah","nahum","habakkuk","zephaniah","haggai","zechariah","malachi","matthew","mark","luke","john","acts","romans","1corinthians","2corinthians","galatians","ephesians","philippians","colossians","1thessalonians","2thessalonians","1timothy","2timothy","titus","philemon","hebrews","james","1peter","2peter","1john","2john","3john","jude","revelation"];
version_array = ["kjv","nasb","amp"];
version_selector = 0;
book = null;
chapter = null;
verse = null;
current_version ="books/"+version_array[version_selector]+"/";





// Write the Verse to the Stage //
function stageWriter(bookname, chapternumber, versenumber) {
	$("#stage").fadeToggle(1000, function(){$('#stage').html('<h1>' + bookname  + ' ' + chapternumber.chapter_nr + ":" + versenumber.verse_nr  + '</h1>').append('<p> ' + versenumber.verse  + '</p><span>' + version_array[version_selector] + '</span>').fadeToggle();});
	$('#context').html("<h2>" + bookname + " " + chapternumber.chapter_nr + "</h2>");
		var x = 0;
		while (x <= vCount){ 
			x++;
			$('#context').append("<p><span class='sup'>" + chapternumber.chapter[x].verse_nr + "</span> " + chapternumber.chapter[x].verse +"</p>");
		};  
}

$(document).ready(function(){
				
		
// Translation Selector //		
$( ".translator" ).change(function() {
	$( "select option:selected" ).each(function() {
		
		version_selector = $( this ).val();
		$.getJSON('books/' + version_array[version_selector] +'/'+ book +'.json', function(d) {
			stageWriter(d.book_name,d.book[chapter],d.book[chapter].chapter[verse]);
		})	}); });
		
//Initial Flipper  	
$('#holyFlip').click(function() {
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
		
		// Writes the Verse to the stage and context
		stageWriter(jd.book_name , jd.book[c], jd.book[c].chapter[v]);
			
  	});		
 
 });

});
