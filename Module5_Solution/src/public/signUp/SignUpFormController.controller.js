(function () {
  "use strict";

  angular.module('public')
  .controller("SignUpFormController", SignUpFormController);

  function SignUpFormController() {
    var signUp = this;

    signUp.completed = false;

    signUp.submit = function () {
      signUp.completed = true;
    };
  }

})();
