(function( $ ){
	
	$.fn.clickHold = function( callback, completeCallback ) {
		
		var holdTime = 50;
		var intervalExeTime = 10;

		var iniTimer = [];
		var count = 0;
		var intervalTimer;
		var active;

		var clearIniInterval = function(){
			$.each(iniTimer, function(i){
				clearInterval(iniTimer[i]);
			});
			iniTimer=[];
			count = 0;
		}
		
		return this.mousedown(function(){
			
			clearIniInterval();

			var isiid = setInterval(function(){
				if(count > holdTime){
					active = true;
					intervalTimer = setInterval(function(){ callback(); }, intervalExeTime);
				}
				count++;
			}, 1);
			iniTimer.push(isiid);
			
		}).bind('mouseup mouseout', function(){

			clearIniInterval();

			if(active){
				active = false;
				clearInterval(intervalTimer);
				if(typeof completeCallback !== 'undefined'){
					completeCallback();
				}
			}
		});
		
	}
	
})( jQuery );
