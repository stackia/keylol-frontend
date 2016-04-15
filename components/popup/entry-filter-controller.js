﻿(function () {
    keylolApp.controller("EntryFilterController", [
        "$scope", "selectedIndexes", "close", "types", "currPage", "shortReviewFilter", "sourceFilter",
        ($scope, selectedIndexes, close, types, currPage, shortReviewFilter, sourceFilter) => {
            const vm = this;
            $scope.currPage = currPage;
            vm.subscribeUser = shortReviewFilter & 1;
            vm.subscribePoint = shortReviewFilter & 2;
            vm.synchronization = shortReviewFilter & 4;
            vm.sourcePublication = sourceFilter & 1;
            vm.sourceLike = sourceFilter & 2;
            if (selectedIndexes)
                $scope.selectedIndexes = selectedIndexes.slice();
            $scope.entryTypes = types;
            $scope.confirm = function () {
                close({
                    shortReviewFilter: vm.subscribeUser + vm.subscribePoint + vm.synchronization,
                    filterOptions: $scope.selectedIndexes,
                    sourceFilter: vm.sourcePublication + vm.sourceLike,
                });
            };
        },
    ]);
}());