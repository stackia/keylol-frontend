﻿(function () {
    "use strict";

    keylolApp.controller("ArticleHeaderController", [
        "$scope", "union", "window", "utils",
        function ($scope, union, window, utils) {
            $scope.utils = utils;
            $scope.article = union.article;
            $scope.point = union.point;
            $scope.summary = union.summary;
            $scope.editArticle = function () {
                if($scope.article.TypeName === "简评"){
                    window.show({
                        templateUrl: "components/windows/short-review.html",
                        controller: "ShortReviewController",
                        inputs: {
                            options: {
                                point: {
                                    Id: $scope.point.Id,
                                    IdCode:  $scope.point.IdCode,
                                    CoverImage: $scope.point.CoverImage,
                                    Name: utils.getPointFirstName($scope.point)
                                },
                                vm: {
                                    Id: $scope.article.Id,
                                    Content: $scope.article.Content,
                                    Vote: $scope.article.Vote
                                },
                                gameHours: 790.5
                            }
                        }
                    });
                }else {
                    window.show({
                        templateUrl: "components/windows/editor.html",
                        controller: "EditorController",
                        inputs: {
                            options: {
                                vm: {
                                    Id: $scope.article.Id,
                                    Title: $scope.article.Title,
                                    Content: $scope.article.Content,
                                    Summary: $scope.article.Summary,
                                    Pros: $scope.article.Pros,
                                    Cons: $scope.article.Cons,
                                    Vote: $scope.article.Vote,
                                    TypeName: $scope.article.TypeName
                                },
                                attachedPoints: $scope.article.AttachedPoints,
                                voteForPoint: $scope.article.VoteForPoint,
                                needConfirmLoadingDraft: true
                            }
                        }
                    });
                }
            };
        }
    ]);
})();