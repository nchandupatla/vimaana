import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './ridesList.html';
import { Rides } from '../../../api/rides';
import { name as RidesSort } from '../ridesSort/ridesSort';
import { name as RidesMap } from '../ridesMap/ridesMap';
import { name as RideAdd } from '../rideAdd/rideAdd';
import { name as RideCreator } from '../rideCreator/rideCreator';

class RidesList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.perPage = 3;
    this.page = 1;
    this.sort = {
      fromLocation: 1
    };
    this.searchText = '';

    this.subscribe('rides', () => [{
        limit: parseInt(this.perPage),
        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
        sort: this.getReactively('sort')
      }, this.getReactively('searchText')
    ]);

    this.subscribe('users');

    this.helpers({
      rides() {
        return Rides.find({}, {
          sort : this.getReactively('sort')
        });
      },
      ridesCount() {
        return Counts.get('numberOfRides');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }
    });
  }

  isOwner(ride) {
    return this.isLoggedIn && ride.owner === this.currentUserId;
  }

  pageChanged(newPage) {
    this.page = newPage;
  }

  sortChanged(sort) {
    this.sort = sort;
  }
}

const name = 'ridesList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  RidesSort,
  RidesMap,
  RideAdd,
  RideCreator,
]).component(name, {
  template,
  controllerAs: name,
  controller: RidesList
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('rides', {
      url: '/rides',
      template: '<rides-list></rides-list>'
    });
}
