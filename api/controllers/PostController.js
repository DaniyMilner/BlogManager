module.exports = {
  getAll: function(req, res){
    var current = req.body.current,
      limit = req.body.limit,
      query = current && req.session.user ? {owner: req.session.user.id} : {},
      queryLimit = limit ? limit : 0;

    Post.find(query, {sort:{createdAt: -1}, limit: queryLimit}, function(err, data){
      if(!err){
        res.ok(data);
      }else{
        res.badRequest();
      }
    })

  },
  create: function(req, res){
    var text = req.body.text;
    if(text && req.session.user){
      Post.create({text: req.body.text, owner: req.session.user.id}).exec(function(err, post){
        if(!err){
          res.ok(post);
        }else{
          res.serverError();
        }
      })
    }else{
      res.badRequest();
    }
  }
};

