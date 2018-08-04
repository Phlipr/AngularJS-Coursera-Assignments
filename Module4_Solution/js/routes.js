(function () {
  'use strict';

  angular.module('MenuApp')

  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig ($stateProvider, $urlRouterProvider) {

    //Redirect to home page if no other URL matches.
    $urlRouterProvider.otherwise('/');

    // *** Set up UI States ***
    $stateProvider

    //Home page
    .state('home', {
      url: '/',
      templateUrl: 'js/MenuApp/templates/home.template.html'
    })

    //Categories page
    .state('categories', {
      url: '/categories',
      templateUrl: 'js/MenuApp/templates/categoriesview.template.html',
      controller: 'CategoriesController as categoriesView',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    });
  }
})();
