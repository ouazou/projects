function LogCtrl($scope, Log) {
    $scope.setActive('logs');

    $scope.logs = Log.query();
    $scope.predicate = 'Date';

    $scope.refresh = function() {
        $scope.logs = Log.query();
    };
    
    $scope.empty = function() {
        Log.delete({},function (){$scope.logs = Log.query();});
    };

}
