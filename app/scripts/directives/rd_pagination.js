'use strict';

angular.module('angularjsRundownApp')
  .controller('rdPaginationCtrl', ['$scope', '$element', function($scope, $element){
    $scope.hasPrev = false;
    $scope.hasNext = false;
    $scope.pageSize = 30;
    $scope.currentPage = 1;

    var self = this;

    /**
     * Change to the previous page.
     */
    $scope.prevPage = function() {
      $scope.currentPage--;
      self.processPagination();

      // Call the onPaginate event handler
      $scope.onPaginate($scope);
    };

    $scope.nextPage = function() {
      $scope.currentPage++;
      // Process the pagination
      self.processPagination();
      // Call the onPaginate event handler
      $scope.onPaginate($scope);
    };

    /**
     * Initialize the pagination with the item count.
     *
     * @param  {Integer} itemCount The amount of items being paginated.
     */
    this.initializePaginationWith = function(itemCount) {
      // Sets the itemCount
      $scope.itemCount = itemCount;
      // Process the pagination
      this.processPagination();
    };

    /**
     * Process the pagination.
     * This method sets some scope variables to control wheather we need
     * to enable or disable the pagination buttons.
     *
     * We also checks if we need to display the pagition on situations where the
     * number of results is smaller than the pageSize variable.
     */
    this.processPagination = function() {
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
          // Here we're parsing the attrs.onPaginate attribute into the directive's scope.
          // We're also asseting that if the $parse doens't return a function, we need to
          // defaults to angular.noop to avoid NPE or "Object Not a Function" errors.
          scope.onPaginate = $parse(attrs.onPaginate) || angular.noop;

          // We need to watch on the pagination total to initialize the pagination.
          scope.$watch(attrs.rdPaginationTotal, function(newValue, oldValue){
            if (newValue) {
              controller.initializePaginationWith(newValue);
            }
          });
        }
      };
    }]);
