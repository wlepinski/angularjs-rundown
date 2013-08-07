'use strict';

angular.module('angularjsRundownApp', [])
  .constant('parseApplicationId', '4kdi7WYXH9y20Lsb3EfYMLVytOttBFwjTpPcpTrO')
  .constant('parseRestApiKey', '1l8kAcGnsjceGBGUTZ951SgtxpTdjRZPI1On5YWM')
  .constant('facebookAppId', '177530099095061')
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authenticationHttpInterceptor');
    $httpProvider.interceptors.push('extractResultsHttpInterceptor');
  })
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/search', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl',
          reloadOnSearch: false
        })
        .when('/movie/:movie_id', {
          templateUrl: 'views/movie_details.html',
          controller: 'MovieDetailsCtrl'
        })
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ])
  .run(function($rootScope, facebookAppId, appSession){
    // Assign the appSession the $rootScope.appSession
    // This means that any modification to appSession will be propagated
    // to the scope and to the view.
    $rootScope.appSession = appSession;

    window.fbAsyncInit = function() {
      // init the FB JS SDK
      FB.init({
        appId      : facebookAppId,
        channelUrl : '//local.kinetoscope.herokuapp.com/channel.html',
        status     : true,
        xfbml      : true
      });

      // Additional initialization code such as adding Event Listeners goes here
      FB.Event.subscribe('auth.statusChange', function(response) {
        appSession.setCurrentUser(response, function(){
          $rootScope.apply()
        });
      });
    };
  });
