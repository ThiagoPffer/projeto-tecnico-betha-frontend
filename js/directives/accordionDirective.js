appModule.directive("accordion", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: {},
        template: '<li class="side-menu__item" ng-transclude></li>',
        link: function(scope, element) {
            var isOpened = false;
            var height = 0;
            element.children().find("ul").css('height', '0px');
            element.find('a').on('click', function(event) {
                if(!isOpened){
                    var panel = angular.element(event.target).next();
                    for(let i = 0; i < panel.children().length; i++){
                        if(!panel.children()[i].classList.contains('ng-hide')){
                            height += 50;
                        }
                    }
                    panel.css('height', height+'px');
                    isOpened = true;
                }else{
                    height = 0;
                    var panel = angular.element(event.target).next();
                    panel.css('height', height+'px');
                    isOpened = false;
                }
            });
        }
    };
});