function convertMarkdown(text){
	var converter= new Showdown.converter();
	return converter.makeHtml(text);
}

$(document).ready(function(){
	//editor = ace.edit("editor");
    //document.getElementById('editor').style.fontSize='15px';

	//Top arrow
	$("#arrow").click(function(){
		$("#intro").slideToggle("slow");
	});
	
	//Convert to markdown
	// $("button").click(function(){
		// $("#view").html(convertMarkdown($("#textarea").val()));
		// $('#view code').addClass('prettyprint');
		// prettyPrint(); //Pretty print
	// });
	
	//Draggable stuffs
	$(function() {
		$("#draggable").not("canvas").draggable({ handle: '#closeeq' });
		//$("canvas")
	});
	
	//Write tooltip
	$("#foo").click(function(){
		$('#draggable').show('fast',function(){
			$("#foo").hide('fast');
		});
	});
	
	//Close tooltip
	$(".cancel").click(function(){
		$("#draggable").hide('fast', function(){
			//alert("foo!");
		})
	});
});