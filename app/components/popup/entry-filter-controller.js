﻿(function () {
    "use strict";

    keylolApp.controller("EntryFilterController", [
        "$scope", "filterOptions", "close",
        function ($scope, filterOptions, close) {
            $scope.filterOptions = filterOptions;
            $scope.onFilter = function () {
                close($scope.filterOptions);
            };

            $scope.changeFilterOption = function (index) {
                $scope.filterOptions[index] = !$scope.filterOptions[index];
            };
        }
    ]);
})();