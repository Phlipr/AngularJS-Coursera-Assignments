(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.user = "";

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItemsShortNames = function () {
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
      var menuItems = response.data.menu_items;

      var menuItemsShortNames = [];

      for (var i=0; i<menuItems.length; i++) {
        menuItemsShortNames.push(menuItems[i].short_name);
      }

      return menuItemsShortNames;
    });
  };

  service.setUser = function (user) {
    service.user = user;
  }

  service.getUser = function () {
    return service.user;
  }

  service.getMenuItem = function (short_name, menuItems) {
    var menuItemsList = menuItems.menu_items;
    for (var i=0; i<menuItemsList.length; i++) {
      if (menuItemsList[i].short_name == short_name) {
        return menuItemsList[i];
      }
    }
  }

}



})();
