appModule.directive("accordion", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: {},
        template: '<li class="side-menu__item" ng-transclude></li>',
        link: function(scope, element) {
            var isOpened = false;
            element.children().find("ul").css('height', '0px');
            element.find('a').on('click', function(event) {
                if(!isOpened){
                    var panel = angular.element(event.target).next();
                    panel.css('height', '100px');
                    isOpened = true;
                }else{
                    var panel = angular.element(event.target).next();
                    panel.css('height', '0px');
                    isOpened = false;
                }
            });
        }
    };
});