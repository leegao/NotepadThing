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
	
	$("button").click(function(){
		$("#view").html(convertMarkdown($("#textarea").val()));
	});
	
	//Draggable stuffs
	$(function() {
		$("#draggable").draggable();
	});
	
	//Write tooltip
	$("#foo").click(function(){
		$('#draggable').show('fast',function(){
			$("#foo").hide('fast');
		});
	});
	
	//Close tooltip
	$("#closeeq").click(function(){
		$("#draggable").hide('fast', function(){
			alert("foo!");
		})
	});
});