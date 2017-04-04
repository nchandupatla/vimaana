import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './newRides.html';
import {
  Feedback
} from '../../../api/feedback';


class NewRides {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
     this.form = {};
  
  } 
  
  submit() {
      this.form.date=new Date();
      Feedback.insert(this.form);
      this.form={};
      Materialize.toast('Thank you for the feedback', 4000);
  }


}

const name = 'feedback1';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: NewRides
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newRides', {
      url: '/newRides',
      template: template,
      controllerAs: name,
      controller: NewRides
    });
}