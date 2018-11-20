(function () {
  'use strict';

  angular.module('public')
  .directive('favoriteOnMenu', favoriteOnMenu);

  function favoriteOnMenu () {
    var ddo = {
      require: 'ngModel',
      link: favoriteOnMenuLink
    };

    return ddo;
  }

  function favoriteOnMenuLink (scope, elm, attrs, ctrl) {
    var menuItemsShortNames = scope.SignUpCtrl.menuItemsShortNames;

    ctrl.$validators.favoriteOnMenu = function (modelValue, viewValue) {
      if (ctrl.$isEmpty(modelValue)) {
        return true;
      }

      if (menuItemsShortNames.indexOf(modelValue) > -1) {
        return true;
      }

      return false;
    };
  }
})();
