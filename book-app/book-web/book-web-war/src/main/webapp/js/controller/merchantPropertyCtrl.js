MerchantPropertyCtrl = function($scope, $routeParams, $modal, $timeout, $resource, ContentByMerchant, PropertyByMerchant, KMSData) {

    $scope.initMerchantProperty = function (merchantId) {
        if(merchantId) {
            $scope.currentMerchantProperty = {};
            $scope.currentMerchantId = merchantId;
            if (merchantId >= 0) {
                PropertyByMerchant.get({
                    merchantId: merchantId
                }, function (data) {
                    $scope.dynamic = 40;
                    $timeout(function () {
                        $scope.currentMerchantProperty = data.merchantProperty;
                        $scope.currentMerchantId = merchantId;
                        if ($scope.currentMerchantProperty === undefined
                            || $scope.currentMerchantProperty.status !== "MERGED") {

                            ContentByMerchant.get({
                                merchantId: merchantId
                            }, function (data) {
                                $timeout(function () {
                                    if (data.errorCode !== undefined
                                        && data.errorCode > 0) {
                                        $scope.message.content = data.errorDescription;
                                    } else {
                                        content = new jYP.content.Contents(data.content);

                                        $scope.currentMerchantPrimaryHeadingContent = content.getPrimaryHeadingContent();

                                        if ($scope.currentMerchantPrimaryHeadingContent) {
                                            $scope.currentMerchantProperty.primaryHeadingId = $scope.currentMerchantPrimaryHeadingContent.heading[0].headingId;
                                            $scope.retrieveHeadingLabel();
                                        }
                                        $scope.currentMerchantHomeDirectoryContent = content.getHomeDirectoryContent();
                                        if ($scope.currentMerchantHomeDirectoryContent) {
                                            $scope.currentMerchantProperty.homeDirectoryCode = $scope.currentMerchantHomeDirectoryContent.directory[0].code;
                                            $scope.retrieveDirectoryLabel();
                                        }
                                    }
                                }, 500);
                            });
                        }
                    }, 500);
                });
            }
            console.log("PropertyByMerchant: " + merchantId);
        }
    };

    $scope.initMerchantProperty($routeParams.merchantId);

    $scope.setInitPanel($scope.initMerchantProperty);

    $scope.retrieveHeadingLabel = function () {
        $scope.currentMerchantProperty.primaryHeadingName = $scope.currentMerchantProperty.primaryHeadingId;
        KMSData.get({type: 'heading', id: $scope.currentMerchantProperty.primaryHeadingId}, function (data) {
            if(data.enNameWithHeadingId) {
                $scope.currentMerchantProperty.primaryHeadingName = data.enNameWithHeadingId;
            }
       });
    };

    $scope.retrieveDirectoryLabel = function () {
        $scope.currentMerchantProperty.homeDirectoryName = $scope.currentMerchantProperty.homeDirectoryCode;
        KMSData.get({type: 'directory', id: $scope.currentMerchantProperty.homeDirectoryCode}, function (data) {
            if(data.nameWithDirCode) {
                $scope.currentMerchantProperty.homeDirectoryName = data.nameWithDirCode;
            }
        });
    };

    $scope.$on("headingChangeEvent", function (event, args) {
        $scope.retrieveHeadingLabel();
    });

    $scope.$on("directoryChangeEvent", function (event, args) {
        $scope.retrieveDirectoryLabel();
    });

};


