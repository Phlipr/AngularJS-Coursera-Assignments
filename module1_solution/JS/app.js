/* 
 * This AngularJS app was written by Phillip W. Reynolds on March 17, 2017.
 */

(function (){
    'use strict';
    
    angular.module('LunchCheck', [])
            .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    
    function LunchCheckController($scope) {
        $scope.lunchList = "";
        $scope.CheckedLunchList = "";
        $scope.borderColor = "black";
        $scope.fontColor = "black";
        
        $scope.checkLunchList = function (){
            var parsedLunchList = parseLunchList();
            var modifiedLunchList = removeEmptyItems(parsedLunchList);
            var stateOfLunchList = checkStateOfLunchList(modifiedLunchList);
            if (stateOfLunchList === 0){
                $scope.CheckedLunchList = "Please enter data first.";
                $scope.borderColor = "red";
                $scope.fontColor = "red";
            }
            else if (stateOfLunchList > 0 && stateOfLunchList < 4){
                $scope.CheckedLunchList = "Enjoy!";
                $scope.borderColor = "green";
                $scope.fontColor = "green";
            }
            else {
                $scope.CheckedLunchList = "Too much!";
                $scope.borderColor = "green";
                $scope.fontColor = "green";
            }
        };
        
        var parseLunchList = function (){
            var parsedLunchList = $scope.lunchList.replace(new RegExp(' ', 'g'),'');
            parsedLunchList = parsedLunchList.split(',');
            return parsedLunchList;
        };
        
        var removeEmptyItems = function (parsedLunchList){
            var modifiedLunchList = new Array();
            var item = 0;
            for (item in parsedLunchList) {
                if (parsedLunchList[item] !== '') {
                    modifiedLunchList.push(parsedLunchList[item]);
                }
            }
            return modifiedLunchList;
        };
        
        var checkStateOfLunchList = function(modifiedLunchList){
            return modifiedLunchList.length;
        };
        
        
    }
})();


