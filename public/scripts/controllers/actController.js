angular.module('myApp').controller('actController',
    ['$scope', '$http', '$location', 'AuthService', 'ActService',
        function ($scope, $http, $location, AuthService, ActService) {

            var self = this;

            $scope.act = {
                heading: '',
                nodes: [                    
                    {
                        heading: '',
                        clauses: [
                            {
                                text: ''
                            }
                        ]
                    }
                ],
                date: '',
                status: 'none',
                amendments: [],
                author: AuthService.getCurrentUserUsername()
            };

            $scope.getCurrentUsername = function () {

                AuthService.getUserStatus()
                    .then(function (user) {
                        $scope.username = user.data.status.username;
                    });

            };

            $scope.getCurrentUsername();

            $scope.isAlderman = AuthService.isAlderman();

            $scope.currentAct = ActService.currentAct;
        
            $scope.newNode = function() {
                var newNodeNo = $scope.act.nodes.length;
                $scope.act.nodes.push({'heading' : '', 'clauses' : [{text: ''}]});
            };

            $scope.deleteNode = function(nodeId) {
                $scope.act.nodes.splice(nodeId, 1);
            };

            $scope.newClause = function(nodeId) {
                var clauseId = $scope.act.nodes[nodeId].clauses.length;
                $scope.act.nodes[nodeId].clauses.push({text: ''});
            };

            $scope.deleteClause = function(nodeId, clauseId) {
                $scope.act.nodes[nodeId].clauses.splice(clauseId, 1);
            };

            $scope.submitAct = function() {
                $scope.act.status = 'inProgress';
                $scope.act.date = new Date(Date.now()).toLocaleString('en-GB');               
                ActService.submitAct(angular.toJson($scope.act))
                    .then(function(response) {
                            $location.path("/");
                    });
            };

            $scope.submitAmendment = function(amendment) {
                console.log(amendment);
                $scope.act = ActService.currentAct;
                $scope.act.amendments.push({text: amendment, author: AuthService.getCurrentUserUsername()});
                
            };

            $scope.previewActAsXml = function(act) {
                ActService.previewActAsXml(angular.toJson(act))
                    .then(function(response) {
                        $scope.xmlAct = vkbeautify.xml(response);                        
                    });
            };

            $scope.previewActAsJSON = function(act) {
                $scope.xmlAct = vkbeautify.json(angular.toJson(act));                
            };

            $scope.confirmActDeletion = function () {
                if (confirm('Da li ste sigurni da želite da povučete predlog akta?')) {
                    self.deleteAct();
                } else {
                }
            };

            $scope.confirmAmendmentDeletion = function () {
                if (confirm('Da li ste sigurni da želite da povučete predlog amandmana?')) {
                    self.deleteAmendment();
                } else {
                }
            };

            self.deleteAct = function() {
                ActService.deleteAct(angular.toJson($scope.act))
                    .then(function(response) {

                    })
            };

            self.deleteAmendment = function() {
                ActService.deleteAmendment(angular.toJson($scope.act))
                    .then(function(response) {

                    })
            };

}]);