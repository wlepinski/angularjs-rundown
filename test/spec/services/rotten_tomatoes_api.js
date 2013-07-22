'use strict';

describe('Service: rottenTomatoesApi', function () {

  // load the service's module
  beforeEach(module('angularjsRundownApp'));

  // instantiate service
  var rottenTomatoesApi;
  var $httpBackend = undefined;

  beforeEach(inject(function(_rottenTomatoesApi_, $injector) {
    rottenTomatoesApi = _rottenTomatoesApi_;
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get the movie info', function () {
    $httpBackend.expectGET('api/public/v1.0/movies/123.json').respond({ title: 123 });
    rottenTomatoesApi.movieInfo(123);
    $httpBackend.flush();
  });

  it('should search for movies', function () {
    $httpBackend.expectGET('api/public/v1.0/movies.json?page=1&page_limit=30&q=toy%20story').respond({ title: 123 });
    rottenTomatoesApi.search('toy story');
    $httpBackend.expectGET('api/public/v1.0/movies.json?page=2&page_limit=40&q=toy%20story').respond({ title: 123 });
    rottenTomatoesApi.search('toy story', 2, 40);
    $httpBackend.flush();
  });

  it('should search for movies clips', function () {
    $httpBackend.expectGET('api/public/v1.0/movies/123/clips.json').respond([{ title: 123 }]);
    rottenTomatoesApi.movieClips(123);
    $httpBackend.flush();
  });

  it('should search for upcoming movies', function () {
    $httpBackend.expectGET('api/public/v1.0/lists/movies/upcoming.json').respond([{ title: 123 }]);
    rottenTomatoesApi.upcoming();
    $httpBackend.flush();
  });

  it('should search for top rentals movies', function () {
    $httpBackend.expectGET('api/public/v1.0/lists/dvds/top_rentals.json').respond([{ title: 1 }]);
    rottenTomatoesApi.topRentals();
    $httpBackend.flush();
  });

  it('should search for similar movies', function () {
    $httpBackend.expectGET('api/public/v1.0/movies/123/similar.json?limit=5').respond([{ title: 1 }]);
    rottenTomatoesApi.similar(123);
    $httpBackend.expectGET('api/public/v1.0/movies/123/similar.json?limit=10').respond([{ title: 1 }]);
    rottenTomatoesApi.similar(123, 10);
    $httpBackend.flush();
  });

});
