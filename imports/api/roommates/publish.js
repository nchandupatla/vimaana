import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Roommates } from './collection';

if (Meteor.isServer) {
  Meteor.publish('roommates', function(options, searchString, something) {
    const selector = {
     "$and": [
    { beds: {$in: something } }
    ]
    };

    if (typeof searchString === 'string' && searchString.length) {
      selector.fromLocation = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }

    Counts.publish(this, 'numberOfRoommates', Roommates.find(selector), {
      noReady: true
    });

    return Roommates.find(selector, options);
  });
}
