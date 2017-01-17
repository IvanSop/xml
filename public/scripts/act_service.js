angular.module('myApp').factory('ActService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    var acts = [{
        heading: 'Akt o nečemu 1',
        nodes: [                    
            {
                heading: 'UREDBA O NEČEMU ZA NEŠTO',
                clauses: [
                    {
                        text: 'Neki tekst, neki tekst, fjkel fjsj nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    }
                ]
            },
            {
                heading: 'PRAVILA ZA NEŠTO JFEOJFE NFENFI NIFUENI FNIFENIFENMN',
                clauses: [
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    }
                ]
            }
        ],
        date: '16/01/2017 14:30',
        status: 'inProgress',
        amendments: [
            {
                text: 'Prvi amandman KJALFJKNFKJYNFKJYSEBUEZFUEF',
                author: 'Odbornik 2'
            },
            {
                text: 'Drugi amandman KJALFJKNFKJYNFKJYSEBUEZFUEF',
                author: 'Odbornik 1'
            }
        ],
        author: 'Odbornik 1'
    },
    {
        heading: 'Akt o nečemu 2',
        nodes: [                    
            {
                heading: 'UREDBA O NEČEMU ZA NEŠTO',
                clauses: [
                    {
                        text: 'Neki tekst, neki tekst, fjkel fjsj nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    }
                ]
            },
            {
                heading: 'PRAVILA ZA NEŠTO JFEOJFE NFENFI NIFUENI FNIFENIFENMN',
                clauses: [
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    }
                ]
            }
        ],
        date: '16/01/2017 14:30',
        status: 'inProgress',
        amendments: [],
        author: 'Odbornik 1'
    },
    {
        heading: 'Akt o nečemu 3',
        nodes: [                    
            {
                heading: 'UREDBA O NEČEMU ZA NEŠTO',
                clauses: [
                    {
                        text: 'Neki tekst, neki tekst, fjkel fjsj nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    }
                ]
            },
            {
                heading: 'PRAVILA ZA NEŠTO JFEOJFE NFENFI NIFUENI FNIFENIFENMN',
                clauses: [
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    }
                ]
            }
        ],
        date: '16/01/2017 14:30',
        status: 'inProgress',
        amendments: [],
        author: 'Odbornik 2'
    },
    {
        heading: 'Akt o nečemu 4',
        nodes: [                    
            {
                heading: 'UREDBA O NEČEMU ZA NEŠTO',
                clauses: [
                    {
                        text: 'Neki tekst, neki tekst, fjkel fjsj nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    }
                ]
            },
            {
                heading: 'PRAVILA ZA NEŠTO JFEOJFE NFENFI NIFUENI FNIFENIFENMN',
                clauses: [
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    },
                    {
                        text: 'nnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbunnfnu egjgejoj gekngnn rn uivn rngknkng ejk gjd fj jjfoeijobnbu'
                    }
                ]
            }
        ],
        date: '16/01/2017 14:30',
        status: 'accepted',
        amendments: [],
        author: 'Odbornik 2'
    }];

    return ({        
      getAllActs: getAllActs,
      previewActAsXml: previewActAsXml,
      submitAct: submitAct
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


}]);