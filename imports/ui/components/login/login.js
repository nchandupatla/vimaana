import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './login.html';


class Login {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.forgetPassword = false;

  }

  login() {
    var state = this.$state;
    Meteor.loginWithPassword({
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
}

const name = 'login';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: Login
  })
  .config(config)

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      template: template,
      controllerAs: name,
      controller: Login
    });
}