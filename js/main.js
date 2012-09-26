function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
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
		//this to check for fb-root
		$('#fb-root').css({'height': 20, 'width': '100%'}).html('<p>This is the fb-root</p>');
		
	
		FB.init({ 
			appId: '401203346613814', 
			status: true, 
			cookie: true,
			xfbml: true,
			oauth: true
		});
		
		$('#auth-loginlink').bind('click', function(){
			e.preventDefault();
			FB.login(function(response) {	
				if(response){
						alert(response);
					}
					else{
							alert('no response');
						}
			});
		});	
		
	
};