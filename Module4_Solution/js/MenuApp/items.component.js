(function () {
  'use strict';

  angular.module('data')

  .component('menuItems', {
    templateUrl: 'js/MenuApp/templates/menu-items.template.html',
    bindings: {
      items: "<",
    }
  })
})();
