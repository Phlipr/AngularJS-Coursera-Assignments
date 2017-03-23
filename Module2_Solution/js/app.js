/* 
 * This Javascript file for the "Check Off" Shopping List App
 * was created by Phillip W. Reynolds
 * Started: March 22, 2017, at 6:04 PM
 * Finished: March 22, 2017, at 7:28 PM
 */

(function (){
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
            .controller('ToBuyController', ToBuyController)
            .controller('AlreadyBoughtController', AlreadyBoughtController)
            .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService) {
        var ToBuy = this;
        
        ToBuy.items = 
            ShoppingListCheckOffService.getToBuyItems();
    
        ToBuy.buyItem = function (itemIndex){
            ShoppingListCheckOffService.buyItems(itemIndex);
        };
    }
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController (ShoppingListCheckOffService){
        var Bought = this;
        
        Bought.items =
            ShoppingListCheckOffService.getBoughtItems();
    }
    
    function ShoppingListCheckOffService (){
        var service = this;
        
        var toBuyItems = [
            {
                name: "Lettuce",
                quantity: "2 heads"
            },
            {
                name: "Spinach",
                quantity: "2 bags"
            },
            {
                name: "Tomatoes",
                quantity: "2 boxes"
            },
            {
                name: "Salad Dressing",
                quantity: "2 bottles"
            },
            {
                name: "Sweet Tea",
                quantity: "1 bottle"
            }
        ];
        
        var boughtItems = [];
        
        service.getToBuyItems = function (){
            return toBuyItems;
        };
        
        service.getBoughtItems = function (){
            return boughtItems;
        };
        
        service.buyItems = function (itemIndex){
            boughtItems.push(toBuyItems[itemIndex]);
            toBuyItems.splice(itemIndex, 1);
        };
    }
})();