angular.module('flashAPIApp', [])
    .directive('contenteditable', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(elm.html());
                });
            });
            ctrl.$render = function() {
                elm.html(ctrl.$viewValue);
            };
            ctrl.$render();
        }
    };
    })
    .factory('pageModel',function(){

        var items = [];
        items.getItems = function(){
            return [
                {
                "title" : "Flash player Api",
                "desc" : "Lorem ipsum delor itp"
                },
                {
                "title" : "Html5 player Api",
                "desc" : "ble ble ble ble"
                }
            ]
        };

        items.save = function(items){
          console.log(items);
        };

        return items;

    })
    .controller('MainCtrl',function($scope, pageModel){

        $scope.items = [];
        $scope.tech = 'html';
        $scope.administrator = true;

        $scope.setTech = function(text){
            $scope.tech = text;
        };

        $scope.save = function(items){
            pageModel.save(items);
        };

        init();
        function init(){
            $scope.items = pageModel.getItems();
        };

    });