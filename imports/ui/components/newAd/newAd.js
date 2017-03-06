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
    this.category='1';
  } 

  onNext(){
    console.log('fdsfs '+this.category);
    if(this.category=='1' || this.category=='2' )
       this.$state.go('newRentals', {type: this.category})
    else if(this.category=='3' || this.category=='4')
       this. $state.go('newRoommates', {type: this.category})
    else if(this.category=='5' || this.category=='6')
       this.$state.go('addRide', {type: this.category})
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
      url: '/post-an-ad',
      template: template,
      controllerAs: name,
      controller: NewAd
    });
}