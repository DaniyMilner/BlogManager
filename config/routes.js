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
  },
  'post /user/login': 'UserController.login',
  'post /user/logout': 'UserController.logout',
  'post /user/is-auth': 'UserController.isAuth',
  'post /user/get': 'UserController.get',

  'post /post/getall': 'PostController.getAll',
  'post /post/create': 'PostController.create'
};
