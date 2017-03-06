import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './newRoommates.html';

class NewRoommates {
  constructor($scope, $state, $reactive, $stateParams) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.type=$stateParams.type;
     if(this.type=='3'){
      this.text="I Want To Offer Roommates";
    }else{
      this.text="I Am Looking for Roommates";
    }
  } 
}

const name = 'newRoommates';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: NewRoommates
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newRoommates', {
      url: '/newRoommates/:type',
      template: template,
      controllerAs: name,
      controller: NewRoommates
    });
}