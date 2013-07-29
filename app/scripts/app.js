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
    }).directive('whenScrolled', function() {
        return function(scope, elm, attr) {
            var raw = elm[0];

            elm.bind('scroll', function() {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.$apply(attr.whenScrolled);
                }
            });
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
        $scope.currentPage = 1;
        $scope.totalPages = 6;

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

        var counter = 0;
        $scope.loadMore = function() {
            for (var i = 0; i < 2; i++) {
                $scope.currentPage = counter;
                var value =
                {
                    "title" : "Html5 player Api",
                    "desc" : "ble ble ble ble"
                };
                if($scope.items.length < $scope.totalPages ){
                    $scope.items.push(value);
                    counter += 1;
                }
                    console.log($scope.items);

            }
        };

        $scope.loadMore();



    });