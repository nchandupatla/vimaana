import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './contact.html';
 
const name = 'contact';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
      form:'='
    }
});