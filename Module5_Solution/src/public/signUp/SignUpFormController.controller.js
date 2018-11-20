(function () {
  "use strict";

  angular.module('public')
  .controller("SignUpFormController", SignUpFormController);

  SignUpFormController.$inject = ['menuItemsShortNames', 'MenuService'];
  function SignUpFormController(menuItemsShortNames, MenuService) {
    var signUp = this;

    signUp.menuItemsShortNames = menuItemsShortNames;

    signUp.completed = false;

    signUp.submit = function (user) {
      signUp.completed = true;
      MenuService.setUser(user);
    };
  }

})();
