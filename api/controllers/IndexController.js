module.exports = {
  partials: function(req, res){
    console.log(req.session.user);
    var category = req.params['category'],
      file = req.params['file'];
    if(category){
      res.render(category + '/' + file)
    }else{
      res.render(file);
    }
  }
};
