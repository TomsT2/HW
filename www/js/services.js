
angular.module('starter')

.service('AuthService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

//    if (COD_TIPO_UTENTE == 'super') {
//      role = USER_ROLES.admin
//    }
//    else
//    //if (username == 'public')
//    {
//      role = USER_ROLES.public
//    }

    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'public') {
      role = USER_ROLES.public
    }

    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

function createCORSRequest(method, url) {

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
  }
}

  var signup = function() {

  console.log('name', name);
  console.log('pw', pw);

  };

  var login = function(name, pw) {
    return $q(function(resolve, reject) {


    $http({

       method: 'GET',
       url: 'http://127.0.0.1:8000/login' + '?username=' + name + '&password=' + pw,

    }).then(function successCallback(response) {

        console.log('response estrai', response);

        var data = response.data
        // Make a request and receive your auth token from your server
        if (response.data)
        {
        //$scope.role = response.data.COD_TIPO_UTENTE;
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
        } else {
          reject('Login Failed.');
        }

    }, function errorCallback(response) {
        console.log('errore nella post da angular: ', response);
          reject('Login Failed.');

        //var window = window.open("", "MsgWindow", "width=500,height=500");
        //window.document.write(response.data)
    });



//      if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
//        // Make a request and receive your auth token from your server
//        storeUserCredentials(name + '.yourServerToken');
//        resolve('Login success.');
//      } else {
//        reject('Login Failed.');
//      }
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    signup: signup,
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

});






//angular.module('starter.services', ['ngCordova'])
//
//.factory('ChatsX', function() {
//  // Might use a resource here that returns a JSON array
//
//  // Some fake testing data
//  var chats = [{
//    id: 0,
//    name: 'Ben Sparrow',
//    lastText: 'You on your way?',
//    face: 'img/ben.png'
//  }, {
//    id: 1,
//    name: 'Max Lynx',
//    lastText: 'Hey, it\'s me',
//    face: 'img/max.png'
//  }, {
//    id: 2,
//    name: 'Adam Bradleyson',
//    lastText: 'I should buy a boat',
//    face: 'img/adam.jpg'
//  }, {
//    id: 3,
//    name: 'Perry Governor',
//    lastText: 'Look at my mukluks!',
//    face: 'img/perry.png'
//  }, {
//    id: 4,
//    name: 'Mike Harrington',
//    lastText: 'This is wicked good ice cream.',
//    face: 'img/mike.png'
//  }];
//
//  return {
//    all: function() {
//      return chats;
//    },
//    remove: function(chat) {
//      chats.splice(chats.indexOf(chat), 1);
//    },
//    get: function(chatId) {
//      for (var i = 0; i < chats.length; i++) {
//        if (chats[i].id === parseInt(chatId)) {
//          return chats[i];
//        }
//      }
//      return null;
//    }
//  };
//})
//
//.factory('Chats', ['$cordovaSQLite', function($cordovaSQLite) {
//    //do something with $cordovaSQLite
//          return null;
//
//}])
//
//.service('LoginService', function($q) {
//    return {
//        loginUser: function(name, pw) {
//            var deferred = $q.defer();
//            var promise = deferred.promise;
//
//            if (name == 'user' && pw == 'secret') {
//                deferred.resolve('Welcome ' + name + '!');
//            } else {
//                deferred.reject('Wrong credentials.');
//            }
//            promise.success = function(fn) {
//                promise.then(fn);
//                return promise;
//            }
//            promise.error = function(fn) {
//                promise.then(null, fn);
//                return promise;
//            }
//            return promise;
//        }
//    }
//})
