// Global Variables

item_array = ["genesis", "exodus", "leviticus", "numbers", "deuteronomy","joshua", "judges", "ruth", "1sam", "2sam", "1kings", "2kings", "1chronicles", "2chronicles", "ezra","nehemiah", "esther", "job", "psalms", "proverbs", "ecclesiastes","songofsolomon", "isaiah", "jeremiah", "lamentations","ezekiel","daniel","hosea","joel","amos","obadiah","jonah","micah","nahum","habakkuk","zephaniah","haggai","zechariah","malachi","matthew","mark","luke","john","acts","romans","1corinthians","2corinthians","galatians","ephesians","philippians","colossians","1thessalonians","2thessalonians","1timothy","2timothy","titus","philemon","hebrews","james","1peter","2peter","1john","2john","3john","jude","revelation"];
version_array = ["kjv","nasb"];
version_selector = 0;
book = null;
chapter = null;
verse = null;
current_version ="books/"+version_array[version_selector]+"/";


// Write the Verse to the Stage //
function stageWriter(bookname, chapternumber, versenumber) {$("#stage").fadeToggle(1000, function(){$('#stage').html('<h1>' + bookname  + ' ' + chapternumber + ":" + versenumber.verse_nr  + '</h1>').append('<p> ' + versenumber.verse  + '</p><span>' + version_array[version_selector] + '</span>').fadeToggle();});}

	
$(document).ready(function(){
		
$( "#nasb" ).click(function() {
		version_selector = 1;
		$.getJSON('books/nasb/'+book+'.json', function(d) {

		console.log( "nasb success" );
		var c = chapter;
		var v = verse;
		$('#stage').html('<h1>' + d.book_name + " " + d.book[c].chapter_nr  + ":" + d.book[c].chapter[v].verse_nr  + '</h1>').append('<p> ' + d.book[c].chapter[v].verse  + '</p><span>' + version_array[version_selector] + '</span>'); 

		// Display the Chapter in Context.	
		$('#context').html("<h2>" + d.book_name + " " + d.book[c].chapter_nr + "</h2>");
		function countVerses(obj) {var prop;var propCount = 0;for (prop in obj) {propCount++;}return propCount;}
		
		var vCount = countVerses(d.book[c].chapter);
		var x = 0;
		while (x <= vCount)
			{	console.log("counter")
				x++
				$('#context').append("<p><span class='sup'>" + d.book[c].chapter[x].verse_nr + "</span> " + d.book[c].chapter[x].verse +"</p>");
			};  


		})	
});
  	
		
	
	
	
		
$( "#kjv" ).click(function() {
		version_selector = 0;
		$.getJSON('books/kjv/'+book+'.json', function(d) {

		console.log( "kjv success" );
		var c = chapter;
		var v = verse;
		$('#stage').html('<h1>' + d.book_name + " " + d.book[c].chapter_nr  + ":" + d.book[c].chapter[v].verse_nr  + '</h1>').append('<p> ' + d.book[c].chapter[v].verse  + '</p><span>' + version_array[version_selector] + '</span>'); 

		// Display the Chapter in Context.	
		$('#context').html("<h2>" + d.book_name + " " + d.book[c].chapter_nr + "</h2>");
		function countVerses(obj) {var prop;var propCount = 0;for (prop in obj) {propCount++;}return propCount;}
		
		var vCount = countVerses(d.book[c].chapter);
		var x = 0;
		while (x <= vCount)
			{	console.log("counter")
				x++
				$('#context').append("<p><span class='sup'>" + d.book[c].chapter[x].verse_nr + "</span> " + d.book[c].chapter[x].verse +"</p>");
			};  


		})	
});
  	






$('#holyFlip').click(function() {
	
	// Array for Bible Books	
	var random_item = item_array[Math.floor(Math.random() * item_array.length)];
	
	// Write the Verse to the Page //	
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
		
		
		// Writes the Verse to the stage
		stageWriter(jd.book_name , jd.book[c].chapter_nr, jd.book[c].chapter[v]);
             
		
		
		// Display the Chapter in Context.	
		$('#context').html("<h2>" + jd.book_name + " " + jd.book[c].chapter_nr + "</h2>");
		
		var vCount = countVerses(jd.book[c].chapter);
		var x = 0;
		
		
		
		while (x <= vCount)
			{
				x++
				$('#context').append("<p><span class='sup'>" + jd.book[c].chapter[x].verse_nr + "</span> " + jd.book[c].chapter[x].verse +"</p>");		
						
			};  
		
		

			
  	});
  	
    	
		
 
	 });
			
			
			
			
								





});
