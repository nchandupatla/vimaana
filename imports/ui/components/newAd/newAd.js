import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {
  Accounts
} from 'meteor/accounts-base'
import {
  Meteor
} from 'meteor/meteor';
import template from './newAd.html';
import {
  name as NewRoommates
} from '../newRoommates/newRoommates';
import {
  Roommates
} from '../../../api/roommates';
import ngFileUpload from 'ng-file-upload';
import 'ng-img-crop/compile/minified/ng-img-crop';
import 'ng-img-crop/compile/minified/ng-img-crop.css';

class NewAd {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.form = {};
    this.files = {};
    this.subscribe('users');
    this.subscribe('userData');
    $(".first").addClass("active");
    $('.collapsible').collapsible();
    this.files.contact = {};
    this.isCreateNewAccount = false;
    this.isExistingAccount = false;
    Session.set("emailExists", null);
    Session.set("accountCreated", null);
    this.helpers({
      check() {
        if (Session.get("emailExists") == false) {
          this.hideCont = true;
          this.isCreateNewAccount = true;
          this.msg = "No valid account found with this email. Please create a new account to submit your post";
        }
        if (Session.get("emailExists") == true) {
          this.hideCont = true;
          this.isExistingAccount = true;
          this.msg = "Valid account exists with this email. Please enter your account password to submit your post";
        }
      },

      createAccount(){
         if (Session.get("accountCreated") == true) {
           this.submit();
         }
      }
    })
  }
  onTypeChange() {
    if (this.category) {
      $(".second").addClass("active");
      $('.collapsible').collapsible();
    }
  }
  onNext(style, id) {
    var cStyle = "." + style;
    $(cStyle).addClass("active");
    $('.collapsible').collapsible();
    $('html, body').animate({
      scrollTop: $("#" + id).offset().top
    }, 2000);
  }

  createAccountAndSubmit() {
    if (this.isCreateNewAccount==true) {
      Meteor.call('createNewAccount', {
        email: this.form.contact.email,
        password: this.form.contact.password,
        profile:{name: this.form.contact.name,
              mobile: this.form.contact.mobile}

      }, (error, result) => {
        if (result) {
          Session.set("accountCreated", true);
        }
      });
    }
  }

  loginToSubmit() {
    if (this.isExistingAccount==true) {
      Meteor.loginWithPassword({
        email: this.form.contact.email
      }, this.form.contact.password, function (error, response) {
        if (error == null) {
          this.submit();
        }
      })
    }
  }

  submit() {
    if (Meteor.user() != null) {
      if (this.files.length) {
        this.currentFile = this.files[0];
        console.log('file ' + this.currentFile);
        var uploader = new Slingshot.Upload("myFileUploads");

        var error = uploader.validate(this.currentFile);
        if (error) {
          console.error('Slingshot error' + error);
        }
      }
      if (this.category == 'Roommate_Offer' || this.category == 'Roommate_Request') {
        this.form.dateFrom = new Date(this.form.dateFrom);
        this.form.dateTo = new Date(this.form.dateTo);
        this.form.verified = false;
        //var email = this.form.contact.email;
        this.form.category = this.category;
        this.form.createdAt = new Date();
        var id = Roommates.insert(this.form, function (err, result) {});
        console.log('files ' + JSON.stringify(this.files) + " " + id);
        if (this.files.length > 0) {
          this.uploadImages(id);
        }
      }
      this.$state.go('roommates');
    }
  }

  emailExists() {
    Meteor.call('verifyUserEmail', this.form.contact.email, (error, result) => {
      if (result) {
        console.error('result', JSON.stringify(result));
        Session.set("emailExists", true);
      } else {
        console.error('error');
        Session.set("emailExists", false);
      }
    });
  }


  uploadImages(id) {
    this.files.forEach(function (file) {
      uploader.send(file, function (error, downloadUrl) {
        if (error) {
          // Log service detailed response.
          console.error('Error uploading', JSON.stringify(error));
          alert(error);
        } else {
          Roommates.update({
            _id: id
          }, {
            $push: {
              "files": downloadUrl
            }
          });
        }
      })
    });
  }

  addImageFiles(files) {
    this.files = files;
  }
  addImages(rmId) {
    if (this.files.length) {
      this.currentFile = this.files[0];
      var uploader = new Slingshot.Upload("myFileUploads");

      var error = uploader.validate(this.currentFile);
      if (error) {
        console.error(error);
      }

      uploader.send(this.currentFile, function (error, downloadUrl) {
        if (error) {
          // Log service detailed response.
          console.error('Error uploading', uploader.xhr.response);
          alert(error);
        } else {
          Roommates.update({
            _id: rmId
          }, {
            $push: {
              "files": downloadUrl
            }
          });
        }
      });
    }
  }
}

const name = 'newAd';

// create a module
export default angular.module(name, [
    angularMeteor,
    NewRoommates,
    ngFileUpload,
    'ngImgCrop'
  ]).component(name, {
    template,
    controllerAs: name,
    controller: NewAd
  })
  .config(config)


function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('newAd', {
      url: '/post-an-ad',
      template: template,
      controllerAs: name,
      controller: NewAd
    });
}