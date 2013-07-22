'use strict';

describe('Directive: rdTopRentals', function () {
  beforeEach(module('angularjsRundownApp'));

  var element;

  beforeEach(module('views/directives/rd_top_rentals.html'));

  beforeEach(inject(function($injector, $rootScope, $httpBackend, $compile){
    $httpBackend.whenGET('api/public/v1.0/lists/dvds/top_rentals.json').respond({
      movies: [
        {
          id: 1,
          title: 'Toy Story 2',
          year: 2012
        },
        {
          id: 2,
          title: 'Toy Story 3',
          year: 2013
        }
      ]
    });

    element = angular.element('<rd-top-rentals></rd-top-rentals>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();
    $httpBackend.flush();
  }));

  it('should render the directive', inject(function ($rootScope, $timeout) {
    expect(element.find('h5').text()).toBe('Top Rentals');
    expect(element.find('ul li').size()).toBe(2);
    expect(element.find('ul li:nth(0)').text().trim()).toBe('2012 - Toy Story 2');
    expect(element.find('ul li:nth(0) a').attr('href')).toBe('#/movie/1');
    expect(element.find('ul li:nth(1)').text().trim()).toBe('2013 - Toy Story 3');
    expect(element.find('ul li:nth(1) a').attr('href')).toBe('#/movie/2');
  }));
});