MerchantPropertyEditCtrl = function($scope, $routeParams, $modal, $timeout, $resource, User, Content, ContentByMerchant) {

    $scope.userRole = User.role;
    $scope.writePermission = $scope.userRole !== 'READ';

    $scope.reloadFromCAMS = function (item) {
        ContentByMerchant.get({
            merchantId: $scope.currentMerchantId
        }, function (data) {
            $timeout(function () {
                if (data.errorCode !== undefined && data.errorCode > 0) {
                    $scope.currentMerchantPrimaryHeadingContent = null;
                    $scope.currentMerchantHomeDirectoryContent = null;
                    $scope.refresh(item);
                } else {
                    content = new jYP.content.Contents(data.content);
                    $scope.currentMerchantPrimaryHeadingContent = content.getPrimaryHeadingContent();
                    $scope.currentMerchantHomeDirectoryContent = content.getHomeDirectoryContent();
                    $scope.refresh(item);
                }
            }, 500);
        });
    };

    $scope.refresh = function (item) {
        if (item == 'PrimaryHeading') {
            if ($scope.currentMerchantPrimaryHeadingContent) {
                $scope.currentMerchantProperty.primaryHeadingId = $scope.currentMerchantPrimaryHeadingContent.heading[0].headingId;
                $scope.$root.$broadcast("headingChangeEvent", null);
            } else {
                $scope.currentMerchantProperty.primaryHeadingId = null;
                $scope.currentMerchantProperty.primaryHeadingName = null;
            }
        } else if (item == 'HomeDirectory') {
            if ($scope.currentMerchantHomeDirectoryContent) {
                $scope.currentMerchantProperty.homeDirectoryCode = $scope.currentMerchantHomeDirectoryContent.directory[0].code;
                $scope.$root.$broadcast("directoryChangeEvent", null);
            } else {
                $scope.currentMerchantProperty.homeDirectoryCode = null;
                $scope.currentMerchantProperty.homeDirectoryName = null;
            }
        }
    };

    $scope.save = function (type) {
        if (type == 'PrimaryHeading') {
            if ($scope.currentMerchantProperty.primaryHeadingId == null || $scope.currentMerchantProperty.primaryHeadingId.length == 0) {
                $scope.delete($scope.currentMerchantPrimaryHeadingContent, type);
            } else {
                if ($scope.currentMerchantPrimaryHeadingContent != null && $scope.currentMerchantPrimaryHeadingContent.heading[0].headingId != $scope.currentMerchantProperty.primaryHeadingId) {
                    $scope.currentMerchantPrimaryHeadingContent.heading[0].headingId = $scope.currentMerchantProperty.primaryHeadingId;
                    $scope.postContent($scope.currentMerchantPrimaryHeadingContent, type);
                } else if ($scope.currentMerchantPrimaryHeadingContent == null){
                    var newContent = new jYP.content.PrimaryHeadingContent($scope.currentMerchantProperty.primaryHeadingId);
                    $scope.addContent(newContent, type);
                }
            }
        } else if (type == 'HomeDirectory') {
            if ($scope.currentMerchantProperty.homeDirectoryCode == null || $scope.currentMerchantProperty.homeDirectoryCode.length == 0) {
                $scope.delete($scope.currentMerchantHomeDirectoryContent, type);
            } else {
                if ($scope.currentMerchantHomeDirectoryContent != null && $scope.currentMerchantHomeDirectoryContent.directory[0].code != $scope.currentMerchantProperty.homeDirectoryCode) {
                    $scope.currentMerchantHomeDirectoryContent.directory[0].code = $scope.currentMerchantProperty.homeDirectoryCode;
                    $scope.postContent($scope.currentMerchantHomeDirectoryContent, type);
                } else if ($scope.currentMerchantHomeDirectoryContent == null){
                    var newContent = new jYP.content.HomeDirectoryContent($scope.currentMerchantProperty.homeDirectoryCode);
                    $scope.addContent(newContent, type);
                }
            }
        }
    }

    $scope.postContent = function (contentToPost, type) {
        if (contentToPost.metaData.contentId) {
            var resource = $resource('/cams-ui/camsresources/services/merchant/:merchantId/content/:contentId', {}, {
                save: {
                    method: "POST",
                    headers: {'Content-Type': 'application/' + contentToPost.$$type + '+json'}
                }
            });

            resource.save({
                merchantId: $scope.currentMerchantId,
                contentId: contentToPost.metaData.contentId
            }, angular.toJson(contentToPost), function () {
                console.log('Content has been saved');
                $scope.reloadFromCAMS(type);
            });
        }
    };


    $scope.addContent = function (contentToPost, type) {
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
        if (contentToPost.$$type === "headingcontent") {
            content = {headingContent: array};
        } else if (contentToPost.$$type === "directorycontent") {
            content = {directoryContent: array};
        }
        resource.put({
            merchantId: $scope.currentMerchantId
        }, angular.toJson(content), function () {
            console.log('Content has been saved');
            $scope.reloadFromCAMS(type);
        });
    };

    $scope.delete = function (contentToDelete, type) {
        if (contentToDelete.metaData.contentId) {
            //We set the new comment if we create one day
            //we send the delete request
            Content.remove({
                merchantId: $scope.currentMerchantId,
                contentId: contentToDelete.metaData.contentId
            }, function () {
                console.log('Content has been deleted');
                $scope.reloadFromCAMS(type);
            });
        }
    };
};