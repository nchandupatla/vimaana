import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Meteor
} from 'meteor/meteor';
import template from './housingDetail.html';


class HousingDetail {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
  }

  
}

const name = 'housingDetails';

// create a module
export default angular.module(name, [
    angularMeteor
  ]).component(name, {
    template,
    controllerAs: name,
    controller: HousingDetail
  })
  .config(config)

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('housingDetails', {
      url: '/housingDetails',
      template: template,
      controllerAs: name,
      controller: HousingDetail
    });
}