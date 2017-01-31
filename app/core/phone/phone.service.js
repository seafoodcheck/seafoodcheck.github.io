'use strict';

angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('fishes/:phoneId.json', {}, {
        query: {
          method: 'GET',
          params: {phoneId: 'fishes'},
          isArray: true
        }
      });
    }
  ]);
