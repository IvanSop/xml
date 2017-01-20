angular.module('myApp').factory('ActService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    var allAmendmentsList = [];

    return ({        
      getAllAmendmentsList: getAllAmendmentsList,
      getAllAmendments: getAllAmendments,
      getAllActs: getAllActs,
      previewActAsXml: previewActAsXml,
      submitAct: submitAct,
      deleteAct: deleteAct,
      submitAmendment: submitAmendment,
      deleteAmendment: deleteAmendment
    });

    function getAllActs() {        
        var promise = $http.get("/getAllActs")
            .then(function (response) {
                allActsList = response.data.data
                return response.data.data;
            }, function (response) {
                console.log("get all acts error");
            })
        return promise;
    }

    function previewActAsXml(jsonAct) {
        var promise = $http.post('/previewActAsXml', {data: jsonAct})
            .then(function (xmlAct) {
                return xmlAct.data;
            }, function (xmlAct) {
                console.log('error returning xml act', xmlAct.data);
            });
        return promise;
    }

    function submitAct(act) {
        var promise = $http.post('/submitAct', {data: act})
            .then(function (response) {   
                console.log(response.data);
            }, function (response) {
                console.log('error submitting act', response.data);
            });
        return promise;
    }

    function deleteAct(act) {
        var promise = $http.post('/deleteAct', {data: act})
            .then(function (response) {
                console.log(response.data);
            }, function (response) {
                console.log('error submitting act', response.data);
            });
        return promise;
    }

    function submitAmendment(amendment) {
        var promise = $http.post('/submitAmendment', {data: amendment})
            .then(function (response) {                
                allAmendmentsList.push(response.data.data);
                return response.data.data;
            }, function (response) {
                console.log('error submitting amendment', response.data);
            });
        return promise;
    }

    function getAllAmendments(){
        var promise = $http.get("/getAllAmendments")
            .then(function (response) {
                allAmendmentsList = response.data.data;
                return response.data.data;
            }, function (response) {
                console.log("get all amendments error");
            })
        return promise;
    }

    function getAllAmendmentsList() {
        return allAmendmentsList;
    }

    function deleteAmendment(id, parent) {
        console.log('id: ', id);
        console.log('parent', parent);
        var promise = $http.post('/deleteAmendment', {id: id, parent: parent})
            .then(function (response) {
                return response.data.data;
            }, function (response) {
                console.log('error deleting act', response.data);
            });
        return promise;
    }


}]);