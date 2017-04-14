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
    
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                searchTerm: '<',
                onRemove: '&',
                searchedTerm: '<'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'narrow',
            bindToController: true,
            link: FoundItemsDirectiveLink
        };
        
        return ddo;
    }
    
    function FoundItemsDirectiveController (){
        var narrow = this;
        
        narrow.checkStatus = function () {
            var check = "";
            
            if (narrow.searchedTerm === ""){
                check = "Empty";
            }
            else if (narrow.searchTerm === narrow.searchedTerm && narrow.found.length === 0){
                check = "EmptySearch";
            }
            else if (narrow.searchTerm === narrow.searchedTerm && narrow.found.length > 0) {
                check = "NewSearch";
            }
            else {
                check = "Error";
            }
            
            return check;
        };
    }
    
    function FoundItemsDirectiveLink (scope, element, attr, controller){
        scope.$watch('narrow.checkStatus()', function (newValue, oldValue){
            if (newValue === "NewSearch"){
                var errorDiv = element.find("div.error1");
                errorDiv.slideUp(100);
                var searchDiv = element.find("div.SearchTermEmpty");
                searchDiv.slideDown(100);
                var errorDiv = element.find("div.error2");
                errorDiv.slideUp(100);
            }
            else if (newValue === "Empty"){
                var errorDiv = element.find("div.error1");
                errorDiv.slideDown(100);
                var searchDiv = element.find("div.SearchTermEmpty");
                searchDiv.slideUp(100);
                var errorDiv = element.find("div.error2");
                errorDiv.slideUp(100);
            }
            else if (newValue === "EmptySearch"){
                var searchDiv = element.find("div.SearchTermEmpty");
                searchDiv.slideUp(100);
                var errorDiv = element.find("div.error2");
                errorDiv.slideDown(100);
                var errorDiv = element.find("div.error1");
                errorDiv.slideUp(100);
            }
        });
    }
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService){
        var narrow = this;
        
        narrow.searchTerm = '';
        
        narrow.found = [];
        
        narrow.searchedTerm = 0;
                       
        narrow.getMatchedItems = function () {
            var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
            promise.then (function (){
                narrow.found = MenuSearchService.getFoundItems();
            });
            
            narrow.searchedTerm = narrow.searchTerm;
        };
        
        narrow.removeItem = function (index){
            MenuSearchService.removeItem(index);
        };
    }
    
    MenuSearchService.$inject = ['$http', 'MenuURL'];
    function MenuSearchService ($http, MenuURL){
        var service = this;
        
        service.foundItems = [];
        
        service.getFoundItems = function (){
          return service.foundItems;  
        };
        
        service.getMatchedMenuItems = function (searchTerm){
            
            service.foundItems = [];
            
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
            }).catch(function (error){
                console.log(error);
            });
        };
        
        service.removeItem = function (itemIndex){
            service.foundItems.splice(itemIndex, 1);
        };
    }
})();
