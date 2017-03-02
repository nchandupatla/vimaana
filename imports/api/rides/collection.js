import { Mongo } from 'meteor/mongo';

export const Rides = new Mongo.Collection('rides');

Rides.allow({
  insert(ride) {
    return true;
  },
  update(ride, fields, modifier) {
   return true;
  },
  remove( ride) {
    return true;
  }
});
