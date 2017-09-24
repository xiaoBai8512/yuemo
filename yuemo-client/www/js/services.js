angular.module('starter.services', [])
  .service("Show",function ($ionicLoading,$timeout) {
    this.showAlertDelay = function (message,delay) {
      $ionicLoading.show({
        template: message
      });
      $timeout(function () {
        $ionicLoading.hide();
      },delay*1000);
    };
  });
