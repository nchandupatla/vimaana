import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './postComplete.html';

class PostComplete {
  constructor($scope, $state, $reactive, $stateParams) {
    this.$state = $state;
    $reactive(this).attach($scope);
    
  } 
}

const name = 'postComplete';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: PostComplete
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('postComplete', {
      url: '/postComplete',
      template: template,
      controllerAs: name,
      controller: PostComplete
    });
}