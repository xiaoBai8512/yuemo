
angular.module("starter",["ionic","starter.controllers","ngCordova","starter.services"]).run(function ($ionicPlatform,$rootScope) {

 //所有控制器都可以访问$rootscope的内容
 $rootScope.list=[{id:0,title:"qqqq0"},{id:1,title:"qqqq1"},{id:2,title:"qqqq2"}];
 $rootScope.size = {};
 $rootScope.size.height = "100px";
  $rootScope.tabShow=false;
  $rootScope.date="";
  $rootScope.user=localStorage.getItem("user");
  $rootScope.goback=function () {
    window.history.go(-1);
  }
})
.config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
  /**
   * 路由状态的名字
   * 路由的详细配置
   * ui-sref="l路由状态名字 state 的字符串"
   */
  $ionicConfigProvider.platform.android.tabs.position("bottom");
  $ionicConfigProvider.platform.android.navBar.alignTitle("center");

  $stateProvider.state("tab",{
    url:"/tab",
    templateUrl:"templates/mytable.html",
    controller:"",
    abstract:true,

  }).state("login",{
    url:"/login",
    templateUrl:"templates/login.html",
    controller:"logincontroller"


  })
    .state("register",{
      url:"/register",
      templateUrl:"templates/register.html",
      controller:"regController"


    })
    .state("findpassword",{
      url:"/findpassword",
      templateUrl:"templates/findpassword.html",
      controller:"findcontroller"


    })
    .state("charts",{
      url:"/charts",
      templateUrl:"templates/chart.html",
      controller:"chartscontroller"
    })
    .state("tab.home",{
      url:"/home",

      views: {
        'tab-home': {
          templateUrl: 'templates/home.html',
          controller: 'homecontroller'
        }
      }
    })
    .state("tab.message",{
      url:"/space/message",

      views: {
        'tab-space': {
          templateUrl: 'templates/STspace/message.html',
          controller: 'messagecontroller'
        }
      }
    })
    .state("tab.space",{
      url:"/space",

      views: {
        'tab-space': {
          templateUrl: 'templates/space.html',
          controller: 'spacecontroller'
        }
      }
    })
      .state("tab.friend",{
        url:"/friend",

        views: {
          'tab-friend': {
            templateUrl: 'templates/friend.html',
            controller: 'friendController'
          }
        }
      })
    .state("tab.personal",{
      url:"/personal",
      views: {
        'tab-personal': {
          templateUrl: 'templates/personal.html',
          controller: 'personalController'
        }
      }
    })

  .state("tab.pay",{
    url:"/personal/pay",
    views: {
      'tab-personal': {
        templateUrl: 'templates/personal/pay.html',
        controller: ''
      }
    }
  })
    .state("tab.youhui",{
      url:"/personal/pay/youhui",
      views: {
        'tab-personal': {
          templateUrl: 'templates/personal/youhui.html',
          controller: ''
        }
      }
    })
    .state("tab.setting",{
      url:"/personal/setting",
      views: {
        'tab-personal': {
          templateUrl: 'templates/personal/setting.html',
          controller: 'setController'
        }
      }
    })

    .state("tab.about",{
      url:"/personal/about",
      views: {
        'tab-personal': {
          templateUrl: 'templates/personal/about.html',
          controller: ''
        }
      }
    })

    .state("tab.personalinfo",{
    url:"/personal/personalinfo",
    views: {
      'tab-personal': {
        templateUrl: 'templates/personal/personalinfo.html',
        controller: 'personalinfoController'
      }
    }
  })
  // if(localStorage.getItem("user"))
  // {
    $urlRouterProvider.otherwise("/tab/space")
  // }
  // else {
  //   $urlRouterProvider.otherwise("/login")
  //
  // }
  //
})

