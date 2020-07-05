'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneAbout').
  component('phoneAbout', {
    templateUrl: 'phone-about/phone-about.template.html',
    controller: ['Phone',
      function PhoneListController(Phone) {
      }
    ]
  });
