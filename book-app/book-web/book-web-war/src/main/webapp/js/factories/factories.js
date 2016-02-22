angular.module('camsFactories', ['ngResource'])

        //KMS FACTORIES
        .factory('KMSData', function ($resource) {
            return $resource('/cams-ui/kmsdata?type=:type&id=:id');
        })

        //CAMS FACTORIES
        .factory('ContentByMerchant', function ($resource) {
            return $resource('/cams-ui/camsresources/services/merchant/:merchantId/content?stateTime=:date');
        })
        .factory('ContentHistoryByMerchant', function ($resource) {
            return $resource('/cams-ui/camsresources/services/merchant/:merchantId/contenthistory?stateTime=:date');
        })
        .factory('ProcessingInstructionsByMerchant', function ($resource) {
            return $resource('/cams-ui/camsresources/services/merchant/:merchantId/processinginstruction?stateTime=:date');
        })
        .factory('PropertyByMerchant', function ($resource) {
            return $resource('/cams-ui/camsresources/services/merchant/:merchantId/property?stateTime=:date');
        })
        .factory('Content', function ($resource) {
            return $resource('/cams-ui/camsresources/services/merchant/:merchantId/content/:contentId');
        })
        .factory('AssetByContract', function ($resource) {
            return $resource('/cams-ui/camsresources/services/asset/:assetId/:clientNo/:contractNo/:productLineId');
        })
        .factory('AssetByMerchantId', function ($resource) {
            return $resource('/cams-ui/camsresources/services/merchant/:merchantId/asset?stateTime=:date');
        })
        .factory('SocialNetworkOptins', function ($resource) {
            return $resource('/cams-ui/camsresources/services/merchant/:merchantId/socialnetworkoptin?stateTime=:date');
        })
        .factory('SyndicationContact', function ($resource) {
            return $resource('/cams-ui/camsresources/services/merchant/:merchantId/syndicationcontact?stateTime=:date');
        })

        //CADS FACTORIES
        .factory('SyndicationStatus', function ($resource) {
            return $resource('/cams-ui/cadsresources/services/syndicationinfo/:merchantId');
        })
        .factory('SyndicationPayload', function ($resource) {
            return $resource('/cams-ui/cadsresources/services/distribution/:merchantId/:syndicationSite/explain');
        })
        .factory('DistributionErrors', function ($resource) {
            return $resource('/cams-ui/cadsresources/services/distribution/:merchantId/errors');
        })
        .factory('DashboardErrors', function ($resource) {
            return $resource('/cams-ui/cadsresources/services/distribution/errors');
        });

