Meteor.startup(function () {
// process.env.MAIL_URL = (process.env.MAIL_URL)?process.env.MAIL_URL:Meteor.settings.MAIL_URL;
// console.log('process.env.MAIL_URL '+process.env.MAIL_URL);
process.env.MAIL_URL="smtp://postmaster%40mg.thevimaana.com:4070c8bd6646bc9a02adefded68e3ff8@smtp.mailgun.org:587";
process.env.AWSAccessKeyId="AKIAJ356QKBNW2DVJRGA"
process.env.AWSSecretAccessKey="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"
})