angular.module('mazii')


.directive('ngNotify', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/notify/notify-template.html'
    }
});