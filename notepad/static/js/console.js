			function print(line) {
				//term.echo(String(line));
			}
			
			$(document).ready(function(){
				window.editor = ace.edit("editor");
				editor.setTheme("ace/theme/textmate");
				lua_input = "";
				term = $('#interpreter').terminal(function(command, term) {
					if (command !== '') {
						/*var result = window.eval("(" + command + ")");
						if (result !== undefined) {
							term.echo(String(result));
						}*/
						lua_input = lua_input+command+"\n";
						try{
							var finished = Lua.isFinished(lua_input);
							
							if (finished){
								lua_input = "";
								term.set_prompt('>');
								var result;
								if (jt(Lua.state, 0, 1, 0) == 0) 
									result = Yr(Lua.state) > 0 ? Lua.w() : n;
								else 
									Lua.A("Unknown evaluation error.")
								
								if (output !== ""){
									term.echo(output)
								}
								if (error !== ""){
									term.error(error)
								}
								error = "";
								output = "";
								if (result !== null && result !== undefined) {
								  term.echo('= ' + result);
								}
							} else {
								term.set_prompt('.');
							}
						} catch(e){
							term.set_prompt('>');
							term.error(e);
						}
						
					} else {
						if (lua_input !== ''){
							try{
								term.set_prompt('>');
								var result = Lua.eval(lua_input);
								lua_input = '';
								if (output !== ""){
									term.echo(output)
								}
								if (error !== ""){
									term.error(error)
								}
								error = "";
								output = "";
								if (result !== null && result !== undefined) {
								  term.echo('= ' + result);
								}
							} catch(e){
								term.set_prompt('>');
								term.error(e);
							}
						} else {
							term.set_prompt('>');
							term.echo('');
						}
					}
					
					
				}, {
					greetings: 'Lua 5.1  Copyright (C) 1994-2006 Lua.org, PUC-Rio\n[GCC 4.2.1 (LLVM, Emscripten 1.5)] on linux2',
					name: 'lua_interpreter',
					height: 280,
					prompt: '>',
					enable: false});
					
				term.focus(false);

				
				$(document).keydown(function(x){
					if (x.keyCode == 27){
						if (/Chrome/.test(navigator.userAgent)){
							$("#console").slideToggle();
						} else {
							$("#console").toggle();
						}
						
						term.scroll(100000);
						term.disable();
					}
				});
				
				if (/Chrome/.test(navigator.userAgent)){
					$("#run").hover(function(){$("#run").animate({"opacity": 1},150)}, function(){$("#run").animate({"opacity": 0.4},100)});
				} else {
					$("#run").hover(function(){$("#run").css("opacity", 1)}, function(){$("#run").css("opacity", 0.4)});
				}
						
				var LuaScriptMode = require("ace/mode/lua").Mode;
				editor.getSession().setMode(new LuaScriptMode());
				editor.getSession().setUseWrapMode(true);
				
				var session = localStorage.getItem("last-session") || "";
				editor.getSession().setValue(session);
				output = "";
				error = "";
				
				Lua.initialize(null, function (chr) {
				  if (chr !== null) output += (String.fromCharCode(chr));
				}, function (chr) {
				  if (chr !== null) error += (String.fromCharCode(chr));
				});
				
				$(editor).click(function() {
					term.disable();
				})
				
				// load see
				//Lua.eval(see);
				
				$("#run").click(function() {
					var input = editor.getSession().getValue();
					localStorage.setItem("last-session", input);
					term.enable();
					term.echo("> "+input.split("\n").map(
						function(x,i){
							if (i == 0) 
								return x;
							else 
								return '. '+x;
						}).join("\n"));
					term.echo('\n');
					//if (Lua.isFinished(input)) {
					try{
						var result = Lua.eval(input);
						if (output !== ""){
							term.echo(output)
						}
						if (error !== ""){
							term.error(error)
						}
						error = "";
						output = "";
						if (result !== null && result !== undefined) {
						  term.echo('= ' + result);
						}
					} catch(e){
						term.error(e);
					}
					//} else {
					//	term.echo('Command not finished.');
					//}
					});
				});
			
			$(document).unload(function(){
				// save into 
				if (input !== "")
					localStorage.setItem("last-session", input);
			});