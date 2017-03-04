import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
//import NgMap from 'ngMap';
import {
  Meteor
} from 'meteor/meteor';

import template from './rideDetails.html';
import {
  Rides
} from '../../../api/rides';
import {
  name as RideMap
} from '../rideMap/rideMap';

class RideDetails {
  constructor($stateParams, $scope, $reactive, NgMap) {
    'ngInject';

    $reactive(this).attach($scope);
    this.rideId = $stateParams.rideId;

    this.subscribe('rides');
    this.subscribe('users');
    this.location = [{
      id: 101,
      latitude: 42.3563941755867,
      longitude: -71.0363168884369
    }];

    // this.vm={};
    // this.vm.types = "['restaurant']";
    // this.vm.placeChanged = function () {
    //   this.vm.place = this.vm.getPlace();
    //   console.log('location', this.vm.place.geometry.location);
    //   //this.vm.map.setCenter(this.vm.place.geometry.location);
    // }
    // NgMap.getMap().then(function (map) {
    //   console.log('map '+JSON.stringify(map))
    //   this.vm.map = map;
    // });

    this.helpers({
      ride() {
        return Rides.findOne({
          _id: $stateParams.rideId
        });
      },
      users() {
        return Meteor.users.find({});
      },
      isLoggedIn() {
        // $('.chips').material_chip({
        //   data: this.ride.tags
        //  })
        return !!Meteor.userId();
      },
      isOwner() {
        if (!this.ride) {
          return false;
        }

        return this.ride.owner === Meteor.userId();
      }

    });

  }

  getUser(id) {
    return Meteor.users.findOne(id);
  }

  getUserUploadFiles(id) {
    var user = Meteor.users.findOne(id);
    console.log('user  ' + user);
    if (user && user.profile && user.profile.files) {
      return user.profile.files;
    }
  }


}

const name = 'rideDetails';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    RideMap,
    'ngMap'
  ]).component(name, {
    template,
    controllerAs: name,
    controller: RideDetails
  })
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('rideDetails', {
    url: '/rides/:rideId',
    template: '<ride-details></ride-details>'
  });
}