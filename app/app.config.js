'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/seafood', {
          template: '<phone-list></phone-list>'
        }).
        when('/seafood/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/seafood');
    }
  ]);
