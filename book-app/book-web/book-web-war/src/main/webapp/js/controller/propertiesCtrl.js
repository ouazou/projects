function PropertyCtrl($scope, Property) {
    $scope.setActive('properties');
    $scope.predicate = 'Key';
    $scope.properties = Property.query();
}