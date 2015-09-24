﻿(function () {
    "use strict";

    keylolApp.controller("SteamConnectController", [
        "$scope", "close", "$timeout", "$q",
        function ($scope, close, $timeout, $q) {
            var tokenId;
            var result;
            var closed = false;
            var connection = $.connection.new();
            var steamBindingHubProxy = connection.steamBindingHub;

            $scope.currentStation = 0;
            $scope.code = "　　　　";

            $scope.cancel = function () {
                close(result);
                closed = true;
                if (!result)
                    connection.stop();
            };

            steamBindingHubProxy.client.NotifySteamFriendAdded = function () {
                $scope.$apply(function () {
                    if ($scope.currentStation === 0)
                        $scope.currentStation = 1;
                });
            };

            steamBindingHubProxy.client.NotifyCodeReceived = function (steamProfileName, steamAvatarHash) {
                $scope.$apply(function () {
                    $scope.currentStation = 2;
                    var consume = $q.defer();
                    consume.promise.finally(function () {
                        connection.stop();
                    });
                    result = {
                        tokenId: tokenId,
                        steamProfileName: steamProfileName,
                        steamAvatarHash: steamAvatarHash,
                        consume: consume
                    };
                    $timeout(function () {
                        $scope.currentStation = 3;
                        $timeout(function () {
                            if (!closed) {
                                close(result);
                                closed = true;
                            }
                        }, 2000);
                    }, 200);
                });
            };

            connection.start().then(function () {
                steamBindingHubProxy.server.createToken().then(function (token) {
                    $scope.$apply(function () {
                        if (token) {
                            tokenId = token.Id;
                            $scope.botSteamId64 = token.BotSteamId64;
                            $scope.code = token.Code;
                        } else {
                            alert("暂无可用机器人。");
                            $scope.cancel();
                        }
                    });
                });
            }, function () {
                alert("连接失败。");
                $scope.cancel();
            });
        }
    ]);
})();