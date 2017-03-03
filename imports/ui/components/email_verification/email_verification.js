import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './email_verification.html';
import { Rides } from '../../../api/rides';

class Verification {
  constructor($scope, $state, $reactive, $stateParams) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.showMsg=false;
    this.id = $stateParams.id;
    this.subscribe('rides');
   
    Meteor.call('verifyAccount',({id:$stateParams.id}), function(error, result) {
   if(error==null){
    this.showMsg=true;
   }
   });
    this.showMsg=true;
  } 
}

const name = 'email_verification';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: Verification
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('verify', {
      url: '/verify/:id',
      template: template,
      controllerAs: name,
      controller: Verification
    });
}