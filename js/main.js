function loaded() {
	console.info('Loaded!');	
}

function onOnline() {
 		alert('We are online!');
}
 
function onOffline() {
 	alert('There are no internets!')
}

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//IMPORTANT: run your phonegap functions here. 
function onDeviceReady() {
 
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