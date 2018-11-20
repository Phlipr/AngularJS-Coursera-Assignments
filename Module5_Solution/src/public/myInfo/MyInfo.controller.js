(function () {
  "use strict";

  angular.module('public')

  .controller("MyInfoController", MyInfoController);

  MyInfoController.$inject = ['MenuService', 'menuItems'];
  function MyInfoController(MenuService, menuItems) {
    var MyInfo = this;

    MyInfo.user = MenuService.getUser();

    MyInfo.favoriteItem = MenuService.getMenuItem(MyInfo.user.favorite, menuItems);
  }

})();
