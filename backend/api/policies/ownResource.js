module.exports = function(req, res, next){
  var model = req.options.model;

  if(!model) throw 'Model is required for ownResource policy';

  var Model = req._sails.models[model];

  Model.findOne(req.params.id).exec(function(err, record){
    if(!record.owner) throw 'Model requires owner property for ownResource policy';
    if(record.owner !== req.userId){
      return res.status(401).send({error: 'Not authorized'});
    }
      req.record = record;
      next()
  })
};
