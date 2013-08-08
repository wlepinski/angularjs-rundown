'use strict';

angular.module('angularjsRundownApp', ['ngCookies'])
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
        .when('/movie/:movieId', {
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
  .run(function($rootScope, $log, $cookieStore, facebookAppId, appSession){
    window.fbAsyncInit = function() {
      // Init the FB JS SDK
      FB.init({
        appId      : facebookAppId,
        channelUrl : '//local.kinetoscope.herokuapp.com/channel.html',
        // Here is a tricky. The login and logout of the application is dome in a async way
        // this means that we need to control if we have a user is authenticated between forced
        // page reloads. This task is handled by the $cookieStore and the currentUser variable
        // and here we're evaluating if the $cookieStore has an currentUser. If so we set the status
        // to true to automatically fetch the login status within the Facebook API. If we don't find
        // a cookie named currentUser on the $cookieStore means that we don't have a user logged.
        status     : ($cookieStore.get('currentUser')) ? true : false,
        xfbml      : true
      });

      // Here we're subscribing to the auth.authResponseChange to listen when the Facebook
      // changed the authentication status.
      FB.Event.subscribe('auth.authResponseChange', function(response) {
        $log.debug('Facebook.authResponseChange event fired with %o', response);

        // We need to trigger the $apply here because the FB.Event.subscribe is not on
        // the angular context so we need to tell to Angular something like
        // "Hey, can you please update the DOM now?"
        $rootScope.$apply(function(){
          // Set the Facebook's user on the appSession
          appSession.setCurrentUser(response);
        });
      });
    };
  });
