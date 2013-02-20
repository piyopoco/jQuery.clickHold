(function( $ ){
	
	$.fn.clickHold = function( callback, completeCallback ) {
		
		var holdTime = 50;
		var intervalExeTime = 10;

		var iniTimer = [];
		var count = 0;
		var intervalTimer;
		var active;

		var clearIniInterval = function(){
			//console.log('clearIniInterval');
			$.each(iniTimer, function(i){
				clearInterval(iniTimer[i]);
			});
			iniTimer=[];
			count = 0;
		}
		
		return this.mousedown(function(){
			
			callback();

			var isiid = setInterval(function(){
				//console.log(count);
				if(count > holdTime){
					clearIniInterval();
					active = true;
					console.log('exe')
					intervalTimer = setInterval(function(){ callback();}, intervalExeTime);
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
