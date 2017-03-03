import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

Accounts.emailTemplates.siteName = "Vimaana";
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Password Reset";
};
Accounts.emailTemplates.resetPassword.from = function () {
    // Overrides value set in Accounts.emailTemplates.from when resetting passwords
    return "Vimaana Password Reset <no-reply@thevimaana.com>";
};
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: Meteor.settings.FACEBOOK_APPID,
    secret: Meteor.settings.FACEBOOK_KEY
});



});