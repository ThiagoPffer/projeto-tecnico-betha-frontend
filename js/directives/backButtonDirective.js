appModule.directive('backButton', function ($window) {
    return {
        restrict: 'E',
        template: '<button class="default-back-button"><span class="mdi mdi-chevron-left"></span></button>',
        scope: {},
        link: function(scope, element) {
            element.on('click', function() {
                $window.history.back();
            });
        }
    };
});