function AssetInformationCtrl($location, $scope, $routeParams, $filter, $modal, $timeout, $resource, ContentByMerchant, PropertyByMerchant, Content, AssetByMerchantId, SocialNetworkOptins, KMSData) {
    $scope.setActive('assetInformation');
    $scope.setSubscribe('MERCHANT');
    $scope.message = '';
    $scope.showTimeline = false;
    $scope.merchantIdSearch = $routeParams.merchantId || "";
    $scope.loading = false;
    $scope.dynamic = 20;
    $scope.type = 'info';
    $scope.max = 100;
    $scope.linkAssetAndContent = true;
    $scope.contentLoading = false;
    $scope.expanded = false;

    $scope.initAssetsTab = function(providedMerchantId) {
        $scope.message = {};
        $scope.currentMerchant = {};
        $scope.currentMerchant.merchantId = $routeParams.merchantId;
        $scope.loading = true;
        $scope.loadingMessage = "Loading merchant properties...";
        $scope.setSubscribeId($routeParams.merchantId);
        if(providedMerchantId === undefined){
            $scope.setProvidedMerchantId($routeParams.merchantId);
            providedMerchantId = $routeParams.merchantId;
        }

        if (providedMerchantId === $routeParams.merchantId) {
            PropertyByMerchant.get({
                merchantId: providedMerchantId
            }, function(data) {
                $scope.dynamic = 40;
                $timeout(function() {
                    $scope.currentMerchant.property = data.merchantProperty;
                    if ($scope.currentMerchant.property === undefined
                            || $scope.currentMerchant.property.status !== "MERGED") {
                        $scope.loadingMessage = "Loading merchant contents...";
                        
                        AssetByMerchantId.get({
                            merchantId: providedMerchantId
                        }, function(data) {
                            if (data.errorCode !== undefined
                                    && data.errorCode > 0) {
                                $scope.message.asset = data.errorDescription;
                            }
                            $scope.currentMerchant.asset = data.asset;
                            $scope.prepareAssets();
                        });

                    } 
                    
                    $scope.loading = false;
                    $scope.dynamic = 20;
                        
                }, 500);

            });
        } else {
            $location.path('asset_information/' + providedMerchantId);
        }

    };
    
    $scope.setInitTab($scope.initAssetsTab);

    $scope.initAssetContent = function() {

    };

    $scope.goToAsset = function(asset) {
        $location.path('assets/' + asset.assetId + '/client/' + asset.clientNo + '/contract/' + asset.contractNo + '/productLine/' + asset.productLineId);
    };

    $scope.prepareAssets = function() {
        if ($scope.currentMerchant.asset) {
            for (var i = 0; i < $scope.currentMerchant.asset.length; i++) {
                $scope.currentMerchant.asset[i].$$open = false;
                KMSData.get({type: 'directory', id: $scope.currentMerchant.asset[i].directoryCode}, function (data) {
                    if(data.nameWithDirCode) {
                        for (var j = 0; j < $scope.currentMerchant.asset.length; j++) {
                            if($scope.currentMerchant.asset[j].directoryCode === data.dirCode) {
                                $scope.currentMerchant.asset[j].$$directoryName = data.nameWithDirCode;
                            }
                        }
                    }
                });
                KMSData.get({type: 'heading', id: $scope.currentMerchant.asset[i].headingCode}, function (data) {
                    if(data.enNameWithHeadingId) {
                        for (var k = 0; k < $scope.currentMerchant.asset.length; k++) {
                            if($scope.currentMerchant.asset[k].headingCode === data.headingId) {
                                $scope.currentMerchant.asset[k].$$headingName = data.enNameWithHeadingId;
                            }
                        }

                    }
                });
            }
        }
    };

    $scope.setReload($scope.initAssetsTab);

    $scope.loadMerchantContentWithDate = function() {
        var stateTime = moment.utc(moment($scope.currentMerchant.Date).format()).format("YYYY-MM-DDTHH:mm") + ":00Z";

        $scope.loading = true;
        $scope.loadingMessage = "Loading merchant properties...";
        $scope.message = {};


        PropertyByMerchant.get({
            merchantId: $scope.merchantIdSearch,
            date: stateTime
        }, function(data) {
            $scope.dynamic = 50;
            $timeout(function() {
                $scope.currentMerchant.property = data.merchantProperty;
                if ($scope.currentMerchant.property === undefined
                        || $scope.currentMerchant.property.status !== "MERGED") {
                    $scope.loadingMessage = "Loading merchant contents...";
                    ContentByMerchant.get({
                        merchantId: $scope.merchantIdSearch,
                        date: stateTime
                    }, function(data) {

                        $scope.dynamic = 75;
                        $timeout(function() {
                            if (data.errorCode !== undefined
                                    && data.errorCode > 0) {
                                $scope.message.content = data.errorDescription;
                            } else {
                                $scope.currentMerchant.content = new jYP.content.Contents(data.content);
                            }

                            $scope.loadingMessage = "Loading merchant optins...";
                            $timeout(function() {
                                SocialNetworkOptins.get({
                                    merchantId: $scope.merchantIdSearch,
                                    date: stateTime
                                }, function(data) {
                                    if (data.errorCode !== undefined
                                            && data.errorCode > 0) {
                                        $scope.message.socialNetworkOptins = data.errorDescription;
                                    }
                                    $scope.currentMerchant.socialNetworkOptins = data.socialNetworkOptins;
                                });
                            }, 500);

                            $scope.loadingMessage = "Loading merchant assets...";
                            $timeout(function() {
                                AssetByMerchantId.get({
                                    merchantId: $scope.merchantIdSearch,
                                    date: stateTime
                                }, function(data) {
                                    if (data.errorCode !== undefined
                                            && data.errorCode > 0) {
                                        $scope.message.asset = data.errorDescription;
                                    }
                                    $scope.currentMerchant.asset = data.asset;
                                });
                            }, 500);


                            $scope.loading = false;
                            $scope.dynamic = 25;
                        }, 500);
                    });
                } else {
                    $scope.loading = false;
                    $scope.dynamic = 25;
                }
            }, 500);

        });
    };

    if ($routeParams.merchantId !== "") {
        $scope.merchantIdSearch = $routeParams.merchantId;
        if (jQuery.isNumeric($routeParams.merchantId)) {
            $scope.initAssetsTab();
        } else {
            $scope.message = "Please enter a number as Merchant Id";
        }
    }

    $scope.setInformationDate = function() {
        if ($scope.currentMerchant.Date !== undefined
                && $scope.currentMerchant.Date !== "") {
            //Ack because of iexplorer
            if (moment($scope.currentMerchant.Date).format() === "Invalid date") {
                $scope.currentMerchant.content = new Object();
                $scope.currentMerchant.content.errorMessage = "Please enter a valid date (format expecting : yyyy-MM-dd'T'HH:mm)";
            } else {
                $scope.loadMerchantContentWithDate();
            }
            ;
        } else {
            $scope.initAssetsTab();
        }

    };

    $scope.changeShowTimeline = function() {
        $scope.showTimeline = !$scope.showTimeline;
        if ($scope.showTimeline) {
            $scope.currentMerchant.Date = $filter('date')(
                    Date.now(),
                    'yyyy-MM-ddTHH:mm');
            $scope.loadMerchantContentWithDate();
        } else {
            $scope.initAssetsTab();
        }
    };

    $scope.submitSearch = function() {
        if ($scope.merchantIdSearch) {
            $location.path('merchants/' + $scope.merchantIdSearch);
        } else {
            $location.path('/');
        }
    };

    $scope.changeEffectiveDate = function(content) {
        content.effectiveDate = new jYP.content.DateTimeLocal(new Date());
    };

    $scope.changeExpirationDate = function(content) {
        content.expirationDate = new jYP.content.DateTimeLocal(new Date());
    };

    $scope.addContent = function(type) {
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
        }
    };

    $scope.removeContent = function(contentToDelete) {
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

    $scope.reloadContent = function(contentToDelete) {
        for (var contentCptId in $scope.currentMerchant.content) {
            var contentGenerique = $scope.currentMerchant.content[contentCptId];
            for (var contentCptId2 in contentGenerique) {
                var content = contentGenerique[contentCptId2];
                if (content.metaData.contentId === contentToDelete.metaData.contentId) {
                    contentGenerique.splice(contentCptId2, 1);
                    if (content.$$type === "headingcontent") {
                        var newContent = new jYP.content.HeadingContent(contentToDelete);
                        contentGenerique.splice(contentCptId2, 0, newContent);
                    } else if (content.$$type === "urlcontent") {
                        var newContent = new jYP.content.UrlContent(contentToDelete);
                        contentGenerique.splice(contentCptId2, 0, newContent);
                    } else if (content.$$type === "keywordcontent") {
                        var newContent = new jYP.content.KeywordContent(contentToDelete);
                        contentGenerique.splice(contentCptId2, 0, newContent);
                    }
                }
            }
        }
    };

    $scope.editContent = function(contentToEdit, $event, $element) {
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

    $scope.cancelEditContent = function(contentToEdit) {
        if (contentToEdit.metaData.contentId) {
            Content.get({
                merchantId: $scope.currentMerchant.merchantId,
                contentId: contentToEdit.metaData.contentId
            }, function(data) {
                $scope.reloadContent(data);
            }
            );
        } else {
            //Otherwise this component have been added in the ui but never saved
            $scope.removeContent(contentToEdit);
        }
    };

    $scope.trashContent = function(contentToDelete) {
        //If the content has been save we ask for a reason before sending the
        //delete request
        if (contentToDelete.metaData.contentId) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl
            });

            modalInstance.result.then(function(comment) {
                if (comment !== "") {
                    //We set the new comment if we create one day
                    //we send the delete request
                    Content.remove({
                        merchantId: $scope.currentMerchant.merchantId,
                        contentId: contentToDelete.metaData.contentId
                    }, function() {
                        //We remove the content from the screen
                        $scope.removeContent(contentToDelete);
                        $scope.displaySuccess('Information have been saved');
                        $scope.initAssetsTab();
                    });
                }
            });
        } else {
            //Otherwise this component have been added in the ui but never saved
            $scope.removeContent(contentToDelete);
        }
    };

    $scope.postContent = function(contentToPost) {

        if (!contentToPost.hasError()) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl
            });

            modalInstance.result.then(function(comment) {
                jQuery("#edit-" + contentToPost.metaData.contentId).hide();
                jQuery("#save-" + contentToPost.metaData.contentId).button('loading');
                if (contentToPost.metaData.contentId) {
                    if (comment !== "") {
                        contentToPost.metaData.updateComment = comment;
                        var resource = $resource('/cams-ui/resources/services/merchant/:merchantId/content/:contentId', {}, {
                            save: {
                                method: "POST",
                                headers: {'Content-Type': 'application/' + contentToPost.$$type + '+json'}
                            }
                        });

                        resource.save({
                            merchantId: $scope.currentMerchant.merchantId,
                            contentId: contentToPost.metaData.contentId
                        }, angular.toJson(contentToPost), function() {
                            $scope.displaySuccess('Information have been saved');
                            contentToPost.$$editMode = false;
                            jQuery("#edit-" + contentToPost.metaData.contentId).show();
                            jQuery("#save-" + contentToPost.metaData.contentId).button('reset');
                        });
                    }
                } else {
                    if (comment !== "") {
                        contentToPost.metaData.updateComment = comment;
                        var resource = $resource('/cams-ui/resources/services/merchant/:merchantId/content', {}, {
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
                        }
                        resource.put({
                            merchantId: $scope.currentMerchant.merchantId
                        }, angular.toJson(content), function() {
                            $scope.displaySuccess('Information have been saved');
                            $scope.initAssetsTab();
                        });
                    }
                }
            });
        }
    };

    $scope.addKeyword = function(keywordList) {
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

    $scope.addUrl = function(urlList) {
        if (this.newUrl !== undefined)
            this.newUrl.error = {};
        if (this.newUrlsFr !== undefined && this.newUrlsEn !== undefined && this.newUrl.urlType !== undefined
                && this.newUrlsFr.value !== "" && this.newUrlsEn.value !== "" !== "" && this.newUrl.urlType !== "") {
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

    $scope.addHeading = function(headingList) {
        if (this.newHeading !== undefined) {
            this.newHeading.error = {};
            var heading = new jYP.content.Heading(this.newHeading);
            if (!heading.hasError()) {
                headingList.push(heading);
                this.newHeading.headingId = "";
            } else {
                this.newHeading.error.headingId = heading.$$error.headingId || "";
            }
        } else {
            this.newHeading = {};
            this.newHeading.error = {};
            this.newHeading.error.headingId = "Please enter a heading id";
        }
    };

    $scope.removeKeyword = function(contentElement, keyword) {
        for (var keywordId in contentElement.keyword) {
            if (contentElement.keyword[keywordId] === keyword) {
                contentElement.keyword.splice(keywordId, 1);
            }
        }
        return false;
    };

    $scope.removeUrl = function(contentElement, url) {
        for (var urlId in contentElement.url) {
            if (contentElement.url[urlId] === url) {
                contentElement.url.splice(urlId, 1);
            }
        }
        return false;
    };

    $scope.removeHeading = function(contentElement, heading) {
        for (var headingId in contentElement.heading) {
            if (contentElement.heading[headingId] === heading) {
                contentElement.heading.splice(headingId, 1);
            }
        }
        return false;
    };
}

var ModalInstanceCtrl = function($scope, $modalInstance) {
    $scope.$$errorMessage = '';
    $scope.selected = {
        comment: ''
    };

    $scope.ok = function() {
        if ($scope.selected.comment === '') {
            $scope.$$errorMessage = 'A comment is required to save modifications';
        } else {
            $scope.$$errorMessage = '';
            $modalInstance.close($scope.selected.comment);
        }
    };

    $scope.cancel = function() {
        $scope.$$errorMessage = '';
        $modalInstance.dismiss('cancel');
    };
};

var ModalLoadingCtrl = function($scope, $modalInstance, merchantId) {
    $scope.merchantId = merchantId;
};