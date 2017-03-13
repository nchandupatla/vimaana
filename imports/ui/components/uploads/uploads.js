import angular from 'angular';
import angularMeteor from 'angular-meteor';

import {
    Meteor
} from 'meteor/meteor';

import template from './uploads.html';
import ngFileUpload from 'ng-file-upload';
import 'ng-img-crop/compile/minified/ng-img-crop';
import 'ng-img-crop/compile/minified/ng-img-crop.css';

class Uploads {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
        this.form={};
       
        this.helpers({
            progress() {
                if(this.uploader){
                    return Math.round(this.uploader.progress() * 100);
                }else{
                    return 0;
                }
               
            },
            url() {
                //If we are uploading an image, pass true to download the image into cache.
                //This will preload the image before using the remote image url.
                if(this.uploader){
                return this.uploader.url(true);
                }
            }
        })
    }

    addImageFiles(files){
     this.form.files=files;
    }
    addImages() {
        if (this.form.files.length) {
            this.currentFile = this.form.files[0];
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
                    Meteor.users.update(Meteor.userId(), {
                        $push: {
                            "profile.files": downloadUrl
                        }
                    });
                }
            });
        }
    }
}

const name = 'uploads';

// create a module
export default angular.module(name, [
    angularMeteor,
    ngFileUpload,
    'ngImgCrop'
]).component(name, {
    template,
    controllerAs: name,
    controller: Uploads,
    bindings: {
      form:'='
    }
})