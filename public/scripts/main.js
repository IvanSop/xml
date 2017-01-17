var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/home.html',
            access: {restricted: true}
        })
        .when('/login', {
            templateUrl: '/login.html',
            controller: 'loginController',
            access: {restricted: false, reverseRestricted: true}
        })
        .when('/logout', {
            controller: 'logoutController',
            access: {restricted: true}
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerController',
            access: {restricted: false, reverseRestricted: true}
        })
        .when('/new_act', {
            templateUrl: 'new_act.html',
            access: {restricted: true}
        })
        .when('/act', {
            templateUrl: 'act.html',
            access: {restricted: true}
        })
        .when('/session', {
            templateUrl: 'session.html',
            access: {restricted: true}
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.filter('searchContent', function () {
    return function (item) {        
        if (item.includes("2")) {
            return item;
        }
    };
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            AuthService.getUserStatus()
                .then(function () {
                    //TypeError: Cannot read property 'restricted' of undefined
                    if (next.access.restricted && !AuthService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }
                    if (next.access.reverseRestricted && AuthService.isLoggedIn()) {
                        $location.path('/');
                        $route.reload();
                    }
                });
        });
});