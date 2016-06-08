angular.module('app').controller('MyPosts', function($scope, $http){
  $http({
    method: 'GET',
    url: '/api/post/myPosts'
  }).then(function(posts){
    $scope.posts = posts.data;
  });
})
