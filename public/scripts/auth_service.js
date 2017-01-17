angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;
    var errMsg = 'aaa';
    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      getErrMsg: getErrMsg,
      isCitizen: isCitizen,
      isAlderman: isAlderman,
      isPresident: isPresident,
      getAllUsers: getAllUsers,
      getCurrentUserUsername: getCurrentUserUsername,
    });

    function getCurrentUserUsername() {
      return user.username;
    }

    function isCitizen() {
      if (user.type == 0) {
        return true;
      }
      return false;
    }

    function isAlderman() {
      if (user.type == 1) {
        return true;
      }
      return false;
    }

    function isPresident() {
      if (user.type == 2) {
        return true;
      }
      return false;
    }

    function getErrMsg() {
      
      return errMsg;
    }

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = data.status;
          // console.log(user);
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = data.status;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/register',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            //console.log(data);
            deferred.resolve();
          } else {
            errMsg = data.err;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          //console.log(data);
          errMsg = data.err;
          deferred.reject();
        });

      // return promise object
      
      return deferred.promise;

    }

    // deosnt really belong here, gets all users from API, FIXME add check for admin, user shoulntd know this
    function getAllUsers() {
       var promise = $http.post("/getAllUsers")
      .then(function(response) {
        return response.data.data;
      
      },function(response) {
        // on failure
      });

      return promise; 
    }

}]);