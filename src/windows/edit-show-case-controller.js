﻿(function () {
    class EditShowCaseController {
        constructor(type, close, $element, $http, apiEndpoint, notification, window, utils, stateTree) {
            $.extend(this, {
                type,
                close,
                $element,
                $http,
                apiEndpoint,
                notification,
                window,
                utils,
                stateTree,
            });
            this.currentPage = 1;
            this.list = [];
            switch (type) {
                case 'slideShow':
                    this.subTitle = '入口 - 广场 - 四格幻灯片';
                    this.getUrl = 'entrance/discovery/slideshow-entries';
                    this.highlightCount = 4;
                    this.getContent();
                    this.showAttrs = {
                        title: '主标题',
                        minorTitle: '投稿据点',
                    };
                    break;
                case 'spotlightPoint':
                    this.subTitle = '入口 - 广场 - 热门据点';
                    this.getUrl = 'entrance/discovery/spotlight-points';
                    this.highlightCount = 6;
                    this.getContent();
                    this.canNotEdit = true;
                    this.showAttrs = {
                        preferred: '据点',
                        idCode: '识别码',
                    };
                    break;
                case 'outpostPoint':
                    this.subTitle = '入口 - 据点 - 哨所';
                    this.getUrl = 'entrance/points/outpost-points';
                    this.highlightCount = 3;
                    this.getContent();
                    this.canNotEdit = true;
                    this.showAttrs = {
                        preferred: '据点',
                        idCode: '识别码',
                    };
                    break;
            }
        }

        getContent (newPage = 1, oldPage = 0) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/${this.getUrl}/?page=${newPage}`).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.list = response.data;
                    this.changePageLock = false;
                    console.log(response);
                }, response => {
                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    this.changePageLock = false;
                });
            }
            return true;
        }

        topItem (id) {
            this.$http.put(`${this.apiEndpoint}feed/top/${id}`).then(response => {
                this.getContent(1, this.currentPage);
                this.notification.success({ message: '已置顶' });
            }, error => {
                this.notification.error({ message: '置顶失败' });
            });
        }

        deleteItem (id) {
            this.$http.delete(`${this.apiEndpoint}feed/${id}`).then(response => {
                this.getContent(this.currentPage, this.currentPage);
                this.notification.success({ message: '已删除' });
            }, error => {
                this.notification.error({ message: '删除失败' });
            });
        }

        editItem (item) {
            if (this.canNotEdit) return;
            this.window.show({
                templateUrl: 'src/windows/push-entry.html',
                controller: 'PushEntryController',
                controllerAs: 'pushEntry',
                inputs: {
                    type: this.type,
                    options: {
                        item,
                    },
                },
            }).then(window => {
                return window.close;
            }).then(result => {
                if (result) {
                    $.extend(item, result);
                }
            });
        }
    }

    keylolApp.controller('EditShowCaseController', EditShowCaseController);
}());
