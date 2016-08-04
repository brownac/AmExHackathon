'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:RecruiterFormCtrl
 * @description
 * # RecruiterFormCtrl
 * Controller of the amExHackathonApp
 */


angular.module('amExHackathonApp').controller('RecruiterFormCtrl', function($scope) {
  $scope.candidateQueue = [
    {firstName:'John', lastName:'Doe', age:25, gender:'boy'},
    {firstName:'Jessie', lastName:'Adams', age:30, gender:'girl'},
    {firstName:'Johanna', lastName:'Davids', age:28, gender:'girl'},
    {firstName:'Joy', lastName:'Express', age:15, gender:'girl'},
    {firstName:'Mary', lastName:'Airlines', age:28, gender:'girl'},
    {firstName:'Peter', lastName:'Royal', age:95, gender:'boy'},
    {firstName:'Sebastian', lastName:'Cruise', age:50, gender:'boy'},
    {firstName:'Erika', lastName:'Fish', age:27, gender:'girl'},
    {firstName:'Patrick', lastName:'Cat', age:40, gender:'boy'},
    {firstName:'Samantha', lastName:'Dog', age:60, gender:'girl'}
  ];
});
