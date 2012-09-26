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
		
		var e = document.createElement('script'); 
		e.async = true;
		e.src = 'https://connect.facebook.net/en_US/all.js';
		$('#fb-root').appendChild(e);
	
		
		window.fbAsyncInit = function() {
			FB.init({ 
				appId: '226909127331855', 
				status: true, 
				cookie: true,
				xfbml: true,
				oauth: true
			});
		
			FB.getLoginStatus(function(response){
				alert(response); 
			});
		
		};  
};