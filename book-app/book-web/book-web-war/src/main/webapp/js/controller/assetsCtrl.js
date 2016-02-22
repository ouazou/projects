function AssetCtrl($location, $scope, $routeParams, $filter, $modal, $timeout, $resource, Content, AssetByContract) {
    $scope.setActive('assets');
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

    $scope.refClassValue = {};
    $scope.refClassValue["1"] = "Atmosphere";
    $scope.refClassValue["4"] = "Brands Carried";
    $scope.refClassValue["5"] = "Certification";
    $scope.refClassValue["7"] = "Concerns";
    $scope.refClassValue["8"] = "Cuisine Type";
    $scope.refClassValue["9"] = "Domains of Law";
    $scope.refClassValue["10"] = "Features";
    $scope.refClassValue["11"] = "Food";
    $scope.refClassValue["18"] = "Packages";
    $scope.refClassValue["19"] = "Patients";
    $scope.refClassValue["21"] = "Practice";
    $scope.refClassValue["22"] = "Procedures";
    $scope.refClassValue["25"] = "Restaurant Type";
    $scope.refClassValue["32"] = "Hotel Type";
    $scope.refClassValue["40"] = "Treatments and Services";
    $scope.refClassValue["1001"] = "Rates";
    $scope.refClassValue["1002"] = "Stars";
    $scope.refClassValue["1003"] = "Languages Spoken";
    $scope.refClassValue["1004"] = "Methods of Payment";
    $scope.refClassValue["1005"] = "Hours of Operation";
    $scope.refClassValue["1006"] = "Products and/or services";
    $scope.refClassValue["1007"] = "Specialists";
    $scope.refClassValue["1008"] = "Getting there";
    $scope.refClassValue["1009"] = "Specialties";
    $scope.phoneTypeValue = {};
    $scope.phoneTypeValue["MAIN"] = "Main Phone Number";
    $scope.phoneTypeValue["FAX"] = "Fax Number";
    $scope.phoneTypeValue["TOLLFREE"] = "Toll Free Number";
    $scope.phoneTypeValue["AFTERHR"] = "After Hours";
    $scope.phoneTypeValue["IFBUSY"] = "If Busy";
    $scope.phoneTypeValue["SECURITY"] = "Security";
    $scope.phoneTypeValue["RESERVATION"] = "Reservation";
    $scope.phoneTypeValue["APPOINTMENT"] = "Appointment";
    $scope.phoneTypeValue["MOBILE"] = "Mobile";
    $scope.phoneTypeValue["TOLLED"] = "Tolled";
    $scope.phoneTypeValue["NFLOCALCT"] = "NFLOCALCT";
    $scope.phoneTypeValue["NFTFCT"] = "NFTFCT";
    $scope.phoneTypeValue["ALT1"] = "alt1";
    $scope.phoneTypeValue["ALT2"] = "alt2";
    $scope.phoneTypeValue["ALT3"] = "alt3";
    $scope.phoneTypeValue["ALT4"] = "alt4";
    $scope.phoneTypeValue["ALT5"] = "alt5";
    $scope.headingTypeValue = {};
    $scope.headingTypeValue["FREE"] = "Free";
    $scope.headingTypeValue["PRIMARY"] = "Primary";
    $scope.urlTypeValue = {};
    $scope.urlTypeValue["FREE_URL"] = "Free";
    $scope.urlTypeValue["MAIN_WEBSITE"] = "Main Website";
    $scope.urlTypeValue["OTHER_WEBSITE"] = "Other Website";
    $scope.urlTypeValue["FACEBOOK_PAGE"] = "Facebook";
    $scope.urlTypeValue["TWITTER_PAGE"] = "Twitter";
    $scope.urlTypeValue["LEAD_PAGE"] = "Lead Page";
    $scope.urlTypeValue["YOUTUBE_PAGE"] = "Youtube";
    $scope.urlTypeValue["OTHER_SOCIAL_PAGE"] = "Other social media";
    $scope.urlTypeValue["CRAWLED_URL"] = "Crawled";
    $scope.urlTypeValue["YELP_PAGE"] = "Yelp";
    $scope.urlTypeValue["FACTUAL_PAGE"] = "Factual";
    $scope.urlTypeValue["GOOGLE_PAGE"] = "Google";
    $scope.urlTypeValue["TUPALO_PAGE"] = "Tupalo";
    $scope.urlTypeValue["FOURSQUARE_PAGE"] = "Foursquare";
    $scope.urlTypeValue["MAPQUEST_PAGE"] = "MapQuest";
    $scope.urlTypeValue["URBANSPOON_PAGE"] = "Urbanspoon";
    $scope.urlTypeValue["TRIPADVISOR_PAGE"] = "TripAdvisor";
    $scope.urlTypeValue["HERE.COM_PAGE"] = "Here.com";
    $scope.urlTypeValue["YALWA_PAGE"] = "Yalwa";
    $scope.urlTypeValue["VANITY_URL"] = "Vanity";
    $scope.urlTypeValue["SHOWMELOCAL_PAGE"] = "ShowMeLocal";

    $scope.businessHourValue = {};
    $scope.businessHourValue["MON"] = "Monday";
    $scope.businessHourValue["TUE"] = "Tuesday";
    $scope.businessHourValue["WED"] = "Wednesday";
    $scope.businessHourValue["THU"] = "Thursday";
    $scope.businessHourValue["FRI"] = "Friday";
    $scope.businessHourValue["SAT"] = "Saturday";
    $scope.businessHourValue["SUN"] = "Sunday";
    $scope.businessHourValue["NEWYEAR"] = "New Year Eve";
    $scope.businessHourValue["AFT-NEWYEAR"] = "After New Year Eve";
    $scope.businessHourValue["FAMILY"] = "Family Day";
    $scope.businessHourValue["ISLANDER"] = "Islander Day";
    $scope.businessHourValue["LOUIS-RIEL"] = "Louis Riel Day";
    $scope.businessHourValue["GOOD-FRIDAY"] = "Good Friday Day";
    $scope.businessHourValue["EASTER-MONDAY"] = "Easter Monday";
    $scope.businessHourValue["VICTORIA"] = "Victoria Day";
    $scope.businessHourValue["QUEBEC"] = "Quebec National Day";
    $scope.businessHourValue["CANADA"] = "Canada National day";
    $scope.businessHourValue["CIVIC"] = "Civic Day";
    $scope.businessHourValue["REGATTA"] = "Regatta Day";
    $scope.businessHourValue["LABOR"] = "Labor Day";
    $scope.businessHourValue["THANKSGIVING"] = "Thanksgiving";
    $scope.businessHourValue["REMBRANCE"] = "Remembrance Day";
    $scope.businessHourValue["CHRISTMAS"] = "Christmas";
    $scope.businessHourValue["BOXING"] = "Boxing Day";
    $scope.businessHourValue["DISCOVER"] = "Discovery Day";
    $scope.businessHourValue["NATIONAL-ABORIGINAL"] = "Aboriginal National Day";
    $scope.businessHourValue["NUNAVUT"] = "Nunavut Day";

    $scope.processing = {};
    $scope.processing["LANDING_PAGE_BACKGROUND_COLOR"] = "Landing page background color";
    $scope.processing["LANDING_PAGE_HEADER_COLOR"] = "Landing page heading background color";

    $scope.textLineTypeValue = {};
    $scope.textLineTypeValue["PROMO_TEXT"] = "Promo Text";
    $scope.textLineTypeValue["TAG_LINE"] = "Tagline";
    $scope.textLineTypeValue["HS_TEXT"] = "HS Text";
    $scope.textLineTypeValue["TEASER_TEXT"] = "Teaser Text";
    $scope.textLineTypeValue["SHORT_TEASER_TEXT"] = "Short Teaser Text";
    $scope.textLineTypeValue["SCAP_TEXT"] = "Scap Text";

    $scope.statusTypeValue = {};
    $scope.statusTypeValue["APPROVED"] = "Approved";
    $scope.statusTypeValue["REJECTED"] = "Rejected";
    $scope.statusTypeValue["IN_PROGRESS"] = "In progress";

    $scope.setHideAll(function () {
        $scope.message = {};
        $scope.currentMerchant = {};
    });

    $scope.initAsset = function () {
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
                }, function (data) {
                    if (data.errorCode !== undefined
                            && data.errorCode > 0) {
                        $scope.loading = false;
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


    $scope.setReload($scope.initAsset);

    $scope.canBeLoaded = function (assetContract, displayError) {
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
        $scope.initAsset();
    }
}