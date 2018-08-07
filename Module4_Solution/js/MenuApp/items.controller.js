(function () {
  'use strict';

  angular.module('data')

  .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['items'];
  function MenuItemsController (items) {
    var menuItemsView = this;

    menuItemsView.items = items.data.menu_items;
    menuItemsView.category = items.data.category.name;
  }
})();
