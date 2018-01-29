
angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {

  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
   console.log('  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {');

    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
  console.log('  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event)');

  $scope.data.username = '';
  $scope.data.password = '';

    AuthService.logout();
    console.log('logincontroller 22 ctrl.js');
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

.controller('LoginCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {

console.log('logincontroller');
$scope.registrazione = {};

// INIT data
$http({
      method: 'GET',
      url: 'http://127.0.0.1:8000/login/init',
      headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function successCallback(response) {

        console.log('response INIT', response);
        $scope.init_list = angular.copy(response.data);

    }, function errorCallback(response) {
        console.log('errore nella post da angular: ', response);

        //var window = window.open("", "MsgWindow", "width=500,height=500");
        //window.document.write(response.data)
    });

  $scope.stato = 'login';
  $scope.data = {};


  $scope.GOsignup = function(data) {
    $scope.stato = 'signup';
  };

  $scope.GOlogin = function(data) {
    $scope.stato = 'login';
  };


  $scope.signup = function() {
    AuthService.signup(
      document.all.item("utente").value,
      document.all.item("pass").value,
      document.all.item("email").value,
      document.all.item("tel").value,
      document.all.item("cell").value,
      document.all.item("pagameto").value
    ).then(function(authenticated) {
      $scope.GOlogin();
      $scope.data.password = '';
      $state.go('login', {}, {reload: true});
      //$scope.setCurrentUsername(data.username);
      var alertPopup = $ionicPopup.alert({
        title: 'Utente registrato.',
        template: 'Benvenuto su HolidayWorld!'
      });
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Utente già registrato.',
        template: 'Please check your credentials!'
      });
    });
  };

  $scope.login = function() {
    // AuthService.login(data.username, data.password).then(function(authenticated) {
    AuthService.login(document.all.item("r1").value, document.all.item("r2").value).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      $scope.setCurrentUsername(document.all.item("r1").value);
      console.log('R1');
      document.all.item("r1").value = '';
      document.all.item("r2").value = '';

    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

})

.controller('DashCtrl', function($scope, $ionicPopover, $ionicSideMenuDelegate, $state, $http, $ionicPopup, AuthService) {

 $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
$scope.servizi = {};
  $scope.logout = function() {


    AuthService.logout();
    $state.go('login');
  };


    $http({
      method: 'GET',
      url: 'http://127.0.0.1:8000/servizi/get_servizi',
      headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function successCallback(response) {

        console.log('response servizi', response);
        //$scope.servizi.kit = angular.copy(response.data.servizi);

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

    // .fromTemplate() method
  var template =
  '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

//  // .fromTemplateUrl() method
//  $ionicPopover.fromTemplateUrl('my-popover.html', {
//    scope: $scope
//  }).then(function(popover) {
//    $scope.popover = popover;
//  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hidden popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

})


.controller('ShopCtrl', function($scope, $rootScope, $ionicPopover, $stateParams, $state, $http, $ionicPopup, AuthService) { //$ionicSideMenuDelegate,

// $scope.toggleLeft = function() {
//        $ionicSideMenuDelegate.toggleLeft();
//      };
//

$scope.id = 0;
$scope.carrello = [];

$rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {  //toState, toParams, fromState, fromParams

   if (next.name == 'shop.dettagli')
   {
    $scope.id = nextParams.id;
   };
});


$scope.addChart = function (obj) {
  $scope.carrello.push(obj);
  console.log('carrello', $scope.carrello);
};


$scope.popChart = function (id) {
  $scope.carrello.splice(id, 1);;
  console.log('carrello pop', $scope.carrello);
};

function setId(id) {
  $scope.id = id;
  //console.log('nextParams',nextParams)
};

$scope.servizi = {};
//$scope.id = $stateParams.id;
//console.log('$stateParams.id',$stateParams);


  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };


    $http({
      method: 'GET',
      url: 'http://127.0.0.1:8000/servizi/get_servizi',
      headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function successCallback(response) {

        console.log('response shop', response);
        temp = angular.copy(response.data.servizi);
        console.log('response temp', temp);
        for (var i=0; i<response.data.servizi.length; i++)
        {
          temp[i].id = i;
        };

        $scope.servizi.kit = temp;
        $scope.data = angular.copy(response.data.data);
        console.log('response $scope.servizi', $scope.servizi);

    }, function errorCallback(response) {
        console.log('errore nella post da angular: ', response);

        //var window = window.open("", "MsgWindow", "width=500,height=500");
        //window.document.write(response.data)
    });


  $scope.http = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };

    // .fromTemplate() method
  var template =
  '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hidden popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

});

