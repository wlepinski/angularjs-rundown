'use strict';

describe('Directive: rdMovieCard', function () {
  beforeEach(module('angularjsRundownApp'));

  var element;

  beforeEach(module('views/directives/rd_movie_card.html'));

  it('Should output correct HTML', inject(function ($rootScope, $compile) {
    $rootScope.movie = {
      id: 123,
      title: 'Toy Story 3',
      year: 2013
    };

    element = angular.element('<div rd-movie-card data-movie="movie"></div>');
    element = $compile(element)($rootScope);
    $rootScope.$digest();

    expect(element.find('span').eq(1).text()).toBe('Toy Story 3');
    expect(element.find('a').attr('title')).toBe('Toy Story 3');
    expect(element.find('a').attr('href')).toBe('#/movie/123');
    expect(element.find('span.year').text()).toBe('2013');
  }));
});
