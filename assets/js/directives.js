angular.module('blogApp.directives', [])
  .directive('enterSubmit', function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        elem.bind('keydown', function(event) {
          var code = event.keyCode || event.which;
          if (code === 13) {
            if (!event.shiftKey) {
              event.preventDefault();
              if (attrs.enterElement){
                var btn = document.getElementById(attrs.enterElement);
                if (btn && !btn.hasAttribute('disabled')){
                  scope.$apply(attrs.enterSubmit);
                }
              }
            }
          }
        });
      }
    }
  });
