import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: Meteor.settings.FACEBOOK_APPID,
    secret: Meteor.settings.FACEBOOK_KEY
});



});