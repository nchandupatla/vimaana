import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './landing_page.html';

class LandingPage {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
  
  } 
}

const name = 'landingPage';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: LandingPage
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('landingPage', {
      url: '/',
      template: template,
      controllerAs: name,
      controller: LandingPage
    });
}