import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './new.html';
 
const name = 'new';
 
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