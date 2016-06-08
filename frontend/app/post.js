angular.module('app').controller('Post', function($scope, $http, $location, toastr){

  var id = $location.search().id;

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

  function getPost() {
    $http.get('/api/post/'+ id).then(function(post){
      console.log(post.data);
      $scope.message = post.data.message;
      var datetime = new Date(post.data.scheduledfor);
      $scope.date = datetime;
      $scope.time = datetime;
    })
  }

  if(id) {
    $scope.isEditing = true;
    getPost();
    $scope.save = editPost;
  }else{
    $scope.save = newPost;
  }

  function newPost(){

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
        scheduledfor : datetime
      }
    }).then(function(){
      toastr.success('New post created');
    });
  }

  function editPost(){
    var datetime = new Date(
      $scope.date.getFullYear(),
      $scope.date.getMonth(),
      $scope.date.getDate(),
      $scope.time.getHours(),
      $scope.time.getMinutes()
    )

    $http({
      method: 'POST',
      url: '/api/post/update/' + id,
      data: {
        message : $scope.message,
        scheduledfor : datetime
      }
    }).then(function(){
      toastr.success('Post Edited');
    });

  }

  function deletePost(){
    $http({
      method: 'POST',
      url: '/api/post/destroy/' + id
    }).then(function(){
      toastr.info('Post deleted');
    });
  }

  function editingPost(){
    return id;
  }

  $scope.delete = function(){
    deletePost();
  }

});
