
function loaded() {
	alert('Loaded!');	
}

function getFBstuff(){
	var token = localStorage['url'];
	token = token.match(/=(.*?)&/);
	console.log(token[1])
	  
	var url = 'https://graph.facebook.com/me/?access_token='+token[1];
	console.log(url);  
	  $.getJSON(url,function(json){
			console.log(json);
			$('#name').html(json['first_name']);
			$('#lastname').html(json['last_name']);
			$('#username').html(json['username']);
			$('#city').html(json.location['name']);
		  });		
}


function onOnline() {
 	alert('We are online!');

	  // respond to clicks on the login and logout links
	  $('#auth-loginlink').bind('click', function(){
		//FB.login();
		//http://www.facebook.com/dialog/oauth/?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URL&state=YOUR_STATE_VALUE&scope=COMMA_SEPARATED_LIST_OF_PERMISSION_NAMES
		var thisurl = 'http://www.facebook.com/dialog/oauth/?client_id=519491361401353&redirect_uri='+window.location+'&response_type=token&display=touch';
		window.plugins.childBrowser.showWebPage(thisurl);
		window.plugins.childBrowser.onLocationChange = function (url) {
    														console.log('childBrowser has loaded ' + url);
															localStorage["url"] = url;
														};
		window.plugins.childBrowser.onClose = function () {
    											alert('childBrowser has closed');
												getFBstuff();
												};
	  });
	  
	  
	  /*$('#auth-logoutlink').addEventListener('click', function(){
		FB.logout();
	  }); */
 
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