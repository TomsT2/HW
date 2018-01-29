// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('shop', {
    url: '/',
    abstract: true,
    templateUrl: 'templates/shop.html',
    controller: 'ShopCtrl',
//    resolve:{
//       id: ['$stateParams', function($stateParams){
//           return $stateParams.id;
//       }]
//    }
 })
  .state('shop.dashboard', {
    url: 'shop/dashboard',
    views: {
        'dashboard-tab': {
          templateUrl: 'templates/shopdashboard.html',
//          controller: 'ShopCtrl'
        }
    }
  })
 .state('shop.dettagli', {
//    url: 'shop/dettagli',
//    url: 'shop/dettagli/{id:int}',
    url: 'shop/dettagli/:id',
//    url: 'shop/dettagli/id:integer',
    views: {
      'dettagli-tab': {
        templateUrl: 'templates/dettagli.html',
          //controller: 'ShopCtrl'
      }
    }
})
  .state('shop.carrello', {
    url: 'shop/carrello',
    views: {
        'carrello-tab': {
          templateUrl: 'templates/carrello.html',
        }
    }
  })
  .state('main', {
    url: '/',
    abstract: true,
    templateUrl: 'templates/main.html'
  })
  .state('main.dash', {
    url: 'main/dash',
    views: {
        'dash-tab': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
    }
  })
  .state('main.public', {
    url: 'main/public',
    views: {
        'public-tab': {
          templateUrl: 'templates/public.html'
        }
    }
  })
  .state('main.admin', {
    url: 'main/admin',
    views: {
        'admin-tab': {
          templateUrl: 'templates/admin.html'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  });

  // Thanks to Ben Noblet!
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("main.dash");
  });
})


.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {  //toState, toParams, fromState, fromParams
//      console.log('next', event, next, nextParams, fromState);
//      console.log('$rootScope', $rootScope);

      if (next.name == 'shop.dettagli') {
      var scope = angular.element(document.getElementById('ShopCtrl')).scope(nextParams);
      //console.log('angular',scope);
      //scope.setId(nextParams.id);
      };

    if ('data' in next && 'authorizedRoles' in next.data) {
      console.log('next.data.authorizedRoles',next.data);
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      //console.log('$rootScope.$broadcast(AUTH_EVENTS.notAuthorized)')
      }
    }

    if (!AuthService.isAuthenticated()) {
    //console.log('if !AuthService.isAuthenticated', AuthService)
      //next = stato richiesto url e template
      if (next.name !== 'login') {
      console.log(next)
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})

