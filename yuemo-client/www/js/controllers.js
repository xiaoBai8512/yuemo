angular.module('starter.controllers', [])
  .controller("logincontroller",function ($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicActionSheet,$httpParamSerializerJQLike,Show) {
    $scope.info={};
    $scope.login=function () {
      $http({
        method:"POST",
        url:"http://47.94.6.17:3000/users/login/",
        data:$httpParamSerializerJQLike({
          username:$scope.info.username,
          password:$scope.info.password,
        }),
        headers:{
          "content-type":"application/x-www-form-urlencoded"
        }

      }).then(function (succ) {
        console.log(succ);
        if(succ.data.code==200){
          Show.showAlertDelay(succ.data.message,1);
          console.log($rootScope.user);
          $rootScope.user=succ.data.data.userName;
          localStorage.setItem("user",succ.data.data.userName);
          localStorage.setItem("userid",succ.data.data._id);
          $state.go("tab.space");
        }
       else {
          Show.showAlertDelay("用户名或密码错误",1);
        }


      })
    }

  })

  .controller("regController",function ($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicActionSheet,$httpParamSerializerJQLike,Show) {

    $scope.info = {};

    $scope.gologin=function () {
      $state.go("login")
    }
    $scope.toRegister = function () {

      console.log($scope.info.username);
      $http({
        method:"POST",
        url:"http://47.94.6.17:3000/users/register/",
        data:$httpParamSerializerJQLike({
          username:$scope.info.username,
          password:$scope.info.password,
          phone:$scope.info.phone
        }),
        headers:{
          "content-type":"application/x-www-form-urlencoded"
        }

      }).then(function (succ) {
        if(succ.data.code==200){
          Show.showAlertDelay(succ.data.message,1);

          location.reload();
        }
        else {
          Show.showAlertDelay(succ.data.message,1);
        }


      })
    }
    $scope.register=function () {

    }

  })

  .controller("findcontroller",function ($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicActionSheet,$httpParamSerializerJQLike) {
    $scope.info={};
    $scope.gologin=function () {
      $state.go("login")
    }
    $scope.findpassword=function () {
      console.log($scope.info.username);
      $http({
        method:"POST",
        url:"http://47.93.13.73:3000/users/findpassword",
        data:$httpParamSerializerJQLike({
          username:$scope.info.username,
          phone:$scope.info.phone,
        }),
        headers:{
          "content-type":"application/x-www-form-urlencoded"
        }

      }).then(function (succ) {
        console.log(succ);
      })
    }

  })

  .controller("messagecontroller",function ($scope,$state,$ionicModal,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicActionSheet,$httpParamSerializerJQLike,Show) {

    $ionicModal.fromTemplateUrl('templates/STspace/message.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      console.log(modal)
    });
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    Show.showAlertDelay("")
  })

  .controller("spacecontroller",function ($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicActionSheet,$httpParamSerializerJQLike,$ionicModal) {
     $scope.height=innerHeight-44+"px";

    var mySwiper = new Swiper ('.swiper-container', {

      onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
      },
      onSlideChangeEnd: function(swiper){
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
      },

      direction: 'horizontal',
      loop: true,
      autoplay : 3000,
      autoHeight: true,
      effect : 'cube',
      // 如果需要分页器
      pagination: '.swiper-pagination',
      // 如果需要前进后退按钮
      // nextButton: '.swiper-button-next',
      // prevButton: '.swiper-button-prev',
      // // 如果需要滚动条
      // scrollbar: '.swiper-scrollbar',
    });

  })

  .controller("homecontroller",function ($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicActionSheet,$httpParamSerializerJQLike,$ionicModal,$timeout){
    $scope.infoModal={};
    $ionicModal.fromTemplateUrl('templates/STspace/message.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      console.log(modal)
    });
    // $scope.openModal = function() {
    //   if(localStorage.getItem("user")){
    //     $scope.modal.show();
    //     return;
    //   }
    //   $state.go("login");
    // };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //当我们用到模型时，清除它！
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // 当隐藏的模型时执行动作
    $scope.$on('modal.hide', function() {
      // 执行动作
    });
    // 当移动模型时执行动作
    $scope.$on('modal.removed', function() {
      // 执行动作
    });
    $scope.myText = {};
    $scope.infoModal = {};
    $scope.toUserID = 0;

    $scope.openModal = function () {
      //  如果 用户登录了
      //  查询用户是不是 验证过的
      localStorage.getItem("userid")?$scope.modal.show():$state.go("login");
      // $scope.modal.show();
    };

    $scope.toUpdate = function () {
      $http.get("http://47.94.6.17:3000/news/publish/?id="+localStorage.getItem('userid')+"&username="+localStorage.getItem('user')+"&artical="+$scope.infoModal.text).then(function (result) {
        console.log(result);
      }).catch(function (error) {
        console.log(error);
      });
    };
    $scope.show = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
    };
    $scope.hide = function(){
      $ionicLoading.hide();
    };
    $scope.getInformation=function () {
      $scope.show();

      $http.get("http://47.94.6.17:3000/news/getInformation/").then(function (result) {
        console.log(result);
        $scope.xiaobai=result.data.data;
        if(result.data.data){
          $scope.$broadcast('scroll.refreshComplete');
          $scope.hide();
        }
      }).catch(function (error) {
        console.log(error);
        $timeout(function () {
          $ionicLoading.show({
            template: '加载失败'
          });
          $timeout(function () {
            $scope.hide();
            $scope.$broadcast('scroll.refreshComplete');
          },1000)

        },3000)
      });
    }
    $scope.getInformation();
    $scope.toTime=function (obj) {
      return new Date(obj).toLocaleString()
    }
    $scope.doRefresh = function(){
      $scope.getInformation();
    }

  })

  .controller("friendController",function ($scope,$http,$rootScope,$ionicModal) {
    $rootScope.goodList=[];
    $http.get("http://47.94.6.17:3000/goodlist/goodlist/").then(function (res) {
     console.log(res);
      $rootScope.goodList=res.data.data;
    });
    $ionicModal.fromTemplateUrl('templates/friends/goodDetail.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $rootScope.goodDetail={};
    $scope.goodsDetail=function (info) {
      $rootScope.goodDetail=info;
      console.log(info);
      $scope.openModal();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

  })
  .controller("personalController",function ($scope,$rootScope,$ionicLoading,$ionicPopup,$ionicActionSheet,$state,$interval){
    $scope.run=function() {
      $rootScope.tabShow=true;
      setTimeout(function () {

      },100);
      $rootScope.tabShow=true;
    }
    $scope.date= location.href;
    $interval(function(){

      if( $scope.date===location.href){
        $rootScope.tabShow=false;

      }
    },100)

  })

  .controller("personalinfoController",function ($scope,$rootScope,$ionicLoading,$ionicPopup,$ionicActionSheet,$state, $stateParams,$cordovaImagePicker) {


  $scope.show = function() {

    // 显示操作表
    $ionicActionSheet.show({
      buttons: [
        { text: '打开本地相册' },
        { text: '拍照' },
      ],
      destructiveText: '',
      titleText: '上传头像',
      cancelText: '取消',
      buttonClicked: function(index) {
        switch (index){
          case 0 :
                   alert("执行打开本地相册的功能");

                    break;
          case 1 :  alert("执行拍照功能");
          function setOptions(srcType) {
            var options = {
              // Some common settings are 20, 50, and 100
              quality: 50,
              destinationType: Camera.DestinationType.FILE_URI,
              // In this app, dynamically set the picture source, Camera or photo gallery
              sourceType: srcType,
              encodingType: Camera.EncodingType.JPEG,
              mediaType: Camera.MediaType.PICTURE,
              allowEdit: true,
              correctOrientation: true  //Corrects Android orientation quirks
            }
            return options;
          }


            var srcType = Camera.PictureSourceType.CAMERA;
            var options = setOptions(srcType);
            var func = createNewFileEntry;

            navigator.camera.getPicture(function cameraSuccess(imageUri) {

              displayImage(imageUri);
              // You may choose to copy the picture, save it somewhere, or upload.
              func(imageUri);

            }, function cameraError(error) {
              console.debug("Unable to obtain picture: " + error, "app");

            }, options);

            break;
        }
        return true;
      }
    });

  };

  })

  .controller("chartscontroller",function ($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicActionSheet,$state, $stateParams,$httpParamSerializerJQLike,$interval) {
   $scope.info={};
    $scope.data=[];
    $http({
      method:"POST",
      url:"http://47.93.13.73:3000/users/lookinfo",
      data:$httpParamSerializerJQLike({
        userid:$rootScope.chartToID,

      }),
      headers:{
        "content-type":"application/x-www-form-urlencoded"
      }

    }).then(function (res) {
        console.log(res);
        $scope.username=res.data.data[0].username;
    })

    $scope.send=function () {
      console.log($scope.info);
      $http({
        method:"POST",
        url:"http://47.93.13.73:3000/charts/send",
        data:$httpParamSerializerJQLike({

          fromID:localStorage.getItem("userid"),
          toID:$rootScope.chartToID,
          message:$scope.info.message,

        }),
        headers:{
          "content-type":"application/x-www-form-urlencoded"
        }

      }).then(function (res) {
        console.log(res);
        $scope.data.push(res.data.data)
      })
    }
    $scope.receive=function () {
      console.log($scope.info);
      $http({
        method:"POST",
        url:"http://47.93.13.73:3000/charts/receive",
        data:$httpParamSerializerJQLike({

          fromID:$rootScope.chartToID,
          toID:localStorage.getItem("userid"),

        }),
        headers:{
          "content-type":"application/x-www-form-urlencoded"
        }

      }).then(function (res) {
        console.log(res);

        var info=res.data.data[res.data.data.length -1];
         if($scope.data.length!=0){

           if($scope.data[$scope.data.length -1].currentTime!==info.currentTime&&$scope.data[$scope.data.length -1].isReceive==false){
             info.isReceive=true;
             $scope.data.push(info);
           }
         }
         else {
           info.isReceive=true;
           $scope.data.push(info);
         }
     console.log($scope.data);
      })
    }
    $interval(function () {
      $scope.receive();
    },1000)
  })

  .controller("setController",function ($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicActionSheet,$state, $stateParams,$httpParamSerializerJQLike,$interval) {


  $scope.run=function() {
    $rootScope.tabShow=true;
   if($rootScope.tabShow==false){
     $rootScope.tabShow=true;
   }

  }
  $scope.zhuxiao=function () {
    localStorage.setItem("user","");
    localStorage.setItem("userid","");
    $rootScope.tabShow=false;
    $state.go("login");
    location.reload();

  }
});
