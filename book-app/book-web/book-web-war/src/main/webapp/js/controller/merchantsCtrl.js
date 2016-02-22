function MerchantsCtrl($location, $scope, $routeParams, $filter, $modal, $timeout, $resource, User,
        ContentHistoryByMerchant, ContentByMerchant, ProcessingInstructionsByMerchant, PropertyByMerchant, Content, KMSData) {

    $scope.setActive('merchants');
    $scope.setSubscribe('MERCHANT');
    $scope.message = '';
    $scope.userRole = User.role;
    $scope.writePermission = $scope.userRole !== 'READ';
    $scope.showTimeline = false;
    $scope.active = false;
    $scope.history_btn_title = "History";
    $scope.merchantIdSearch = $routeParams.merchantId || "";
    $scope.loading = false;
    $scope.dynamic = 20;
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
   // $scope.headingTypeValue["PRIMARY"] = "Primary";
    $scope.directoryTypeValue = {};
    $scope.directoryTypeValue["HOME"] = "Home";

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

    $scope.history = [];
    $scope.selected = undefined;
    KMSData.query({type: 'heading'}, function (data) {
        $scope.headings = data;
    });

    $scope.initMerchantTab = function (providedMerchantId) {
        $scope.message = {};
        $scope.currentMerchant = {};
        $scope.currentMerchant.merchantId = $routeParams.merchantId;

        if ($scope.currentMerchant.merchantId >= 0) {
            $scope.loading = true;
            $scope.loadingMessage = "Loading merchant properties...";
            $scope.setSubscribeId($routeParams.merchantId);
        }

        if (providedMerchantId === undefined) {
            $scope.setProvidedMerchantId($routeParams.merchantId);
            providedMerchantId = $routeParams.merchantId;
        }

        if (providedMerchantId === $routeParams.merchantId && providedMerchantId >= 0) {
            PropertyByMerchant.get({
                merchantId: providedMerchantId
            }, function (data) {
                $scope.dynamic = 40;
                $timeout(function () {
                    $scope.currentMerchant.property = data.merchantProperty;
                    if ($scope.currentMerchant.property === undefined
                            || $scope.currentMerchant.property.status !== "MERGED") {
                        $scope.loadingMessage = "Loading merchant contents...";

                        ContentByMerchant.get({
                            merchantId: providedMerchantId
                        }, function (data) {
                            $scope.dynamic = 60;
                            $timeout(function () {
                                if (data.errorCode !== undefined
                                        && data.errorCode > 0) {
                                    $scope.message.content = data.errorDescription;
                                } else {
                                    $scope.currentMerchant.content = new jYP.content.Contents(data.content);
                                    $scope.loadHeadingLabel();
                                    $scope.loadDirectoryLabel();

                                }

                                $timeout(function () {
                                    $scope.loading = false;
                                    $scope.dynamic = 20;
                                }, 500);
                            }, 500);
                        });

                        ProcessingInstructionsByMerchant.get({
                            merchantId: providedMerchantId
                        }, function (data) {
                            $scope.dynamic = 60;
                            $timeout(function () {
                                if (data.errorCode !== undefined && data.errorCode > 0) {
                                    $scope.message.content = data.errorDescription;
                                    $scope.processingInstructions = null;
                                } else {
                                    $scope.processingInstructions = data.processingInstruction.processingInstructionProperty;
                                }

                                $timeout(function () {
                                    $scope.loading = false;
                                    $scope.dynamic = 20;
                                }, 500);
                            }, 500);
                        });

                        ContentHistoryByMerchant.get({
                            merchantId: providedMerchantId
                        }, function (data) {
                            $scope.dynamic = 60;
                            $timeout(function () {
                                if (data.errorCode !== undefined
                                        && data.errorCode > 0) {
                                    $scope.message.content = data.errorDescription;
                                    $scope.history = null;
                                } else {
                                    for (var i = 0; i < data.contentHistory.length; i++) {
                                        data.contentHistory[ i ].creationDate = $filter('date')(data.contentHistory[ i ].creationDate, 'yyyy-MM-ddTHH:mm');
                                    }

                                    $scope.history = data;
                                }

                                $timeout(function () {
                                    $scope.loading = false;
                                    $scope.dynamic = 20;
                                }, 500);
                            }, 500);
                        });
                    } else {
                        $timeout(function () {
                            $scope.loading = false;
                            $scope.dynamic = 20;
                        }, 500);
                    }
                }, 500);
            });

        } else {
            $location.path('merchants/' + providedMerchantId);
        }

    };

    $scope.loadHeadingLabel = function () {
        for (i = 0; i < $scope.currentMerchant.content.headingContent.length; i++) {
            headingContent = $scope.currentMerchant.content.headingContent[i];
            for (j = 0; j < headingContent.heading.length; j++) {
                heading = headingContent.heading[j];
                KMSData.get({type: 'heading', id: heading.headingId}, function (data) {
                    for (l = 0; l < $scope.currentMerchant.content.headingContent.length; l++) {
                        headingContent = $scope.currentMerchant.content.headingContent[l];
                        for (m = 0; m < headingContent.heading.length; m++) {
                            heading = headingContent.heading[m];
                            if (heading.headingId === data.headingId) {
                                heading.$$enName = data.enName;
                                heading.$$selected = data.enNameWithHeadingId;
                            }
                        }
                    }
                });
            }
        }
    };


    $scope.updateHeadingLabel = function (headingContent) {
        for (j = 0; j < headingContent.heading.length; j++) {
            heading = headingContent.heading[j];
            heading.$$enName = null;
            heading.$$selected = null;
            KMSData.get({type: 'heading', id: heading.headingId}, function (data) {
                for (m = 0; m < headingContent.heading.length; m++) {
                    heading = headingContent.heading[m];
                    if (heading.headingId === data.headingId) {
                        heading.$$enName = data.enName;
                        heading.$$selected = data.enNameWithHeadingId;
                    }
                }
            });
        }
    };

    $scope.loadDirectoryLabel = function () {
        for (i = 0; i < $scope.currentMerchant.content.directoryContent.length; i++) {
            directoryContent = $scope.currentMerchant.content.directoryContent[i];
            for (j = 0; j < directoryContent.directory.length; j++) {
                directory = directoryContent.directory[j];
                KMSData.get({type: 'directory', id: directory.code}, function (data) {
                    for (l = 0; l < $scope.currentMerchant.content.directoryContent.length; l++) {
                        directoryContent = $scope.currentMerchant.content.directoryContent[l];
                        for (m = 0; m < directoryContent.directory.length; m++) {
                            directory = directoryContent.directory[m];
                            if (directory.code === data.dirCode) {
                                directory.$$name = data.name;
                                directory.$$selected = data.nameWithDirCode;
                            }
                        }
                    }
                });
            }
        }
    };

    $scope.setInitTab($scope.initMerchantTab);
    $scope.setHideAll(function () {
        $scope.message = {};
        $scope.currentMerchant = {};
    });

    $scope.initAssetContent = function () {

    };

    $scope.goToAsset = function (asset) {
        $location.path('assets/' + asset.assetId + '/client/' + asset.clientNo + '/contract/' + asset.contractNo + '/productLine/' + asset.productLineId);
    };

    $scope.setReload($scope.initMerchantTab);

//    if($scope.merchantIdSearch !== undefined){
//        $scope.initMerchantTab($scope.merchantIdSearch);
//    }

    $scope.loadMerchantContentWithDate = function () {
        var stateTime = moment.utc(moment($scope.currentMerchant.Date).format()).format("YYYY-MM-DDTHH:mm") + ":59Z";

        $scope.message = {};
        $scope.currentMerchant.content = {};
        $scope.loading = true;
        $scope.loadingMessage = "Loading merchant properties ...";

        $scope.searchDateMessage = "Search Date: " + moment(moment($scope.currentMerchant.Date).format()).format("YYYY-MM-DDTHH:mm");

        PropertyByMerchant.get({
            merchantId: $scope.merchantIdSearch,
            date: stateTime
        }, function (data) {
            $scope.dynamic = 40;
            $timeout(function () {
                $scope.currentMerchant.property = data.merchantProperty;
                if ($scope.currentMerchant.property === undefined
                        || $scope.currentMerchant.property.status !== "MERGED") {
                    $scope.loadingMessage = "Loading merchant contents ...";

                    ContentByMerchant.get({
                        merchantId: $scope.merchantIdSearch,
                        date: stateTime
                    }, function (data) {
                        $scope.dynamic = 60;
                        $timeout(function () {
                            if (data.errorCode !== undefined
                                    && data.errorCode > 0) {
                                $scope.message.content = data.errorDescription;
                            } else {
                                $scope.currentMerchant.content = new jYP.content.Contents(data.content);
                                $scope.loadDirectoryLabel();
                                $scope.loadHeadingLabel();
                            }

                            $timeout(function () {
                                $scope.loading = false;
                                $scope.dynamic = 20;
                            }, 500);
                        }, 500);
                    });

                    ProcessingInstructionsByMerchant.get({
                        merchantId: $scope.merchantIdSearch,
                        date: stateTime
                    }, function (data) {
                        $scope.dynamic = 60;
                        $timeout(function () {
                            if (data.errorCode !== undefined && data.errorCode > 0) {
                                $scope.message.content = data.errorDescription;
                                $scope.processingInstructions = null;
                            } else {
                                $scope.processingInstructions = data.processingInstruction.processingInstructionProperty;
                            }

                            $timeout(function () {
                                $scope.loading = false;
                                $scope.dynamic = 20;
                            }, 500);
                        }, 500);
                    });

                    ContentHistoryByMerchant.get({
                        merchantId: $scope.merchantIdSearch,
                        date: stateTime
                    }, function (data) {
                        $scope.dynamic = 60;
                        $timeout(function () {
                            if (data.errorCode !== undefined
                                    && data.errorCode > 0) {
                                $scope.message.content = data.errorDescription;
                                $scope.history = null;
                            } else {
                                for (var i = 0; i < data.contentHistory.length; i++) {
                                    data.contentHistory[ i ].creationDate = $filter('date')(data.contentHistory[ i ].creationDate, 'yyyy-MM-ddTHH:mm');
                                }

                                $scope.history = data;
                            }

                            $timeout(function () {
                                $scope.loading = false;
                                $scope.dynamic = 20;
                            }, 500);
                        }, 500);
                    });
                }
            }, 500);
        });


    };

    if ($routeParams.merchantId !== "") {
        $scope.merchantIdSearch = $routeParams.merchantId;
        if (jQuery.isNumeric($routeParams.merchantId)) {
            $scope.initMerchantTab();
        } else {
            $scope.message = "Please enter a number as Merchant Id";
        }
    }

    $scope.setInformationDate = function () {
        if ($scope.currentMerchant.Date !== undefined
                && $scope.currentMerchant.Date !== "") {
            if (moment($scope.currentMerchant.Date).format() === "Invalid date") {
                $scope.currentMerchant.content = new Object();
                $scope.currentMerchant.content.errorMessage = "Please enter a valid date (format expecting : MM-dd-yyyy'T'HH:mm)";
            } else {
                $scope.loadMerchantContentWithDate();
            }
        } else {
            $scope.initMerchantTab();
        }
    };

    $scope.changeShowTimeline = function () {
        if ($scope.merchantIdSearch) {
            $scope.showTimeline = !$scope.showTimeline;
            if ($scope.showTimeline) {
                $scope.history_btn_title = "Reset";
                $scope.search_btn_title = "Search";
                $scope.currentMerchant.Date = $filter('date')(
                        Date.now(),
                        'yyyy-MM-ddTHH:mm');
                $scope.loadMerchantContentWithDate();
            } else {
                $scope.history_btn_title = "History";
                $scope.initMerchantTab();
            }
        }
    };

    $scope.submitSearch = function () {
        if ($scope.merchantIdSearch) {
            $location.path('merchants/' + $scope.merchantIdSearch);
        } else {
            $location.path('/');
        }
    };

    $scope.changeEffectiveDate = function (content) {
        content.effectiveDate = new jYP.content.DateTimeLocal(new Date());
    };

    $scope.changeExpirationDate = function (content) {
        content.expirationDate = new jYP.content.DateTimeLocal(new Date());
    };

    $scope.addContent = function (type) {
        if (!$scope.currentMerchant.content) {
            $scope.currentMerchant.content = new jYP.content.Contents();
        }
        if (type === "Urls") {
            var newContent = new jYP.content.UrlContent();
            newContent.$$open = true;
            newContent.$$editMode = true;
            $scope.currentMerchant.content.urlContent.push(newContent);
        } else if (type === "Headings") {
            var newContent = new jYP.content.HeadingContent();
            newContent.$$open = true;
            newContent.$$editMode = true;
            $scope.currentMerchant.content.headingContent.push(newContent);
        } else if (type === "Keywords") {
            var newContent = new jYP.content.KeywordContent();
            newContent.$$open = true;
            newContent.$$editMode = true;
            $scope.currentMerchant.content.keywordContent.push(newContent);
        } else if (type === "Directories") {
            var newContent = new jYP.content.DirectoryContent();
            newContent.$$open = true;
            newContent.$$editMode = true;
            $scope.currentMerchant.content.directoryContent.push(newContent);
        }
    };

    $scope.removeContent = function (contentToDelete) {
        for (var contentCptId in $scope.currentMerchant.content) {
            var contentGenerique = $scope.currentMerchant.content[contentCptId];
            for (var contentCptId2 in contentGenerique) {
                var content = contentGenerique[contentCptId2];
                if (content === contentToDelete) {
                    contentGenerique.splice(contentCptId2, 1);
                }
            }
        }
    };

    $scope.reloadContent = function (contentToDelete) {
        for (var contentCptId in $scope.currentMerchant.content) {
            var contentGenerique = $scope.currentMerchant.content[contentCptId];
            for (var contentCptId2 in contentGenerique) {
                var content = contentGenerique[contentCptId2];
                if (content.metaData.contentId === contentToDelete.metaData.contentId) {
                    contentGenerique.splice(contentCptId2, 1);
                    if (content.$$type === "headingcontent") {
                        var newContent = new jYP.content.HeadingContent(contentToDelete);
                        contentGenerique.splice(contentCptId2, 0, newContent);
                        $scope.updateHeadingLabel(newContent);
                    } else if (content.$$type === "urlcontent") {
                        var newContent = new jYP.content.UrlContent(contentToDelete);
                        contentGenerique.splice(contentCptId2, 0, newContent);
                    } else if (content.$$type === "keywordcontent") {
                        var newContent = new jYP.content.KeywordContent(contentToDelete);
                        contentGenerique.splice(contentCptId2, 0, newContent);
                    } else if (content.$$type === "directorycontent") {
                        var newContent = new jYP.content.DirectoryContent(contentToDelete);
                        contentGenerique.splice(contentCptId2, 0, newContent);
                    }
                }
            }
        }
    };

    $scope.editContent = function (contentToEdit, $event, $element) {
        if (contentToEdit.$$editMode) {
            $scope.cancelEditContent(contentToEdit);
        }

        if (contentToEdit.$$open === false) {
            contentToEdit.$$open = true;
            if (contentToEdit.metaData.sourceSystem === 'CAMS') {
                contentToEdit.$$editMode = true;
            }
            $event.stopPropagation();
        } else {
            contentToEdit.$$open = true;
            if (contentToEdit.metaData.sourceSystem === 'CAMS') {
                contentToEdit.$$editMode = true;
            }
        }
    };

    $scope.cancelEditContent = function (contentToEdit) {
        if (contentToEdit.metaData.contentId) {
            Content.get({
                merchantId: $scope.currentMerchant.merchantId,
                contentId: contentToEdit.metaData.contentId
            }, function (data) {
                $scope.reloadContent(data);
            }
            );
        } else {
            //Otherwise this component have been added in the ui but never saved
            $scope.removeContent(contentToEdit);
        }
    };

    $scope.trashContent = function (contentToDelete) {
        //If the content has been save we ask for a reason before sending the
        //delete request
        if (contentToDelete.metaData.contentId) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl
            });

            modalInstance.result.then(function (comment) {
                if (comment !== "") {
                    //We set the new comment if we create one day
                    //we send the delete request
                    Content.remove({
                        merchantId: $scope.currentMerchant.merchantId,
                        contentId: contentToDelete.metaData.contentId
                    }, function () {
                        //We remove the content from the screen
                        $scope.removeContent(contentToDelete);
                        $scope.displaySuccess('Information have been saved');
                        $scope.initMerchantTab();
                    });
                }
            });
        } else {
            //Otherwise this component have been added in the ui but never saved
            $scope.removeContent(contentToDelete);
        }
    };

    $scope.postContent = function (contentToPost, config) {

        if (!contentToPost.hasError(config)) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl
            });

            modalInstance.result.then(function (comment) {
                jQuery("#edit-" + contentToPost.metaData.contentId).hide();
                jQuery("#save-" + contentToPost.metaData.contentId).button('loading');
                if (contentToPost.metaData.contentId) {
                    if (comment !== "") {
                        contentToPost.metaData.updateComment = comment;
                        var resource = $resource('/cams-ui/camsresources/services/merchant/:merchantId/content/:contentId', {}, {
                            save: {
                                method: "POST",
                                headers: {'Content-Type': 'application/' + contentToPost.$$type + '+json'}
                            }
                        });

                        resource.save({
                            merchantId: $scope.currentMerchant.merchantId,
                            contentId: contentToPost.metaData.contentId
                        }, angular.toJson(contentToPost), function () {
                            if (contentToPost.$$type === "headingcontent") {
                                $scope.updateHeadingLabel(contentToPost);
                            }
                            $scope.displaySuccess('Information have been saved');
                            contentToPost.$$editMode = false;
                            jQuery("#edit-" + contentToPost.metaData.contentId).show();
                            jQuery("#save-" + contentToPost.metaData.contentId).button('reset');
                        });

                        $scope.loading = true;
                        $scope.loadingMessage = "Loading merchant properties…";

                        $timeout(function () {
                            $scope.loading = false;
                            $scope.dynamic = 20;
                        }, 1000);
                    }
                } else {
                    if (comment !== "") {
                        contentToPost.metaData.updateComment = comment;
                        var resource = $resource('/cams-ui/camsresources/services/merchant/:merchantId/content', {}, {
                            put: {
                                method: "PUT",
                                headers: {'Content-Type': 'application/' + contentToPost.$$type + '+json'}
                            }
                        });

                        var array = [];
                        array.push(contentToPost);
                        var content;
                        // Defines Payload
                        if (contentToPost.$$type === "urlcontent") {
                            content = {urlContent: array};
                        } else if (contentToPost.$$type === "headingcontent") {
                            content = {headingContent: array};
                        } else if (contentToPost.$$type === "keywordcontent") {
                            content = {keywordContent: array};
                        } else if (contentToPost.$$type === "directorycontent") {
                            content = {directoryContent: array};
                        } else if (contentToPost.$$type === "directorycontent") {
                            content = {directoryContent: array};
                        }
                        resource.put({
                            merchantId: $scope.currentMerchant.merchantId
                        }, angular.toJson(content), function () {
                            if (contentToPost.$$type === "headingcontent") {
                                $scope.updateHeadingLabel(contentToPost);
                            }
                            $scope.displaySuccess('Information have been saved');
                            $scope.initMerchantTab();
                        });

                        $scope.loading = true;
                        $scope.loadingMessage = "Loading merchant properties…";

                        $timeout(function () {
                            $scope.loading = false;
                            $scope.dynamic = 20;
                        }, 1000);
                    }
                }
            });
        }
    };

    $scope.addKeyword = function (keywordList) {
        if (this.newKeyword !== undefined)
            this.newKeyword.error = {};
        if (this.newKeywordsFr !== undefined && this.newKeywordsEn
                && this.newKeywordsFr.value !== "" && this.newKeywordsEn.value) {
            this.newKeyword = this.newKeyword || {};
            var keyword = new jYP.content.Keyword(this.newKeyword);
            keyword.keywordLocalized.push(new jYP.content.KeywordLocalized({languageCode: "FR", value: this.newKeywordsFr.value}));
            keyword.keywordLocalized.push(new jYP.content.KeywordLocalized({languageCode: "EN", value: this.newKeywordsEn.value}));
            if (!keyword.hasError()) {
                keywordList.push(keyword);

                this.newKeyword.keywordId = "";
                this.newKeyword.keywordClass = "";
                this.newKeyword.displayable = false;
                this.newKeywordsEn.value = "";
                this.newKeywordsFr.value = "";
            } else {
                this.newKeyword = {};
                this.newKeyword.error = {};
                if (this.newKeywordsEn === undefined)
                    this.newKeyword.error.keywordsEn = "Please set a keyword in english";
                if (this.newKeywordsFr === undefined)
                    this.newKeyword.error.keywordsFr = "Please set a keyword in french";
            }
        } else {
            if (this.newKeyword === undefined)
                this.newKeyword = {};
            this.newKeyword.error = {};
            if (this.newKeywordsEn === undefined || this.newKeywordsEn.value === "")
                this.newKeyword.error.keywordsEn = "Please set a keyword in english";
            if (this.newKeywordsFr === undefined || this.newKeywordsFr.value === "")
                this.newKeyword.error.keywordsFr = "Please set a keyword in french";
        }
    };

    $scope.addUrl = function (urlList) {
        if (this.newUrl !== undefined)
            this.newUrl.error = {};
        if (this.newUrlsFr !== undefined && this.newUrlsEn !== undefined && this.newUrl.urlType !== undefined
                && this.newUrlsFr.value !== "" && this.newUrlsEn.value !== "" && this.newUrl.urlType !== "") {
            this.newUrl = this.newUrl || {};
            var url = new jYP.content.Url(this.newUrl);
            url.urlLocalized.push(new jYP.content.UrlLocalized({languageCode: "FR", url: this.newUrlsFr.value}));
            url.urlLocalized.push(new jYP.content.UrlLocalized({languageCode: "EN", url: this.newUrlsEn.value}));
            if (!url.hasError()) {
                urlList.push(url);

                this.newUrl.urlId = "";
                this.newUrl.urlClass = "";
                this.newUrl.urlType = "";
                this.newUrlsEn.value = "";
                this.newUrlsFr.value = "";
            } else {
                if (this.newUrl === undefined)
                    this.newUrl = {};
                    this.newUrl.error = {};
                if (this.newUrlsEn === undefined)
                    this.newUrl.error.urlsEn = "Please set a url in english";
                if (this.newUrlsFr === undefined)
                    this.newUrl.error.urlsFr = "Please set a url in french";
                if (this.newUrl.urlType === undefined || this.newUrl.urlType === "")
                    this.newUrl.error.urlType = "Please choose a URL Type";
            }
        } else {
            if (this.newUrl === undefined)
                this.newUrl = {};
            this.newUrl.error = {};
            if (this.newUrlsEn === undefined || this.newUrlsEn.value === "")
                this.newUrl.error.urlsEn = "Please set a url in english";
            if (this.newUrlsFr === undefined || this.newUrlsFr.value === "")
                this.newUrl.error.urlsFr = "Please set a url in french";
            if (this.newUrl.urlType === undefined || this.newUrl.urlType === "")
                this.newUrl.error.urlType = "Please choose a URL Type";
        }
    };

    $scope.addHeading = function (headingContent, headingList) {
        if (this.newHeading !== undefined) {
            this.newHeading.error = {};
            var heading = new jYP.content.Heading(this.newHeading);
            if (!heading.hasError()) {
                if (heading.headingType == "PRIMARY" && headingContent.getPrimaryHeadings() > 0) {
                    this.newHeading.error.headingType = "A merchant can have only one heading with Heading Type 'Primary'";
                } else {
                    headingList.push(heading);
                    this.newHeading.headingId = "";
                    this.newHeading.headingType = "";
                }
            } else {
                this.newHeading.error.headingId = heading.$$error.headingId || "";
                this.newHeading.error.headingType = heading.$$error.headingType || "";
            }
        } else {
            this.newHeading = {};
            this.newHeading.error = {};
            this.newHeading.error.headingId = "Please enter a heading id";
        }
    };

    $scope.addDirectory = function (directoryContent, directoryList) {
        if (this.newDirectory !== undefined) {
            this.newDirectory.error = {};
            var directory = new jYP.content.Directory(this.newDirectory);
            if (!directory.hasError()) {
                if (directory.type === "HOME" && directoryContent.getHomeDirectorys() > 0) {
                    this.newDirectory.error.directoryType = "A merchant can have only one directory with Directory Type 'Home'";
                } else {
                    directoryList.push(directory);
                    this.newDirectory.code = "";
                    this.newDirectory.type = "";
                }
            } else {
                this.newDirectory.error.code = directory.$$error.code || "";
                this.newDirectory.error.type = directory.$$error.type || "";
            }
        } else {
            this.newDirectory = {};
            this.newDirectory.error = {};
            this.newDirectory.error.code = "Please enter a directory id";
        }
    };

    $scope.removeKeyword = function (contentElement, keyword) {
        for (var keywordId in contentElement.keyword) {
            if (contentElement.keyword[keywordId] === keyword) {
                contentElement.keyword.splice(keywordId, 1);
            }
        }
        return false;
    };

    $scope.removeUrl = function (contentElement, url) {
        for (var urlId in contentElement.url) {
            if (contentElement.url[urlId] === url) {
                contentElement.url.splice(urlId, 1);
            }
        }
        return false;
    };

    $scope.removeHeading = function (contentElement, heading) {
        for (var headingId in contentElement.heading) {
            if (contentElement.heading[headingId] === heading) {
                contentElement.heading.splice(headingId, 1);
            }
        }
        return false;
    };

    $scope.removeDirectory = function (contentElement, directory) {
        for (var directoryId in contentElement.directory) {
            if (contentElement.directory[directoryId] === directory) {
                contentElement.directory.splice(directoryId, 1);
            }
        }
        return false;
    };

    $scope.getPreviousDate = function () {
//        var someDate = $filter('date')( Date.now(), 'yyyy-MM-ddTHH:mm');
        if ($scope.merchantIdSearch) {
            $scope.showTimeline = true;
            $scope.currentMerchant.Date = $scope.currentMerchant.content.getPreviousDate();
            $scope.setInformationDate();
        }
    };

    $scope.getNextDate = function () {
        if ($scope.merchantIdSearch) {
            var currentDate = $scope.currentMerchant.Date,
                    today = $filter('date')(Date.now(), 'yyyy-MM-ddTHH:mm');

            $scope.showTimeline = true;
            $scope.currentMerchant.Date = $scope.currentMerchant.content.getNextDate(currentDate, today);
            $scope.setInformationDate();
        }
    };

    $scope.businessHourOrder = function (businessHour) {
        switch (businessHour.dayCode) {
            case "MON":
                return 1;
            case "TUE":
                return 2;
            case "WED":
                return 3;
            case "THU":
                return 4;
            case "FRI":
                return 5;
            case "SAT":
                return 6;
            case "SUN":
                return 7;
            default:
                return businessHour.dayCode;
        }
    };
}

var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.$$errorMessage = '';
    $scope.selected = {
        comment: ''
    };

    $scope.ok = function () {
        if ($scope.selected.comment === '') {
            $scope.$$errorMessage = 'A comment is required to save modifications';
        } else {
            $scope.$$errorMessage = '';
            $modalInstance.close($scope.selected.comment);
        }
    };

    $scope.cancel = function () {
        $scope.$$errorMessage = '';
        $modalInstance.dismiss('cancel');
    };
};

var ModalLoadingCtrl = function ($scope, $modalInstance, merchantId) {
    $scope.merchantId = merchantId;
};