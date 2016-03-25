﻿(function () {
    "use strict";

    keylolApp.controller("ModerationController", [
        "$scope", "close", "$http", "notification", "$filter", "utils", "type", "targetId", "moderationText", "union",
        function ($scope, close, $http, notification, $filter, utils, type, targetId, moderationText, union) {
            var vm = this;
            $scope.utils = utils;
            $scope.union = union;
            $scope.text = moderationText[type.action];
            $scope.type = type;
            vm.reasons = [];
            vm.notifyAuthor = true;

            $scope.submit = function () {
                var dto = {
                    Value: !type.isCancel,
                    NotifyAuthor: vm.notifyAuthor,
                    Property: type.action,
                    Reasons: []
                };
                for(var i = 0;i < vm.reasons.length;i++){
                    if(vm.reasons[i]){
                        dto.Reasons.push(i);
                    }
                }
                if(union.$localStorage.user.StaffClaim && dto.Reasons.length === 0){
                    $scope.reasonEmpty = true;
                    return;
                }
                
                if(type.target === "Article"){
                    console.log(dto);
                    // $http.put(apiEndpoint + "article/" + targetId + "/moderation", dto).then(function () {
                    //     notification.success("操作成功");
                    // }, function (response) {
                    //     notification.error("发生未知错误，请重试或与站务职员联系", response);
                    // });
                }
            }
        }
    ]);
})();