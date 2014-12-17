module.exports.routes = {
  '/': {
    view: 'index'
  },
  '/views/:file':{
    controller: 'index',
    action: 'partials'
  },
  '/views/:category/:file':{
    controller: 'index',
    action: 'partials'
  }
};
