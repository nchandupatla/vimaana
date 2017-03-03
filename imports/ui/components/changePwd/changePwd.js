import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './changePwd.html';


class ChangePwd {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
  }

  changePwd() {
    var state = this.$state;
    Meteor.changePwdWithPassword({
      email: this.email
    }, this.password, function (error, response) {
      if (error == null) {
        window.location.href = Meteor.absoluteUrl();
      }
    })
  }

  forget() {
    this.forgetPassword = true;
  }

  reset() {
        Accounts.forgotPassword({
          email: this.email
        }, function (error, response) {
          if (error == null) {
            window.location.href = Meteor.absoluteUrl();
          }
        })
      }
  createLink(){
    this.create=true;
  }
  createAccount(){
    Meteor.call('createNewAccount', {
                email: this.email,
                password: this.password,
            });
    this.reset();
    
  }

  Change(){
      Accounts.changePassword(this.oldPassword, this.newPassword, function (error, response) {
      if (error == null) {
        window.location.href = Meteor.absoluteUrl();
      }
    })
  }
}

const name = 'changePwd';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: ChangePwd
  })
  .config(config)

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('changePwd', {
      url: '/changePwd',
      template: template,
      controllerAs: name,
      controller: ChangePwd
    });
}