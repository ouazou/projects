angular.module('camsAdminFactories', ['ngResource'])
        .factory('Log', function($resource) {
            return $resource('/cams-ui/resources/log');
        })
        .factory('ConfigLog', function($resource) {
            return $resource('/cams-ui/resources/configlog?rootLoggingLevel=:rootLoggingLevel&');
        })
        .factory('Property', function($resource) {
            return $resource('/cams-ui/resources/properties');
        })
        .factory('Batch', function($resource) {
            return $resource('/cams-ui/resources/services/batch/jobInstance?page=:page&size=:size');
        })
        .factory('Service', function($resource) {
            return $resource('/cams-ui/resources/services/configuration/:service');
        });