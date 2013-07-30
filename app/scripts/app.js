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
    }).directive('whenScrolled', function($window) {
        return function(scope, elm, attr) {
            var raw = elm[0];
            var body = angular.element($window);
            body.bind('scroll', function() {
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

    }).directive("menu", function ($window) {
        return function (scope, element, attrs) {

            function getScrollOffsets(w) {

                // Use the specified window or the current window if no argument
                w = w || window;

                // This works for all browsers except IE versions 8 and before
                if (w.pageXOffset != null) return {
                    x: w.pageXOffset,
                    y: w.pageYOffset
                };

                // For IE (or any browser) in Standards mode
                var d = w.document;
                if (document.compatMode == "CSS1Compat") {
                    return {
                        x: d.documentElement.scrollLeft,
                        y: d.documentElement.scrollTop
                    };
                }

                // For browsers in Quirks mode
                return {
                    x: d.body.scrollLeft,
                    y: d.body.scrollTop
                };
            }

            angular.element($window).bind("scroll", function () {
                var offset = getScrollOffsets($window);
                var onPage = parseInt(offset.y/1100);
                if(onPage != scope.activePage){
                    scope.sections[onPage].active = 'active';
                    scope.sections[scope.activePage].active = '';
                    scope.activePage = onPage;
                }
                scope.$apply();
            });
        };
    })
    .controller('MainCtrl',function($scope, pageModel){

        $scope.items = [];
        $scope.tech = 'html';
        $scope.administrator = true;
        $scope.currentPage = 1;
        $scope.totalPages = 6;
        $scope.activePage = 0;
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
            }
        };

        $scope.sections = [{"name":"pierwsza", "active":"active"},{"name":"druga","active":""},{"name":"trzecia","active":""},{"name":"czwarta","active":""},{"name":"piata","active":""},{"name":"druga","active":""}]
        $scope.loadMore();



    });