import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './newRoommates.html';
import {
  Roommates
} from '../../../api/roommates';

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
   next(id){
    $('ul.tabs').tabs('select_tab', id);
  }
  submit(){
      console.log('Roommates '+JSON.stringify(this.form));
      this.form.dateFrom= new Date(this.form.dateFrom);
      this.form.dateTo= new Date(this.form.dateTo);
      this.form.verified=false;
      var email=this.form.contact.email;
      Roommates.insert(this.form, function(err, result){
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