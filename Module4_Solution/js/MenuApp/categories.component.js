(function () {
  'use strict';

  angular.module('data')

  .component('categories', {
    templateUrl: './js/MenuApp/templates/categories.template.html',
    controller: categoriesController,
    bindings: {
      categories: '<'
    }
  });

  categoriesController.$inject = ['MenuDataService'];
  function categoriesController (MenuDataService) {
    var $ctrl = this;

    var promise = MenuDataService.getAllCategories();

    promise.then(function (response) {
      $ctrl.categories = response.data;
    })
    .catch(function (error) {
      console.log("Error was thrown.");
    });
  }
})();
