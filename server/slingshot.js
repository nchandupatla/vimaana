import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
Slingshot.fileRestrictions( "myFileUploads", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "myFileUploads", Slingshot.S3Storage, {
  bucket: "vimaana-files",
  acl: "public-read",
  AWSAccessKeyId: process.env.AWSAccessKeyId,
  AWSSecretAccessKey: process.env.AWSSecretAccessKey,
  authorize: function () {
    //Deny uploads if user is not logged in.
    // if (!this.userId) {
    //   var message = "Please login before posting files";
    //   throw new Meteor.Error("Login Required", message);
    // }
    return true;
  },
  key: function ( file ) {
    //var user = Meteor.users.findOne( this.userId );
    //return user.services.facebook.email + "/" + file.name;
    return file.name;
  }
});
});
