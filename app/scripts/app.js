'use strict';

angular.module('angularjsRundownApp', [])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/search', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
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
  .run(['$rootScope', '$location', '$anchorScroll', '$routeParams',
    function($rootScope, $location, $anchorScroll, $routeParams) {
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
      });
    }
  ])
  .run(['$rootScope',
    function($rootScope) {
      $rootScope.getStyle = function() {
        var style = {};

        if ($rootScope.backgroundImage) {
          style.backgroundImage = 'url("' + $rootScope.backgroundImage + '");';
        }

        return style;
      };
    }
  ]);
