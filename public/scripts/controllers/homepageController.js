angular.module('myApp').controller('homepageController',
    ['$scope', '$location', 'AuthService', 'ActService',
        function ($scope, $location, AuthService, ActService) {
            
            $scope.isCitizen = AuthService.isCitizen();

            $scope.isAlderman = AuthService.isAlderman();
            
            $scope.isPresident = AuthService.isPresident();
            
            $scope.status = AuthService.getUserStatus();            

            $scope.setCurrentAct = function(heading) {                
                ActService.currentAct = heading;
            }

            $scope.allActs = ActService.getAllActs();

            $scope.getCurrentUsername = function () {

                AuthService.getUserStatus()
                    .then(function (user) {
                        $scope.username = user.data.status.username;
                    });

            };

            $scope.getCurrentUsername();
            
        }]);