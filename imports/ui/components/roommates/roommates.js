import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './roommates.html';
import { Roommates } from '../../../api/roommates';
import { name as displayNameFilterForCards } from '../../filters/displayNameFilterForCards';

class RoommateList {
  
  constructor($scope, $reactive, $rootScope) {
    'ngInject';

    $reactive(this).attach($scope);
    this.perPage = 9;
    this.page = 1;
    this.sort = {
      fromLocation: 1
    };
    this.searchText = '';
    this.type='1';

    this.subscribe('roommates', () => [{
        limit: parseInt(this.perPage),
        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
        sort: this.getReactively('sort')
      }, this.getReactively('searchText')
    ]);

    this.subscribe('users');
    this.subscribe('userData');

    this.helpers({
      roommates() {
        return Roommates.find({}, {
          sort : this.getReactively('sort')
        });
      },
      roommatesCount() {
        return Counts.get('numberOfRoommates');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }
    });
  }

  pageChanged(newPage) {
    this.page = newPage;
  }

  sortChanged(sort) {
    this.sort = sort;
  }
}

const name = 'roommates';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  displayNameFilterForCards,
  'ngMap'
]).component(name, {
  template,
  controllerAs: name,
  controller: RoommateList   
})
  .config(config)

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('roommates', {
      url: '/roommates',
      template: '<roommates></roommates>'
    });
}
