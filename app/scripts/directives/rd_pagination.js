'use strict';

angular.module('angularjsRundownApp')
  .controller('rdPaginationCtrl', ['$scope', '$element', function($scope, $element){
    $scope.hasPrev = false;
    $scope.hasNext = false;
    $scope.pageSize = 30;
    $scope.currentPage = 1;

    var self = this;

    $scope.prevPage = function() {
      $scope.currentPage--;
      self.processPagination();
      $scope.onPaginate($scope);
    };

    $scope.nextPage = function() {
      $scope.currentPage++;
      self.processPagination();
      $scope.onPaginate($scope);
    };

    this.initializePaginationWith = function(itemCount) {
      $scope.itemCount = itemCount;
      this.processPagination();
    };

    this.processPagination = function() {
      console.log("this.currentPage", $scope.currentPage);

      $scope.hasNext = ($scope.itemCount > ($scope.pageSize * $scope.currentPage));
      $scope.hasPrev = ($scope.currentPage > 1);

      ($scope.itemCount < ($scope.pageSize * $scope.currentPage))
        ? $element.addClass('hide')
        : $element.removeClass('hide');
    };
  }])
  .directive('rdPagination', ['$parse', function ($parse) {
      return {
        templateUrl: "/views/directives/rd_pagination.html",
        restrict: 'E',
        replace: true,
        controller: 'rdPaginationCtrl',
        scope: true,
        link: function postLink(scope, element, attrs, controller) {
          scope.onPaginate = $parse(attrs.onPaginate);

          scope.$watch(attrs.rdPaginationTotal, function(newValue, oldValue){
            if (newValue) {
              controller.initializePaginationWith(newValue);
            }
          });
        }
      };
    }]);
