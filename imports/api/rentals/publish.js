import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Rentals } from './collection';

if (Meteor.isServer) {
  Meteor.publish('rentals', function(options, searchString) {
    const selector = {
     
    };

    if (typeof searchString === 'string' && searchString.length) {
      selector.location = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }

    Counts.publish(this, 'numberOfRentals', Rentals.find(selector), {
      noReady: true
    });

    return Rentals.find(selector, options);
  });
}
