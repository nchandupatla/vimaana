import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './newRentals.html';
import {
  Rentals
} from '../../../api/rentals';

class NewRentals {
  constructor($scope, $state, $reactive, $stateParams) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.type=$stateParams.type;
    if(this.type=='1'){
      this.text="I Want To Offer Rentals";
    }else{
      this.text="I Am Looking for Rentals";
    }
    this.form={};
  } 

  submit(){
      console.log('rentals '+JSON.stringify(this.form));
      this.form.dateFrom= new Date(this.form.dateFrom);
      this.form.dateTo= new Date(this.form.dateTo);
      this.form.verified=false;
      var email=this.form.contact.email;
      Rentals.insert(this.form, function(err, result){
        if(result){
        Meteor.call('createAccount', {
                email: email,
                id: result,
            });
        }
      });
      this.$state.go('postComplete');
  }
}

const name = 'newRentals';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: NewRentals
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newRentals', {
      url: '/newRentals/:type',
      template: template,
      controllerAs: name,
      controller: NewRentals
    });
}