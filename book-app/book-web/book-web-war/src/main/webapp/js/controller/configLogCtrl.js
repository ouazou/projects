function ConfigLogCtrl($scope, ConfigLog, $resource) {
    $scope.setActive('configLogs');

    $scope.logs = ConfigLog.query();
    $scope.predicate = 'Name';
    $scope.newLogLevel = 'INFO';
    $scope.rootLevel = 'INFO';

    $scope.refresh = function() {
        $scope.logs = ConfigLog.query();
    };
    $scope.setRootLoggingConfig = function() {
        this.rootLevelError = "";
        if (this.rootLevel !== undefined) {
            var data = {};
            data.rootLoggingLevel = this.rootLevel;
            var rootLevel = $resource('/cams-ui/resources/configlog?rootLoggingLevel=' + this.rootLevel, {});
            rootLevel.save(function() {
                $scope.refresh();
            });
        } else {
            this.rootLevelError = "Please choose a level";
        }
    };

    $scope.addLoggingConfig = function() {
        this.newLog = "";
        if (this.newLogName !== undefined
                && this.newLogLevel !== undefined) {
            var data = {};
            data.rootLoggingLevel = this.rootLevel;
            var logger = $resource('/cams-ui/resources/configlog?loggerName=' + this.newLogName + '&loggerLevel=' + this.newLogLevel, {});
            logger.save(function() {
                $scope.refresh();
            });
        } else {
            this.newLog = "Please choose a name and level";
        }
    };



    $scope.changeLog = function(log) {
        this.newLog = "";
        var logger = $resource('/cams-ui/resources/configlog?loggerName=' + log.Name + '&loggerLevel=' + log.Level, {});
        logger.save(function() {
            $scope.refresh();
        });
    };
}