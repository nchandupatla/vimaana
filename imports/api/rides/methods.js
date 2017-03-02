import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import { Rides } from './collection';

function getContactEmail(user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;

  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;

  return null;
}

export function invite(rideId, userId) {
  check(rideId, String);
  check(userId, String);

  if (!this.userId) {
    throw new Meteor.Error(400, 'You have to be logged in!');
  }

  const ride = Rides.findOne(rideId);

  if (!ride) {
    throw new Meteor.Error(404, 'No such ride!');
  }

  if (ride.owner !== this.userId) {
    throw new Meteor.Error(404, 'No permissions!');
  }

  if (ride.public) {
    throw new Meteor.Error(400, 'That ride is public. No need to invite people.');
  }

  if (userId !== ride.owner && ! _.contains(ride.invited, userId)) {
    Rides.update(rideId, {
      $addToSet: {
        invited: userId
      }
    });

    const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
    const to = getContactEmail(Meteor.users.findOne(userId));

    if (Meteor.isServer && to) {
      Email.send({
        to,
        replyTo,
        from: 'noreply@sharegaadi.com',
        subject: `ride: ${ride.title}`,
        text: `
          Hey, I just invited you to ${ride.title} on Sharegaadi.
          Come check it out: ${Meteor.absoluteUrl()}
        `
      });
    }
  }
}

export function rsvp(rideId, rsvp) {
  check(rideId, String);
  check(rsvp, String);

  if (!this.userId) {
    throw new Meteor.Error(403, 'You must be logged in to RSVP');
  }

  if (!_.contains(['yes', 'no', 'maybe'], rsvp)) {
    throw new Meteor.Error(400, 'Invalid RSVP');
  }

  const ride = Rides.findOne({
    _id: rideId,
    $or: [{
      // is public
      $and: [{
        public: true
      }, {
        public: {
          $exists: true
        }
      }]
    },{
      // is owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    }, {
      // is invited
      $and: [{
        invited: this.userId
      }, {
        invited: {
          $exists: true
        }
      }]
    }]
  });

  if (!ride) {
    throw new Meteor.Error(404, 'No such ride');
  }

  const hasUserRsvp = _.findWhere(ride.rsvps, {
    user: this.userId
  });

  if (!hasUserRsvp) {
    // add new rsvp entry
    Rides.update(rideId, {
      $push: {
        rsvps: {
          rsvp,
          user: this.userId
        }
      }
    });
  } else {
    // update rsvp entry
    const userId = this.userId;
    Rides.update({
      _id: rideId,
      'rsvps.user': userId
    }, {
      $set: {
        'rsvps.$.rsvp': rsvp
      }
    });
  }
}

export function sendEmail(obj) {
  console.log('in send email');
if (Meteor.isServer) {
 
  // Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
   
    console.log('in send email');
   
   var encodedString = Base64.encode(obj.id);
    SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));
      var emailData = {
        link: Meteor.absoluteUrl()+"verify/"+encodedString,
        password: obj.password
      };
   
      Email.send({
        to: obj.toEmail,
        from: "Team Vimaana <no-reply@thevimaana.com>",
        subject: "Welcome to Vimaana",
        html: SSR.render('htmlEmail', emailData)
      });
    }
}

Meteor.methods({
  invite,
  rsvp,
  sendEmail
});
