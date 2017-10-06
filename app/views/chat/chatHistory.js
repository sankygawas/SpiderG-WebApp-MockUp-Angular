'use strict';

angular.module('spiderG.chatHistory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chatHistory', {
    templateUrl: 'views/chat/chatHistory.html',
    controller: 'chatHistoryCtrl'
  })
 .when('/chatHistory/:userId',{
      templateUrl: 'views/chat/chatHistory.html',
      controller: 'chatHistoryCtrl',
      controllerAs:'ctrl'
  });
}])

.controller('chatHistoryCtrl', ['$scope','$window','$location','$routeParams','$http',function($scope,$window,$location,$routeParams,$http) {

    //get all users from json
    $http.get("data/users.json").then(function(response){
       $scope.users = response.data;
        $scope.user = $scope.getUser($routeParams.userId);
        //$scope.userName = user.userName;
        console.log($scope.user);
    });
    
     //get user by UserId
     $scope.getUser=function(id){
        var user = $scope.users.filter(function(item) {
          return item.id == id;
        })[0];
         return user;
     }  
}])


.controller('chatSideBarCtrl', ['$scope','$window','$location','$routeParams','$http',function($scope,$window,$location,$routeParams,$http) {
    
    var self = this; // self needed because toggle is not bound to this ctrl.
    var screenWidth;
   
    self.visible= true;
    self.toggle= function () {
                screenWidth = $window.innerWidth; //$(window).width();
                self.visible = !self.visible; // toggle visibility
                self.largeScreen = ( screenWidth >= 768 );
    }

    $http.get("data/users.json").then(function(response){
         self.users = response.data;
       
    });
    
    $scope.getClass = function (path) {
        console.log($location.path().substr(0, path.length) === path)
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }  
    
}])

.controller('NotificationSideBarController', ['$scope','$window','$location','$routeParams','$http',function($scope,$window,$location,$routeParams,$http) {
    
    var self = this; // self needed because toggle is not bound to this ctrl.
    var screenWidth;
   
    self.visible= true;
    self.toggle= function () {
                screenWidth = $window.innerWidth; //$(window).width();
                self.visible = !self.visible; // toggle visibility
                self.largeScreen = ( screenWidth >= 768 );
    }

    /*$http.get("data/users.json").then(function(response){
         self.users = response.data;
       
    });
    
    $scope.getClass = function (path) {
        console.log($location.path().substr(0, path.length) === path)
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    }  
    */
}]);