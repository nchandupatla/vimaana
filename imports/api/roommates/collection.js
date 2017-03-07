import { Mongo } from 'meteor/mongo';

export const Roommates = new Mongo.Collection('roommates');

Roommates.allow({
  insert(roommates) {
    return true;
  },
  update(roommates, fields, modifier) {
   return true;
  },
  remove(roommates) {
    return true;
  }
});
