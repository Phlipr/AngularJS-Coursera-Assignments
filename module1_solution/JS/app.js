/* 
 * This AngularJS app was written by Phillip W. Reynolds on March 17, 2017.
 */

(function (){
    angular.module('LunchCheck', [])
            .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    
    function LunchCheckController($scope) {
        $scope.lunchList = "";
        $scope.CheckedLunchList = "";
        $scope.borderColor = "black";
        $scope.fontColor = "black";
        
        $scope.checkLunchList = function (){
            $scope.parsedLunchList = $scope.parseLunchList();
            $scope.modifiedLunchList = $scope.removeEmptyItems();
            $scope.stateOfLunchList = $scope.checkStateOfLunchList();
            if ($scope.stateOfLunchList == 0){
                $scope.CheckedLunchList = "Please enter data first.";
                $scope.borderColor = "red";
                $scope.fontColor = "red";
            }
            else if ($scope.stateOfLunchList > 0 && $scope.stateOfLunchList < 4){
                $scope.CheckedLunchList = "Enjoy!";
                $scope.borderColor = "green";
                $scope.fontColor = "green";
            }
            else {
                $scope.CheckedLunchList = "Too much!";
                $scope.borderColor = "green";
                $scope.fontColor = "green";
            }
        }
        
        $scope.parseLunchList = function (){
            var parsedLunchList = $scope.lunchList.replace(new RegExp(' ', 'g'),'');
            parsedLunchList = parsedLunchList.split(',');
            return parsedLunchList;
        };
        
        $scope.removeEmptyItems = function (){
            var modifiedLunchList = new Array();
            for (item in $scope.parsedLunchList) {
                if ($scope.parsedLunchList[item] != '') {
                    modifiedLunchList.push($scope.parsedLunchList[item]);
                }
            }
            return modifiedLunchList;
        }
        
        $scope.checkStateOfLunchList = function(){
            return $scope.modifiedLunchList.length;
        }
        
        
    }
})();


