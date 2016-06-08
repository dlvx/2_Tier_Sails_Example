/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

		tweet: function(req, res){

      var message =  req.body.message;
      var datetime = req.body.scheduledfor;

      Post.create({
        message: message,
        scheduledfor: datetime,
        owner: req.userId,
        isPosted: false
      }).exec(function(err, post){
        console.log('working', post, err);
        res.status(200).end();
      })



		},
    myPosts: function(req,res){
      Post.find({owner: req.userId}, function(err, posts){
        res.json(posts);
      })
    }

};
