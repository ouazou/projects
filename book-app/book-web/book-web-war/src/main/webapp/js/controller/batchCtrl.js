function BatchCtrl($scope, Batch) {
    $scope.setActive('batchs');

    $scope.batchs = Batch.get({page : 1, size: 10});
    
    $scope.refresh = function() {
        $scope.batchs = Batch.get({page : 1, size: 10});
    };
}
