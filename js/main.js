
function loaded() {
	console.info('Loaded!');	
}

function getFBstuff(){
	alert('This is the url: ' + localStorage['url']);
	var token = localStorage['url'];
	token = token.split("&");
	//token = token.match(/=(.*?)&/);
	//alert('This is the token at 0: ' + token[0]);
	//alert('This is the token at 1: ' + token[1]);
	//alert('This is the token at 2: ' + token[2]);
	//alert('This is the token at 3: ' + token[3]);
	  
	var url = 'https://graph.facebook.com/me/?'+token[1];
	alert(url);  
	  $.getJSON(url,function(json){
			console.log(json);
			$('#name').html(json['first_name']);
			$('#lastname').html(json['last_name']);
			$('#username').html(json['username']);
			$('#city').html(json.location['name']);
		  });		
}


function onOnline() {
 		console.info('We are online!');

	  // respond to clicks on the login and logout links
	  $('#auth-loginlink').bind('click', function(){
		//FB.login();
		//http://www.facebook.com/dialog/oauth/?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URL&state=YOUR_STATE_VALUE&scope=COMMA_SEPARATED_LIST_OF_PERMISSION_NAMES
		var thisurl = 'http://www.facebook.com/dialog/oauth/?client_id=401203346613814&&redirect_uri=http://www.facebook.com/connect/login_success.html&state=somestatevalue&response_type=token&display=touch';
		window.plugins.childBrowser.showWebPage(thisurl);
		window.plugins.childBrowser.onLocationChange = function (url) {
    														//alert('childBrowser has loaded ' + url);
															localStorage["url"] = url;
														};
		window.plugins.childBrowser.onClose = function () {
    											console.info('childBrowser has closed');
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