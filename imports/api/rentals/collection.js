import { Mongo } from 'meteor/mongo';

export const Rentals = new Mongo.Collection('rentals');

Rentals.allow({
  insert(rentals) {
    return true;
  },
  update(rentals, fields, modifier) {
   return true;
  },
  remove( rentals) {
    return true;
  }
});
