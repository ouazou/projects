function DirectoriesCtrl($location, $scope, $routeParams, Directory) {
    $scope.setActive('directories');
    $scope.mapOptions = {
        center: new google.maps.LatLng(45.5086699, -73.55399249999999),
        zoom: 9,
        mapTypeControl: true
    };
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'),
            $scope.mapOptions);
    $scope.areas = [];
    $scope.biggestCircle = undefined;
    if ($routeParams.directoryId !== "") {
        $scope.directoryIdSearch = $routeParams.directoryId;
        if (jQuery.isNumeric($routeParams.directoryId)) {
            $scope.message = undefined;
            $scope.currentDirectory = new Object();
            $scope.currentDirectory.Directory = Directory.get({
                directoryId: $routeParams.directoryId
            }, function() {
                if (!$scope.currentDirectory.Directory.DirectoryName) {
                    $scope.message = 'No directory is find for directory id : ' + $routeParams.directoryId;
                } else {
                    var center = new google.maps.LatLng($scope.currentDirectory.Directory.MapCenter.lat, $scope.currentDirectory.Directory.MapCenter.lng);
                    $scope.map.setCenter(center);
                    $scope.currentDirectory.Directory.Areas.forEach(function(area) {
                        if (area.type === 1) {
                            // Add the circle for this city to the map.
                            cityCircle = new google.maps.Circle({
                                strokeColor: '#BD362F',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#BD362F',
                                fillOpacity: 0.45,
                                center: $scope.map.center,
                                radius: area.radius * 600
                            });
                            if ($scope.biggestCircle === undefined) {
                                $scope.biggestCircle = cityCircle;
                            } else if ($scope.biggestCircle.radius < cityCircle.radius) {
                                $scope.biggestCircle = cityCircle;
                            }
                            cityCircle.setMap($scope.map);
                            google.maps.event.addListener(cityCircle, 'bounds_changed', function() {
                                $scope.currentDirectory.Directory.Areas.forEach(function(area) {
                                    if (area.type === 1) {
                                        if (cityCircle.center.lat() !== area.polygon.center.lat()) {
                                            area.polygon.setCenter(cityCircle.center);
                                        }
                                    }
                                });
                            });
                            area.polygon = cityCircle;
                        } else if (area.type === 2) {
                            var polygon;

                            var polygonCoords = [];
                            area.points.forEach(function(point) {
                                polygonCoords.push(new google.maps.LatLng(point.lat, point.lng));
                            });

                            polygon = new google.maps.Polygon({
                                paths: polygonCoords,
                                strokeColor: '#04C',
                                strokeOpacity: 0.8,
                                strokeWeight: 3,
                                fillColor: '#04C',
                                fillOpacity: 0.45
                            });

                            polygon.setMap($scope.map);
                            area.polygon = polygon;
                        }
                    });
                }
            });
        } else {
            $scope.message = "Please enter a number as Directory Id";
        }
    }
    ;


    $scope.edit = function(obj) {
        $scope.currentDirectory.Directory.Areas.forEach(function(area) {
            area.polygon.setEditable(false);
        });
        obj.area.polygon.setEditable(true);
    };

    $scope.remove = function(obj) {
        for (var areaId in $scope.currentDirectory.Directory.Areas) {
            var area = $scope.currentDirectory.Directory.Areas[areaId];
            if (area === obj.area) {
                $scope.currentDirectory.Directory.Areas.splice(areaId, 1);
            }
        }
        obj.area.polygon.setMap(null);
        if (obj.area.polygon === $scope.biggestCircle) {
            $scope.biggestCircle = undefined;
            $scope.currentDirectory.Directory.Areas.forEach(function(area) {
                if (area.type === 1) {
                    if ($scope.biggestCircle == 'undefined') {
                        $scope.biggestCircle = area.polygon;
                    }
                }
            });
        }
    };

    $scope.addCircle = function() {
        $scope.currentDirectory.Directory.Areas.forEach(function(area) {
            area.polygon.setEditable(false);
        });
        var area = new Object();
        area.type = 1;
        area.lat = $scope.biggestCircle.center.nb;
        area.lng = $scope.biggestCircle.center.ob;
        area.radius = $scope.biggestCircle.radius + 20000;
        cityCircle = new google.maps.Circle({
            strokeColor: '#BD362F',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#BD362F',
            fillOpacity: 0.45,
            editable: true,
            center: new google.maps.LatLng(area.lat, area.lng),
            radius: area.radius
        });
        cityCircle.setMap($scope.map);
        $scope.biggestCircle = cityCircle;
        area.polygon = cityCircle;
        $scope.currentDirectory.Directory.Areas.push(area);
    };

    $scope.submitSearch = function() {
        $location.path('directories/' + $scope.directoryIdSearch);
    };
}