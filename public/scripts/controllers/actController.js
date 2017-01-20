angular.module('myApp').controller('actController',
    ['$scope', '$http', '$location', 'AuthService', 'ActService',
        function ($scope, $http, $location, AuthService, ActService) {

            var self = this;

            self.init = function () {
                
                self.allAmendments = [];

                ActService.getAllAmendments()
                    .then(function (response) {
                        self.allAmendments = ActService.getAllAmendmentsList();                        
                    })
                

            }
            self.init();

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

            self.amendmentFormVisible = false;

            self.showAmendmentForm = function () {
                self.amendmentFormVisible = !self.amendmentFormVisible;
            }

            $scope.submitAmendment = function(amendment) {    
                self.showAmendmentForm();
                //console.log(ActService.currentAct._id);
                $scope.amendment.text = '';
                var amend = {
                    parent: ActService.currentAct._id,
                    text: amendment,
                    author: AuthService.getCurrentUserUsername()
                }
                ActService.submitAmendment(angular.toJson(amend))
                    .then(function(response) {
                        console.log('response', response);
                        ActService.currentAct.amendments.push(response._id);                        
                        //self.allAmendments.push(amend);
                    });
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

            self.deleteAct = function() {
                ActService.deleteAct(angular.toJson(ActService.currentAct))
                    .then(function(response) {
                        $location.path("/");
                    });
            };

            $scope.confirmAmendmentDeletion = function (id) {
                self.amendmentId = id;         
                if (confirm('Da li ste sigurni da želite da povučete predlog amandmana?')) {
                    self.deleteAmendment();
                } else {
                }
            };

            self.deleteAmendment = function() {
                ActService.deleteAmendment(self.amendmentId, ActService.currentAct._id)
                    .then(function(response) {
                        console.log('ctrl', response);
                        console.log('all', self.allAmendments);
                        for (var i = 0; i < self.allAmendments.length; i++) {
                            if (self.allAmendments[i]._id == response._id) {
                                self.allAmendments.splice(i, 1);
                                break;
                            }
                        }
                    })
            };

}]);