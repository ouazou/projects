function MonitoringCtrl($scope, $interval) {
    $scope.status = [];
    
    $scope.checkDCUBLconnectivity = function () {
        $.get("../../dcublresources/monitoring")
        .error(function () {
            $scope.status.push({name: "DCUBL", url: "../../dcublresources/monitoring"});
            $scope.$apply();
        });
    };
    
    $scope.checkCAMSconnectivity = function () {
        $.get("../../camsresources/monitoring")
        .error(function () {
            $scope.status.push({name: "CAMS-Core", url: "../../camsresources/monitoring"});
            $scope.$apply();
        });
    };

    $scope.checkCADSconnectivity = function () {
        $.get("../../cadsresources/monitoring")
            .error(function () {
                $scope.status.push({name: "CADS", url: "../../cadsresources/monitoring"});
                $scope.$apply();
            });
    };
    
    $scope.checkDCUBLconnectivity();
    $scope.checkCAMSconnectivity();
    $scope.checkCADSconnectivity();

    $interval( function () {
        $scope.status.length = 0;
        
        $scope.checkDCUBLconnectivity();
        $scope.checkCAMSconnectivity();
        $scope.checkCADSconnectivity();
    }, 1000 * 60 * 2 );
}
