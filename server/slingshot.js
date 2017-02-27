Slingshot.fileRestrictions( "myFileUploads", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "myFileUploads", Slingshot.S3Storage, {
  bucket: "vimaana-files",
  acl: "public-read",
  AWSAccessKeyId: "AKIAJ356QKBNW2DVJRGA",
  AWSSecretAccessKey: "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",
  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },
  key: function ( file ) {
    var user = Meteor.users.findOne( this.userId );
    //return user.services.facebook.email + "/" + file.name;
    return file.name;
  }
});