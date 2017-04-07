/* 
Author: Phillip W. Reynolds
Start Date and Time: April 5, 2017, at 5:44 PM
End Date and Time: 

This Single Page Application using AngularJS was prepared for the Coursera.org
class AngularJS presented by Yaakov Chaikin.
 */

(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
            .controller('NarrowItDownController', NarrowItDownController)
            .service('MenuSearchService', MenuSearchService)
            .directive('foundItems', FoundItemsDirective)
            .constant('MenuURL', "https://davids-restaurant.herokuapp.com/menu_items.json");
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService){
        var narrow = this;
        
        narrow.searchTerm = '';
        
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
        
        promise.then(function (foundItems){
           narrow.found = foundItems;
        });
    }
    
    MenuSearchService.$inject = ['$http', 'MenuURL'];
    function MenuSearchService ($http, MenuURL){
        var service = this;
        
        service.foundItems = [];
        
        service.getMatchedMenuItems = function (searchTerm){
            
            searchTerm = searchTerm.trim().toLowerCase();
            
            return $http({
                method: "GET",
                url: MenuURL
            }).then(function (response){
                var menu = response.data.menu_items;
                
                for (var index = 0; index < menu.length; index++){
                    if (menu[index].description.toLowerCase().includes(searchTerm)
                            || menu[index].name.toLowerCase().includes(searchTerm)){
                        service.foundItems.push(menu[index]);
                    }
                }
                
                return service.foundItems;
            }).catch(function (error){
                console.log(error);
            });
        };
    }
    
    function FoundItemsDirective (){
        var ddo = {
            templateURL: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'narrow',
            bindToController: true,
            link: FoundItemsDirectiveLink,
            transclude: true
        };
        
        return ddo;
    }
    
    function FoundItemsDirectiveController (){
        
    }
    
    function FoundItemsDirectiveLink (scope, element, attrs, controller){
        
    }
})();
