
function loaded() {
	alert('Loaded!');	
}


function onOnline() {
 	alert('We are online!');
	// Load the SDK Asynchronously
  (function(d){
	 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement('script'); js.id = id; js.async = true;
	 js.src = "//connect.facebook.net/en_US/all.js";
	 ref.parentNode.insertBefore(js, ref);
   }(document));
   
    // Init the SDK upon load
	window.fbAsyncInit = function() {
	  FB.init({
		appId      : '519491361401353', // App ID
		channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	  });
	  
	  // listen for and handle auth.statusChange events
	  FB.Event.subscribe('auth.statusChange', function(response) {
		if (response.authResponse) {
		  console.log(response);
		  // user has auth'd your app and is logged into Facebook
		  FB.api('/me', function(me){
		  console.log(me);
			if (me.name) {
			  document.getElementById('auth-displayname').innerHTML = me.name;
			}
		  })
		  document.getElementById('auth-loggedout').style.display = 'none';
		  document.getElementById('auth-loggedin').style.display = 'block';
		} else {
		  // user has not auth'd your app, or is not logged into Facebook
		  document.getElementById('auth-loggedout').style.display = 'block';
		  document.getElementById('auth-loggedin').style.display = 'none';
		}
	  });

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