import angular from 'angular';
import angularMeteor from 'angular-meteor';
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
    this.form.files = {};
    $(".first").addClass("active");
    $('.collapsible').collapsible();
  }
  onTypeChange() {
    if (this.category) {
      $(".second").addClass("active");
      $('.collapsible').collapsible();
    }
  }
  onNext(style) {
    var cStyle = "." + style;
    $(cStyle).addClass("active");
    $('.collapsible').collapsible();
  }

  submit() {
    console.log('Form ' + JSON.stringify(this.form));
    if (this.files.length) {
      this.currentFile = this.files[0];
      var uploader = new Slingshot.Upload("myFileUploads");

      var error = uploader.validate(this.currentFile);
      if (error) {
        console.error(error);
      }
    }
    if (this.category == 'Roommate_Offer' || this.category == 'Roommate_Request') {
      this.form.dateFrom = new Date(this.form.dateFrom);
      this.form.dateTo = new Date(this.form.dateTo);
      this.form.verified = false;
      var email = this.form.contact.email;
      this.form.category = this.category;
      this.form.createdAt = new Date();
      Roommates.insert(this.form, function (err, result) {
        if (result) {
          Meteor.call('createAccount', {
            email: email,
            id: result,
          });
          // this.addImages(result);

          uploader.send(this.currentFile, function (error, downloadUrl) {
        if (error) {
          // Log service detailed response.
          console.error('Error uploading', uploader.xhr.response);
          alert(error);
        } else {
          Roommates.update({
            _id: result
          }, {
            $push: {
              "files": downloadUrl
            }
          });
        }
      });

          $(".confirm").addClass("active");
          $('.collapsible').collapsible();

        }
      });
    }
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