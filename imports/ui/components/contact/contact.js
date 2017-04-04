import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import template from './contact.html';

class Contact {
  constructor($scope, $state, $reactive) {
    this.$state = $state;
    $reactive(this).attach($scope);
    this.form={};
  }

  submit(){
    var user=Accounts.findUserByEmail(this.form.contact.email);
    console.log('user '+user);
    if(user==null){
       this.isCreateNewAccount = true;
    }else{
      this.isCreateNewAccount = true;
    }
  }
}
const name = 'contact';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
      form:'=',
      submit: '&',
    }
});