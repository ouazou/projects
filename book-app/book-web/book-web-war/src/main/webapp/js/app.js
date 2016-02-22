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
                    .module('camsApp', ['ngRoute', 'camsFactories', 'ui.bootstrap', 'ngSanitize'], function ($httpProvider) {

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
                                        $('#messagePanel').show().delay(20000).fadeOut(1000);
                                    }
                                    if (status >= 400 && status < 500 && status !== 404) {
                                        var errorDescription = response.data.errorDescription;
                                        //We remove the success class from the display pane
                                        $('#messagePanel').removeClass('alert-success');
                                        $('#messagePanel').removeClass('alert-info');
                                        //We add the error class from the display pane
                                        $('#messagePanel').addClass('alert-error');
                                        //We add the message
                                        $('#message').html(errorDescription);
                                        //And made id fade out after 20 s
                                        $('#messagePanel').show().delay(6000).fadeOut(1000);
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
                    .filter('tel', function () {
                        return function (tel) {
                            if (!tel) {
                                return '';
                            }

                            var value = tel.toString().trim().replace(/^\+/, '');

                            if (value.match(/[^0-9]/)) {
                                return tel;
                            }

                            var country, city, number;

                            switch (value.length) {
                                case 10: // +1PPP####### -> C (PPP) ###-####
                                    country = 1;
                                    city = value.slice(0, 3);
                                    number = value.slice(3);
                                    break;

                                case 11: // +CPPP####### -> CCC (PP) ###-####
                                    country = value[0];
                                    city = value.slice(1, 4);
                                    number = value.slice(4);
                                    break;

                                case 12: // +CCCPP####### -> CCC (PP) ###-####
                                    country = value.slice(0, 3);
                                    city = value.slice(3, 5);
                                    number = value.slice(5);
                                    break;

                                default:
                                    return tel;
                            }

                            if (country == 1) {
                                country = "";
                            }

                            number = number.slice(0, 3) + '-' + number.slice(3);

                            return (country + " (" + city + ") " + number).trim();
                        };
                    }).filter('contentStatus', function () {
                return function (contentStatus) {
                    switch (contentStatus) {
                        case "APPROVED":
                            return "Approved";
                        case "REJECTED":
                            return "Rejected";
                        case "IN_PROGRESS":
                            return "In progress";
                        default:
                            return "Unknown";
                    }
                    ;
                };
            }).filter('optin', function () {
                return function (optin) {
                    switch (optin) {
                        case "U":
                            return "Unknown";
                        case "Y":
                            return "Yes";
                        case "N":
                            return "No";
                        case "NA":
                            return "Not Applicable";
                        default:
                            return "Unknown";
                    }
                    ;
                };
            }).filter('precisionLevel', function () {
                return function (precisionLevel) {

                    switch (precisionLevel) {
                        case "0":
                            return "Not found (0)";
                        case "10":
                            return "Country (10)";
                        case "20":
                            return "Province (20)";
                        case "30":
                            return "City (30)";
                        case "40":
                            return "Postal Code (40)";
                        case "50":
                            return "Street (50)";
                        case "60":
                            return "Rooftop (60)";
                        case "70":
                            return "Manual (70)";
                        default:
                            return "Unknown";
                    }
                    ;
                };
            }).filter('dayPeriod', function () {
                return function (dayPeriod) {
                    switch (dayPeriod) {
                        case "MORNING":
                            return "Morning";
                        case "AFTERNOON":
                            return "Afternoon";
                        case "EVENING":
                            return "Evening";
                        default:
                            return "Unknown";
                    }
                    ;
                };
            }).filter('language', function () {
                return function (dayPeriod) {
                    switch (dayPeriod) {
                        case "FR":
                            return "French";
                        case "EN":
                            return "English";
                        default:
                            return "Unknown";
                    }
                    ;
                };
            }).filter('emailType', function () {
                return function (emailType) {

                    switch (emailType) {
                        case "PUBLIC_EMAIL":
                            return "Public";
                        case "PLACEMENT_EMAIL":
                            return "Placement";
                        default:
                            return "Unknown";
                    }
                    ;
                };
            }).filter('mediaType', function () {
                return function (mediaType) {

                    switch (mediaType) {
                        case "IMAGE":
                            return "Image";
                        case "VIDEO":
                            return "Video";
                        default:
                            return "Unknown";
                    }
                    ;
                };
            })
                    .filter('resourceType', function () {
                        return function (resourceType) {

                            switch (resourceType) {
                                case "GALLERY_THUMBNAIL":
                                    return "Gallery Thumbnail";
                                case "GALLERY_LARGE":
                                    return "Gallery Large";
                                default:
                                    return "Unknown";
                            }
                            ;
                        };
                    })
                    .filter('http', function () {
                        return function (url) {
                            if (!url) {
                                return '';
                            }
                            if (!/^(f|ht)tps?:\/\//i.test(url)) {
                                url = "http://" + url;
                            }
                            return url.trim();
                        };
                    })
                    .config(camsRouter)
                    .constant("User", user)
                    .controller('AppCtrl', ['$scope', '$modal', function ($scope, $modal) {
                            $scope.S4 = function () {
                                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                            };
                            $scope.guid = function () {
                                return ($scope.S4() + $scope.S4() + "-" + $scope.S4() + "-" + $scope.S4() + "-" + $scope.S4() + "-" + $scope.S4() + $scope.S4() + $scope.S4());
                            };
                            $scope.validate_mid = function () {
                                if ($scope.merchantIdSearch !== "") {
                                    if (!$.isNumeric($scope.merchantIdSearch) || ($scope.merchantIdSearch % 1 !== 0) || ($scope.merchantIdSearch.indexOf('.') > -1)) {
                                        $('#messagePanel').show().removeClass('alert-info').addClass('alert-error').find('#message').text('Please enter a whole number as Merchant Id');
                                        $scope.merchantIdSearch = '';
                                    } else if ($scope.merchantIdSearch < 0) {
                                        $('#messagePanel').show().removeClass('alert-info').addClass('alert-error').find('#message').text('Please enter a positive number as Merchant Id');
                                        $scope.merchantIdSearch = '';
                                    } else {
                                        $('#messagePanel').hide().removeClass('alert-error').addClass('alert-info').find('#message').text('');
                                    }
                                }
                            };
                            var userId = $scope.guid();
                            $scope.copyrightYear = new Date().getFullYear();
                            if (properties.CamsWebSocketActive === "true") {
                                var ws = new WebSocket("ws://" + properties.CamsWebSocketURL + ":" + properties.CamsWebSocketPort + "/" + properties.CamsWebSocketRooContext + "/wschat/WsChatServlet");
                                ws.onmessage = function (message) {
                                    var msg = JSON.parse(message.data);
                                    if (msg.userId !== userId) {
                                        // if ($scope.subscribe === msg.msgType) {
                                        if ($scope.subscribeId === msg.merchantId) {

                                            var modalInstance = $modal.open({
                                                templateUrl: 'reloadModal',
                                                backdrop: "static",
                                                keyboard: false,
                                                controller: function ($scope, $modalInstance) {
                                                    $scope.ok = function () {
                                                        $modalInstance.close("ok");
                                                    };

                                                    $scope.cancel = function () {
                                                        $modalInstance.dismiss('cancel');
                                                    };
                                                }
                                            });
                                            modalInstance.result.then(function (status) {
                                                if ("ok" === status) {
                                                    $scope.reload();
                                                }
                                            });

                                            $scope.$apply();
                                        }
                                        // }
                                    }
                                };
                            }
                            $scope.header = "../common/header.html";
                            $scope.setHandleMessage = function (fct) {
                                $scope.handleMessage = fct;
                            };
                            $scope.setActive = function (type) {
                                $scope.merchantsActive = '';
                                $scope.assetInformationActive = '';
                                $scope.syndicationActive = '';
                                $scope.distributionErrorsActive = '';
                                $scope.dashboardActive = '';
                                $scope.assetsActive = '';
                                $scope[type + 'Active'] = 'active';
                            };
                            $scope.onlyNumbers = /^\d+$/;
                            $scope.setInitTab = function (init) {
                                $scope.initTab = init;
                            };

                            $scope.setInitPanel = function (init) {
                                $scope.initPanel = init;
                            };

                            $scope.setHideAll = function (hideAll) {
                                $scope.hideAll = hideAll;
                            };
                            $scope.init = function () {

                                if ($scope.merchantIdSearch !== "" && $scope.merchantIdSearch.indexOf('.') === -1 && $scope.merchantIdSearch.indexOf(',') === -1 && jQuery.isNumeric($scope.merchantIdSearch)) {
                                    $scope.initPanel($scope.merchantIdSearch);
                                    $scope.initTab($scope.merchantIdSearch);
                                } else {
                                    $scope.merchantIdSearch = "";
                                    $scope.message = "Please enter a number as Merchant Id";
                                    $scope.displayError("Please enter a number as Merchant Id");
                                    if ($scope.hideAll && getClass.call($scope.hideAll) == '[object Function]') {
                                        $scope.hideAll();
                                    }
                                }

                                $('#messagePanel').hide();
                            };
                            $scope.setProvidedMerchantId = function (merchantToSet) {
                                $scope.merchantIdSearch = merchantToSet;
                            };

                            $scope.setSubscribe = function (type) {
                                $scope.subscribe = type;
                            };

                            $scope.setSubscribeId = function (id) {
                                $scope.subscribeId = id;
                            };
                            $scope.setReload = function (fct) {
                                $scope.reload = fct;
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
                                $('#messagePanel').show().delay(6000).fadeOut(1000);
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
                                $('#messagePanel').show().delay(6000).fadeOut(1000);
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
                                $('#messagePanel').show().delay(6000).fadeOut(1000);
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
                    .directive('displayContent', function () {
                        return {
                            templateUrl: function (elem, attr) {
                                return 'fragments/display_' + attr.type + '.html';
                            }
                        };
                    })
                    .directive('moreDetail', function () {
                        return {
                            templateUrl: 'fragments/more_details.html'
                        };
                    })
                    .directive('moreDetailAsset', function () {
                        return {
                            templateUrl: 'fragments/more_details_asset.html'
                        };
                    })
                    .directive('moreEditDetail', function () {
                        return {
                            templateUrl: 'fragments/more_edit_details.html'
                        };
                    })
                    .directive('searchPanel', function () {
                        return {
                            templateUrl: 'fragments/merchant_search_panel.html'
                        };
                });
            ;


            function camsRouter($routeProvider) {
                $routeProvider
                        .when('/', {
                            templateUrl: 'partials/dashboard.html',
                            controller: 'DashboardCtrl'})
                        .when('/assets/', {
                            templateUrl: 'partials/assets.html',
                            controller: 'AssetCtrl'})
                        .when('/assets/:assetId', {
                            templateUrl: 'partials/assets.html',
                            controller: 'AssetCtrl'})
                        .when('/assets/:assetId/client/', {
                            templateUrl: 'partials/assets.html',
                            controller: 'AssetCtrl'})
                        .when('/assets/:assetId/client/:clientNo/', {
                            templateUrl: 'partials/assets.html',
                            controller: 'AssetCtrl'})
                        .when('/assets/:assetId/client/:clientNo/contract/', {
                            templateUrl: 'partials/assets.html',
                            controller: 'AssetCtrl'})
                        .when('/assets/:assetId/client/:clientNo/contract/:contractNo/', {
                            templateUrl: 'partials/assets.html',
                            controller: 'AssetCtrl'})
                        .when('/assets/:assetId/client/:clientNo/contract/:contractNo/productLine/', {
                            templateUrl: 'partials/assets.html',
                            controller: 'AssetCtrl'})
                        .when('/assets/:assetId/client/:clientNo/contract/:contractNo/productLine/:productLineId', {
                            templateUrl: 'partials/assets.html',
                            controller: 'AssetCtrl'})
                        .when('/merchants/', {
                            templateUrl: 'partials/merchants.html',
                            controller: 'MerchantsCtrl'})
                        .when('/merchants/:merchantId', {
                            templateUrl: 'partials/merchants.html',
                            controller: 'MerchantsCtrl'})
                        .when('/dashboard/', {
                            templateUrl: 'partials/dashboard.html',
                            controller: 'DashboardCtrl'})
                        .when('/dashboard/:merchantId', {
                            templateUrl: 'partials/dashboard.html',
                            controller: 'DashboardCtrl'})
                        .when('/distribution_errors/', {
                            templateUrl: 'partials/distribution_errors.html',
                            controller: 'DistributionErrorsCtrl'})
                        .when('/distribution_errors/:merchantId', {
                            templateUrl: 'partials/distribution_errors.html',
                            controller: 'DistributionErrorsCtrl'})
                        .when('/distribution_errors/:merchantId/:emphasizedError', {
                            templateUrl: 'partials/distribution_errors.html',
                            controller: 'DistributionErrorsCtrl'})
                        .when('/syndication/', {
                            templateUrl: 'partials/syndication.html',
                            controller: 'SyndicationCtrl'})
                        .when('/syndication/:merchantId', {
                            templateUrl: 'partials/syndication.html',
                            controller: 'SyndicationCtrl'})
                        .when('/asset_information/', {
                            templateUrl: 'partials/asset_information.html',
                            controller: 'AssetInformationCtrl'})
                        .when('/asset_information/:merchantId', {
                            templateUrl: 'partials/asset_information.html',
                            controller: 'AssetInformationCtrl'})
                        .otherwise({
                            redirectTo: '/'
                        });

            }

            angular.bootstrap(document, ['camsApp']);
        });
    });
}).fail(function() {
    window.location.reload();
});