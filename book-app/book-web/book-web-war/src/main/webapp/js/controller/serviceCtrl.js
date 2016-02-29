function ServiceCtrl($scope, Service) {

    $scope.setActive('services');
    $scope.loaded = false;


    Service.get({}, function(data) {
        $scope.properties = new jYP.content.Service(data.properties);
    });
    $scope.changeEventState = function() {
        $scope.properties.eventNotification = !$scope.properties.eventNotification;
        console.log($scope.properties.eventNotification);
    };

    $scope.enable = function(property) {
        if (property === 'trackingFilter') {
            $('#tracking').slideDown(500, function() {
                Service.save({
                    service: property
                }, "", function() {
                    Service.get({
                        service: $scope.merchantIdSearch
                    }, function(data) {
                        $scope.properties = new jYP.content.Service(data.properties);
                    }
                    );
                });
            });
        } else {
            Service.save({
                service: property
            }, "", function() {
                Service.get({
                    service: $scope.merchantIdSearch
                }, function(data) {
                    $scope.properties = new jYP.content.Service(data.properties);
                }
                );
            });
        }

    };

    $scope.disable = function(property) {
        if (property === 'trackingFilter') {
            $('#tracking').slideUp(500, function() {
                Service.remove({service: property}, function(data) {
                    Service.get({}, function(data) {
                        $scope.properties = new jYP.content.Service(data.properties);
                    }
                    )
                });
            });
        }

    };
}