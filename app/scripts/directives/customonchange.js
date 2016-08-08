'use strict';

/**
 * @ngdoc directive
 * @name amExHackathonApp.directive:customOnChange
 * @description
 * # customOnChange
 */
angular.module('amExHackathonApp')
  .directive('customOnChange', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeHandler);
      }
    };
  });
