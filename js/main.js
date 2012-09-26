function onLoad() {
	//document.addEventListener("deviceready", onDeviceReady, false);
	onOnline(); 
}
// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//IMPORTANT: run your phonegap functions here. 
function onDeviceReady() {
 
   var networkState = navigator.network.connection.type;
   if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
		  alert('There are no internets!');
		  
   } else {
		   onOnline();	
   }

}; //END device ready!!

function onOnline() {
 		alert('We are online!');
		
		
		
		$('#auth-loginlink').bind('click', function(e){
			e.preventDefault();
			FB.login(function(response) {	
				if(response){
						console.log(response);
					}
					else{
							alert('no response');
						}
			});
		});	
		
	
};