var sails = require('sails');
var Twit = require('twit');

sails.load(function(){

  setInterval(function(){
    checkPosts();
  }, config.schedulerInterval);

})

function checkPosts(){
  Post.find().where({
    scheduledfor: {'<': new Date()},
    isPosted: false
  }).populate('owner')
  .exec(function(err, posts){
    console.log(posts);
    posts.forEach(function(post){
      sendTwit(post.owner.twitterToken, post.owner.twitterSecret, post.message, function(){
        updateSentPost(post);
      });
    })

  })
}

function sendTwit(token, secret, message, cb){
  var T = new Twit({
  	  consumer_key:         config.TWITTER_KEY,
  	  consumer_secret:      config.TWITTER_SECRET,
  	  access_token:         token,
  	  access_token_secret:  secret,
  	  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  	});

  	T.post('statuses/update', {
      status: message
    }, function(err, data, response) {
  	  console.log("Sent Succesfully", err);
      cb();
  	})
}

function updateSentPost(post){
  post.isPosted = true;
  post.save(function(){
    console.log('Post saved');
  })
}
