function DashboardCtrl($location, $scope, DashboardErrors, $http, $routeParams, $filter, $modal, $timeout, $resource, Content, AssetByContract) {
    $scope.setActive('dashboard');
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
    
    $scope.businessOrderField = "errorCode";
    $scope.businessOrderDir = "true";
    $scope.systemOrderField = "errorCode";
    $scope.systemOrderDir = "true";
    
    $scope.errorCodes = {};
    $scope.errorCodes["1914"] = "hard drive is overheating";
    $scope.errorCodes["1918"] = "your linux is acting up";
    $scope.errorCodes["1939"] = "you have got yourself a virus, my friend";
    $scope.errorCodes["1945"] = "BTB = big time bug";
    $scope.errorCodes["1984"] = "some error";
    $scope.errorCodes["2015"] = "some other error";
    
    $scope.errorCodes["ASM001"] = "Missing mandatory field: %s.";
    $scope.errorCodes["ASM002"] = "address1 field cannot be a PO Box address.";
    $scope.errorCodes["ASM003"] = "No ContentOne asset found for the merchant.";
    $scope.errorCodes["ASM004"] = "Missing assetId field in the event payload.";
    $scope.errorCodes["ASM005"] = "EventAssetId (%s) not equal to primaryAssetId (%s).";
    $scope.errorCodes["ASM006"] = "Invalid geocode.";
    $scope.errorCodes["ASM007"] = "Invalid %s phone number: %s";
    $scope.errorCodes["ASM008"] = "Failed to extract data by merchant id (%d) from IMDB (ImServiceReadException).";
    $scope.errorCodes["ASM009"] = "Merchant with id %d not found in the repository.";
    $scope.errorCodes["ASM010"] = "Invalid business hours: %s";
    $scope.errorCodes["ASM011"] = "At most %d logos are allowed per language";
    $scope.errorCodes["ASM012"] = "At most %d images are allowed in the businessGraphicsUrls for language %s, excluding logos";
    $scope.errorCodes["ASM013"] = "At most %d videos are allowed in the businessVideoUrls for language %S";
    $scope.errorCodes["ASM014"] = "Invalid URL in field %s [%s]";
    $scope.errorCodes["ASM015"] = "Invalid email in field %s: %s";
    $scope.errorCodes["ASM016"] = "Invalid syndication site name: [%s]";
    $scope.errorCodes["ASM017"] = "Exceeding length limit (%d) of field %s: [%s]";
    $scope.errorCodes["ASM018"] = "At most %d headers are allowed per language";
    $scope.errorCodes["ASM019"] = "Missing heading code(s).";
    $scope.errorCodes["ASM020"] = "Invalid customerPreferredLanguage \"%s\" (valid values: %s)";
    $scope.errorCodes["ASM021"] = "Invalid customerContactTime \"%s\" (valid values: %s)";
    
    $scope.errorCodes["ASM101"] = "Missing mandatory field: address1.";
    $scope.errorCodes["ASM102"] = "Missing mandatory field: city.";
    $scope.errorCodes["ASM103"] = "Missing mandatory field: province.";
    $scope.errorCodes["ASM104"] = "Missing mandatory field: postal code.";
    
    $scope.errorCodes["ASM110"] = "Missing mandatory field: businessName.";
    $scope.errorCodes["ASM115"] = "Missing mandatory field: businessSocialWebsites.type(%s)";
    $scope.errorCodes["ASM116"] = "Missing mandatory field: businessSocialWebsites.url(%s)";
    $scope.errorCodes["ASM120"] = "Missing mandatory field: businessWebSiteUrl.";
    $scope.errorCodes["ASM121"] = "Missing mandatory field: contactName.";
    $scope.errorCodes["ASM122"] = "Missing mandatory field: mainPhone.";
    $scope.errorCodes["ASM123"] = "Missing mandatory field: optedInSiteNames. // empty opt-in is valid (means all opted out), but not null";
    $scope.errorCodes["ASM124"] = "Invalid contact info (%s).";
    
    $scope.errorCodes["ASM997"] = "Sensitive business name (%s) encountered.";
    $scope.errorCodes["ASM998"] = "Sensitive heading (%s) encountered.";
    $scope.errorCodes["ASM999"] = "Address is confidential";
    
    $scope.errorCodes["CNV001"] = "Assembly cannot be null";
    $scope.errorCodes["CNV002"] = "No syndication site defined for site id [%s].";
    $scope.errorCodes["CNV003"] = "Missing payment type mapping for [%s].";

    $scope.errorCodes["C1ASM001"] = "";
    $scope.errorCodes["C1ASM002"] = "";
    $scope.errorCodes["CWSE001"] = "CAMS web service error. %s";
    
    $scope.errorCodes["PUB001"] = "Ubl client proxy initialization error occurred.";
    $scope.errorCodes["PUB002"] = "Ubl order publishing error occurred. %s";
    $scope.errorCodes["PUB003"] = "Ubl order response conversion error occurred.";
    $scope.errorCodes["PUB004"] = "Publishing units list cannot be null or empty.";
    $scope.errorCodes["PUB005"] = "Ubl payload conversion error occurred.";
    
    $scope.errorCodes["ORE001"] = "UBL order request error occurred.";
    
    $scope.errorCodes["UDSM001"] = "";
    $scope.errorCodes["UDSM002"] = "";
    
    $scope.errorCodes["USCP001"] = "Syndication callback error.";
    $scope.errorCodes["USCP002"] = "Missing callback payload.";
    $scope.errorCodes["USCP003"] = "Error parsing callback payload. %s";
    $scope.errorCodes["USCP004"] = "Missing callback error code and/or description.";
    $scope.errorCodes["USCP005"] = "Missing error payload.";
    $scope.errorCodes["USCP006"] = "Error mapping order response data. %s";
    $scope.errorCodes["USCP007"] = "Empty listing errors list.";
    $scope.errorCodes["USCP008"] = "Empty syndication site error list.";
    $scope.errorCodes["USCP009"] = "Empty YPG intervention details list.";
    $scope.errorCodes["USCP010"] = "Unsupported callback error data format.";
    
    DashboardErrors.get({}, function ( data ) {
        console.info( data );
        $scope.errors = data.distributionError;
        
        $scope.nbSystemErrors = 0;
        $scope.nbBusinessErrors = 0;
        
        for ( var i = 0; i < $scope.errors.length; i++ ) {
            if ( $scope.errors[ i ].type == "BUSINESS" ) {
                $scope.nbBusinessErrors++;
            } else if ( $scope.errors[ i ].type == "SYSTEM" ) {
                $scope.nbSystemErrors++;
            }
            $scope.errors[i].merchantCount = parseInt($scope.errors[i].merchantCount);
        }
    });
    
    $scope.initDashboardTab = function() {
        $scope.message = {};
        $scope.currentAsset = {};
        if ($scope.canBeLoaded($scope, true)) {

            $scope.currentAsset.assetId = $routeParams.assetId;
            $scope.currentAsset.clientNo = $routeParams.clientNo;
            $scope.currentAsset.contractNo = $routeParams.contractNo;
            $scope.currentAsset.productLineId = $routeParams.productLineId;
            $scope.loading = true;
            $scope.loadingMessage = "Loading asset ...";
            $scope.setSubscribeId($routeParams.assetId);


            if ($scope.assetId === $routeParams.assetId &&
                    $scope.clientNo === $routeParams.clientNo &&
                    $scope.contractNo === $routeParams.contractNo &&
                    $scope.productLineId === $routeParams.productLineId) {
                AssetByContract.get({
                    assetId: $scope.currentAsset.assetId,
                    clientNo: $scope.currentAsset.clientNo,
                    contractNo: $scope.currentAsset.contractNo,
                    productLineId: $scope.currentAsset.productLineId
                }, function(data) {
                    if (data.errorCode !== undefined
                            && data.errorCode > 0) {
                        $scope.message.asset = data.errorDescription;
                    }
                    $scope.currentAsset.asset = data.asset[0];
                    $scope.currentAsset.content = new jYP.content.Contents($scope.currentAsset.asset.content);
                    $scope.loading = false;
                    $scope.dynamic = 25;
                });

            } else {
                var assetId = $scope.assetId === "" ? -1 : $scope.assetId;
                var clientNo = $scope.clientNo === "" ? -1 : $scope.clientNo;
                var contractNo = $scope.contractNo === "" ? -1 : $scope.contractNo;
                var productLineId = $scope.productLineId === "" ? -1 : $scope.productLineId;
                $location.path('assets/' + assetId + '/client/' + clientNo + '/contract/' + contractNo + '/productLine/' + productLineId);
            }
        }

    };

    $scope.setInitTab($scope.initDashboardTab);

    $scope.setReload($scope.initDashboardTab);
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

    if ($scope.canBeLoaded($routeParams, false)) {
        $scope.initDistributionErrorsTab();
    }
}