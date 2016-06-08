angular.module('app').controller('Scheduler', function($scope, $http){



//entradas
  $scope.tweet = function(){

    var datetime = new Date(
      $scope.date.getFullYear(),
      $scope.date.getMonth(),
      $scope.date.getDate(),
      $scope.time.getHours(),
      $scope.time.getMinutes()
    )

    $http({
      method: 'POST',
      url: '/api/post/tweet',
      data: {
        message : $scope.message,
        datetime : datetime
      }
    }).then(function(){

    });
  }


  $scope.time = new Date();

  $scope.dateOptions = {
    minDate : new Date()
  };

  $scope.opened = false;

  $scope.open = function($event){
    // $event.preventDefault();
    // $event.stopPropagation();
    $scope.opened = !$scope.opened;
  }

});
