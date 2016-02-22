function DistributionErrorsCtrl($location, $scope, DistributionErrors, $http, $routeParams, $filter, $modal, $timeout, $resource, Content, AssetByContract) {
    $scope.setActive('distributionErrors');
    $scope.setSubscribe('ASSET');
    $scope.message = '';
    $scope.showTimeline = false;
    $scope.assetId = "";
    $scope.clientNo = "";
    $scope.contractNo = "";
    $scope.productLineId = "";
    $scope.loading = false;
    $scope.dynamic = 25;
    $scope.type = 'info';
    $scope.max = 100;
    $scope.linkAssetAndContent = true;
    $scope.contentLoading = false;
    $scope.expanded = false;
    $scope.merchantId = $routeParams.merchantId;
    $scope.emphasizedError = $routeParams.emphasizedError;
    
    $scope.errorCodes = {};
    $scope.errorCodes["1914"] = "hard drive is overheating";
    $scope.errorCodes["1918"] = "your linux is acting up";
    $scope.errorCodes["1939"] = "you have got yourself a virus, my friend";
    $scope.errorCodes["1945"] = "BTB = big time bug";
    $scope.errorCodes["1984"] = "some error";
    $scope.errorCodes["2015"] = "some other error";
    
    $scope.initDistributionErrorsTab = function(providedMerchantId) {
        $scope.message = {};
        $scope.currentMerchant = {};
        $scope.currentMerchant.merchantId = $routeParams.merchantId;
        $scope.loading = true;
        $scope.loadingMessage = "Loading merchant distribution errors...";
        $scope.setSubscribeId($routeParams.merchantId);
        if(providedMerchantId === undefined){
            $scope.setProvidedMerchantId($routeParams.merchantId);
            providedMerchantId = $routeParams.merchantId;
        }
        
        if (providedMerchantId === $routeParams.merchantId) {
            $scope.message = {};
            $scope.currentAsset = {};
//          
            DistributionErrors.get({
                    merchantId: $scope.merchantId
                }, function ( data ) {
                    $scope.dynamic = 40;
                    $timeout(function() {
                        $scope.orderField = "creationDate";
                        $scope.orderDir = "false";
                        $scope.loadingMessage = "Loading merchant distribution errors...";

                        if (data.errorCode !== undefined
                                && data.errorCode > 0) {
                            $scope.message.content = data.errorDescription;
                            $scope.showHistory = false;
                        } else {
                            if ( $scope.emphasizedError !== undefined && data.merchantDistributionError !== undefined ) {
                                var emphasizedError;
                            
                                for( var i = 0; i < data.merchantDistributionError.length; i++ ) {
                                    if ( data.merchantDistributionError[ i ].errorCode === 'L10015' ) {
                                        emphasizedError = data.merchantDistributionError[ i ];
                                    }
                                }

                                $scope.errors = [emphasizedError];
                            } else {
                                $scope.errors = data.merchantDistributionError;
                            }
                            
                            $scope.showHistory = true;
                            if ( data.content === undefined ) {
                                $scope.message.content = "invalid merchant ID";
                            }
                        }

                        $timeout(function() {
                            $scope.loading = false;
                            $scope.dynamic = 20;
                        }, 200);
                    }, 1000);
                });
        } else {
            $location.path('distribution_errors/' + providedMerchantId);
        }

    };

    $scope.setInitTab($scope.initDistributionErrorsTab);

    $scope.setReload($scope.initDistributionErrorsTab);
    $scope.canBeLoaded = function(assetContract, displayError) {
        var canBeLoaded = true;
        $scope.assetIdError = false;
        if (assetContract.assetId !== undefined && assetContract.assetId !== "" && assetContract.assetId !== "-1") {
            $scope.assetId = assetContract.assetId;
        } else {
            canBeLoaded = false;
            if (displayError) {
                $scope.assetIdError = true;
            }
        }

        $scope.clientNoError = false;
        if (assetContract.clientNo !== undefined && assetContract.clientNo !== "" && assetContract.clientNo !== "-1") {
            $scope.clientNo = assetContract.clientNo;
        } else {
            canBeLoaded = false;
            if (displayError) {
                $scope.clientNoError = true;
            }
        }

        $scope.contractNoError = false;
        if (assetContract.contractNo !== undefined && assetContract.contractNo !== "" && assetContract.contractNo !== "-1") {
            $scope.contractNo = assetContract.contractNo;
        } else {
            canBeLoaded = false;
            if (displayError) {
                $scope.contractNoError = true;
            }
        }

        $scope.productLineIdError = false;
        if (assetContract.productLineId !== undefined && assetContract.productLineId !== "" && assetContract.productLineId !== "-1") {
            $scope.productLineId = assetContract.productLineId;
        } else {
            canBeLoaded = false;
            if (displayError) {
                $scope.productLineIdError = true;
            }
        }
        return canBeLoaded;
    };

    if ($scope.canBeLoaded($routeParams, false) || true ) {
        $scope.initDistributionErrorsTab();
    }
}