
angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {

  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {

  $scope.stato = 'login';
  $scope.data = {};

  $scope.GOsignup = function(data) {
    $scope.stato = 'signup';
  };

  $scope.GOlogin = function(data) {
    $scope.stato = 'login';
  };


  $scope.signup = function(data) {
    AuthService.signup(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };


})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {


  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };


    $http({

       method: 'GET',
       url: 'http://127.0.0.1:8000/servizi/',// + '?username=' + name + '&password=' + pw,
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }

    }).then(function successCallback(response) {

        console.log('response servizi', response);

    }, function errorCallback(response) {
        console.log('errore nella post da angular: ', response);

        //var window = window.open("", "MsgWindow", "width=500,height=500");
        //window.document.write(response.data)
    });


  $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
      function(result) {
        $scope.response = result;
      });
  };

  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };

  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
});

