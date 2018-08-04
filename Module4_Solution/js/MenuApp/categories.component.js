(function () {
  'use strict';

  angular.module('data')

  .component('categories', {
    templateUrl: 'js/MenuApp/templates/categories.template.html',
    bindings: {
      categories: '<'
    }
  });

})();
