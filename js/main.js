
function loaded() {
	alert('Loaded!');	
}


function onOnline() {
 	alert('We are online!');

	  // respond to clicks on the login and logout links
	  $('#auth-loginlink').addEventListener('click', function(){
		//FB.login();
		var thisurl = 'http://www.facebook.com/dialog/oauth/?client_id=519491361401353&redirect_uri=http://www.perisicdesigns.com';
		window.plugins.childBrowser.showWebPage(thisurl);
	  });
	  
	  $('#auth-logoutlink').addEventListener('click', function(){
		FB.logout();
	  }); 
 
}
 
function onOffline() {
 	alert('There are no internets!')
}
		
//Used to correct android issue with news and stockprices. 
 function onResume() {
         var networkState = navigator.network.connection.type;
         if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
                 onOffline();
         } else {
                 onOnline();
         }
		 
}

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//IMPORTANT: run your phonegap functions here. 
function onDeviceReady() {
   window.plugins.childBrowser.onClose = function () {
		onResume();
	};
	  
   var networkState = navigator.network.connection.type;
   if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
		   onOffline();
		  
   } else {
		   onOnline();	
   }
	//check if they have internet connection
	document.addEventListener("online", onOnline, false);
	//check if they are offline
	document.addEventListener("offline", onOffline, false);
	loaded();
}; //END device ready!!