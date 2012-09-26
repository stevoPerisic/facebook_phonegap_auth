
function loaded() {
	console.info('Loaded!');	
}

/*function getFBstuff(){
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
}*/


function onOnline() {
 		alert('We are online!');
		 
		$('#auth-loginlink').bind('click', function(){
			var thisurl = 'http://www.facebook.com'
			window.plugins.childBrowser.showWebPage(thisurl);
			window.plugins.childBrowser.onLocationChange = function(){
					FB.init({ appId: '226909127331855', 
			 			status: true, 
			  			cookie: true,
			  			xfbml: true,
			  			oauth: true});
					FB.Event.subscribe('auth.statusChange', handleStatusChange);
				}
		});
			
		window.plugins.childBrowser.onClose = function handleStatusChange(response) {
		 //document.body.className = response.authResponse ? 'connected' : 'not_connected';
		
		 if (response) {
		   alert(response);
		  // updateUserInfo(response);
		 }
	   }

	  // respond to clicks on the login and logout links
	 // $('#auth-loginlink').bind('click', function(){
		//FB.login();
		//var thisurl = 'http://www.facebook.com/dialog/oauth/?client_id=519491361401353&&redirect_uri=http://www.facebook.com/connect/login_success.html&state=somestatevalue&response_type=token&display=touch';
		//window.plugins.childBrowser.showWebPage(thisurl);
		//window.plugins.childBrowser.onLocationChange = function (url) {
    	//													console.log('childBrowser has loaded ' + url);
		//													localStorage["url"] = url;
		//												};
		//window.plugins.childBrowser.onClose = function () {
    	//										console.info('childBrowser has closed');
		//										getFBstuff();
	//											};
	//  });
	  
	  
	  /*$('#auth-logoutlink').addEventListener('click', function(){
		FB.logout();
	  }); */
 
}
 
function onOffline() {
 	alert('There are no internets!')
}
		
//Used to correct android issue with news and stockprices. 
/* function onResume() {
         var networkState = navigator.network.connection.type;
         if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
                 onOffline();
         } else {
                 onOnline();
         }
		 
}*/

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//IMPORTANT: run your phonegap functions here. 
function onDeviceReady() {
  /* window.plugins.childBrowser.onClose = function () {
		onResume();
	};*/
	  
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