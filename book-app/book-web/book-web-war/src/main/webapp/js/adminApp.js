'use strict';

var properties = [];
var user = {}
$.getJSON("/cams-ui/userRole").success(function (data) {
    user = data;
    $.getJSON("/cams-ui/properties").success(function (data) {
        $(data).each(function () {
            properties[this.Key] = this.Value;
        });
        angular.element(document).ready(function () {
            angular
                    .module('camsAdminApp', ['ngRoute', 'camsAdminFactories', 'ui.bootstrap'], function ($httpProvider) {

                        var interceptor = [function () {

                                function success(response) {
                                    return response;
                                }

                                function error(response) {
                                    var status = response.status;
                                    if (status >= 500 && status < 600) {
                                        //We remove the success class from the display pane
                                        $('#messagePanel').removeClass('alert-success');
                                        $('#messagePanel').removeClass('alert-info');
                                        //We add the error class from the display pane
                                        $('#messagePanel').addClass('alert-error');
                                        //We add the message
                                        $('#message').html("An internal error has occur please try again later");
                                        //And made id fade out after 20 s
                                        $('#messagePanel').fadeIn().delay(20000).fadeOut(1000);
                                    }
                                    // otherwise
                                    return response;

                                }

                                return function (promise) {
                                    return promise.then(success, error);
                                };

                            }];
                        $httpProvider.responseInterceptors.push(interceptor);
                    })
                    .config(camsRouter)
                    .controller('AppCtrl', ['$scope', function ($scope) {

                            $scope.header = "../common/header.html";
                            $scope.setActive = function (type) {
                                $scope.logsActive = '';
                                $scope.servicesActive = '';
                                $scope.configLogsActive = '';
                                $scope.propertiesActive = '';

                                $scope[type + 'Active'] = 'active';
                            };

                            $scope.displaySuccess = function (message) {
                                //We remove the error class from the display pane
                                $('#messagePanel').removeClass('alert-error');
                                $('#messagePanel').removeClass('alert-info');
                                //We add the success class from the display pane
                                $('#messagePanel').addClass('alert-success');
                                //We add the message
                                $('#message').html(message);
                                //And made id fade out after 2500 ms
                                $('#messagePanel').fadeIn().delay(2500).fadeOut(1000);
                            };

                            $scope.displayError = function (message) {
                                //We remove the success class from the display pane
                                $('#messagePanel').removeClass('alert-success');
                                $('#messagePanel').removeClass('alert-info');
                                //We add the error class from the display pane
                                $('#messagePanel').addClass('alert-error');
                                //We add the message
                                $('#message').html(message);
                                //And made id fade out after 2500 ms
                                $('#messagePanel').fadeIn().delay(2500).fadeOut(1000);
                            };

                            $scope.displayInfo = function (message) {
                                //We remove the success class from the display pane
                                $('#messagePanel').removeClass('alert-success');
                                $('#messagePanel').removeClass('alert-error');
                                //We add the error class from the display pane
                                $('#messagePanel').addClass('alert-info');
                                //We add the message
                                $('#message').html(message);
                                //And made id fade out after 2500 ms
                                $('#messagePanel').fadeIn().delay(2500).fadeOut(1000);
                            };
                        }])
                    .directive('ngEnter', function () {
                        return function (scope, element, attrs) {
                            element.bind("keydown keypress", function (event) {
                                if (event.which === 13) {
                                    scope.$apply(function () {
                                        scope.$eval(attrs.ngEnter);
                                    });
                                    event.preventDefault();
                                }
                            });
                        };
                    })
                    .filter('decodeBase64', function () {
                        return function (input) {
                            return atob(input);
                        };
                    });
            ;


            function camsRouter($routeProvider) {
                $routeProvider
                        .when('/', {
                            templateUrl: '../admin/partials/logs.html',
                            controller: 'LogCtrl'})
                        .when('/logs/', {
                            templateUrl: '../admin/partials/logs.html',
                            controller: 'LogCtrl'})
                        .when('/properties/', {
                            templateUrl: '../admin/partials/properties.html',
                            controller: 'PropertyCtrl'})
                        .when('/confLogs/', {
                            templateUrl: '../admin/partials/configLogs.html',
                            controller: 'ConfigLogCtrl'})
                        .when('/services/', {
                            templateUrl: '../admin/partials/services.html',
                            controller: 'ServiceCtrl'})
                        .when('/batchs/', {
                            templateUrl: '../admin/partials/batchs.html',
                            controller: 'BatchCtrl'});
            }

            angular.bootstrap(document, ['camsAdminApp']);
        });
    });
}).fail(function() {
    window.location.reload();
});