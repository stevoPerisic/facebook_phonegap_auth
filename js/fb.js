
function loaded() {
	alert('Loaded!');	
};

function loginUser() {  
	  alert('You are trying to login!');  
	  FB.login(function(response) { }, {scope:'email'});  	
  };
  
function logout(){
	FB.logout();	  
};

function onOnline() {
 		alert('We are online!');
		
		
		(function() {
				  var e = document.createElement('script'); e.async = true;
					  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
					  document.getElementById('fb-root').appendChild(e);
					  }());
							 
					};
					
					
				 window.fbAsyncInit = function() {
					  FB.init({ appId: '226909127331855', 
					  status: true, 
					  cookie: true,
					  xfbml: true,
					  oauth: true});
				 
					  FB.Event.subscribe('auth.statusChange', handleStatusChange);	
					};
					
				 function handleStatusChange(response) {
					 document.body.className = response.authResponse ? 'connected' : 'not_connected';
					
					 if (response.authResponse) {
					   console.log(response);
					   updateUserInfo(response);
					 }
				   };
				   
				 //Log in  
				 $('#loginUser').bind('click', function(e){
					 e.prevantDefault();	
					 loginUser();
					 });
				 //Log out
				 $('#logout').bind('click', function(e){
					 e.preventDefault();
					 logout();
					 });
				
				
				//User info update
				function updateUserInfo(response) {
				  FB.api('/me', function(response) {
					document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
				  });
				};
				
				//get user friends
				 function getUserFriends() {
					FB.api('/me/friends&fields=name,picture', function(response) {
					  console.log('Got friends: ', response);
					  
					  if (!response.error) {
						var markup = '';
						
						var friends = response.data;
						
						for (var i=0; i < friends.length && i < 25; i++) {
						  var friend = friends[i];
						  
						  markup += '<img src="' + friend.picture + '"> ' + friend.name + '<br>';
						}
						
						document.getElementById('user-friends').innerHTML = markup;
					  }
					});
				  };
				  
				  
				 //publish story
				 function publishStory() {
					FB.ui({
					  method: 'feed',
					  name: 'I\'m building a social mobile web app!',
					  caption: 'This web app is going to be awesome.',
					  description: 'Check out Facebook\'s developer site to start building.',
					  link: 'http://www.facebookmobileweb.com/hello',
					  picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png'
					}, 
					function(response) {
					  console.log('publishStory response: ', response);
					});
					return false;
				  };
				  
				  //Send request
				   function sendRequest() {
					FB.ui({
					  method: 'apprequests',
					  message: 'invites you to learn how to make your mobile web app social',
					}, 
					function(response) {
					  console.log('sendRequest response: ', response);
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
	//loaded();
}; //END device ready!!