import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './newAd.html';

class NewAd {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
  
  } 
}

const name = 'newAd';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: NewAd
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newAd', {
      url: '/newAd',
      template: template,
      controllerAs: name,
      controller: NewAd
    });
}