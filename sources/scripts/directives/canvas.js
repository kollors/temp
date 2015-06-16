function Canvas(stage) {
    var self = this;
    self.object = {};

    self.drawRect = function (name, x, y, width, height, color, hide) {
        var rect = new createjs.Shape();
        color = color || "#eee";

        if (hide) {
            rect.graphics.drawRect(x, y, width, height);
        } else {
            rect.graphics.beginStroke("black").beginFill(color).drawRect(x, y, width, height).endFill().endStroke();
        }

        self.object[name] = rect;
        stage.addChild(rect);
        stage.update();
        return self;
    };

    self.drawCross = function (name, x, y, width, height) {
        width /= 2;
        var cross = new createjs.Shape();
        cross.graphics
            .beginStroke("black")
            .beginFill("#eee")
            .moveTo(x, y)
            .lineTo(x + width * 2, y)
            .lineTo(x + width + height / 2, y + height / 2 - width)
            .lineTo(x + height, y)
            .lineTo(x + width * 2 + height, y)
            .lineTo(x + width * 2 + height / 2, y + height / 2)
            .lineTo(x + width * 2 + height, y + height)
            .lineTo(x + height, y + height)
            .lineTo(x + width + height / 2, y + height / 2 + width)
            .lineTo(x + width * 2, y + height)
            .lineTo(x, y + height)
            .lineTo(x + height / 2, y + height / 2)
            .endFill();
        stage.addChild(cross);
        stage.update();
        self.object[name] = cross;
        return self;
    };

    self.moveShape = function (name, x, y) {
        self.object[name].x = x;
        self.object[name].y = y;
        stage.update();
        return self;
    };

    self.resizeShape = function (name, width, height) {
        self.object[name].graphics._instructions[1].w = width;
        self.object[name].graphics._instructions[1].h = height;
        stage.update();
        return self;
    };

    self.scaleShape = function (name, scaleX, scaleY) {
        self.object[name].scaleX = scaleX;
        self.object[name].scaleY = scaleY;
        stage.update();
        return self;
    }
}

function canvas() {
    return {
        restrict: "A",
        controller: controller,
        link: link
    };

    function controller($scope) {
        $scope.$watch("canvas.area.x", function () {
            $scope.updateCanvas();
        });

        $scope.$watch("canvas.area.y", function () {
            $scope.updateCanvas();
        });

        $scope.$watch("canvas.area.width", function () {
            $scope.updateCanvas();
        });

        $scope.$watch("canvas.area.height", function () {
            $scope.updateCanvas();
        });

        $scope.$watch("canvas.object.x", function () {
            $scope.updateObject();
        });

        $scope.$watch("canvas.object.y", function () {
            $scope.updateObject();
        });

        $scope.$watch("canvas.object.width", function () {
            $scope.updateObject();
        });

        $scope.$watch("canvas.object.height", function () {
            $scope.updateObject();
        });
    }

    function link($scope, $element) {
        var canvas = $element[0];
        var canvasId = canvas.getAttribute("id");
        var stage = new createjs.Stage(canvasId);
        var main = new Canvas(stage);
        var baseWidth = 50;
        var columnCount = 0;
        var movableName = null;

        stage.on("mousedown", function(event) {
            for(var key in main.object) {
                if (main.object[key].id == event.target.id) {
                    movableName = key;
                }
            }

            $scope.canvas.object.x = event.target.x;
            $scope.canvas.object.y = event.target.y;
            $scope.canvas.object.width = event.target.graphics._instructions[1].w || $scope.canvas.area.height + baseWidth;
            $scope.canvas.object.height = event.target.graphics._instructions[1].h || $scope.canvas.area.height;
            $scope.$apply();
        });

        main
            .drawRect("area", 0, 0, $scope.canvas.area.width, $scope.canvas.area.height, "", true)
            .drawRect("baseLeft", 0, 0, baseWidth, $scope.canvas.area.height, "#aaa")
            .drawRect("baseRight", 0, 0, baseWidth, $scope.canvas.area.height, "#aaa");

        $scope.updateCanvas = function () {
            main
                .moveShape("area", $scope.canvas.area.x, $scope.canvas.area.y)
                .resizeShape("area", $scope.canvas.area.width, $scope.canvas.area.height)
                .moveShape("baseLeft", $scope.canvas.area.x, $scope.canvas.area.y)
                .resizeShape("baseLeft", baseWidth, $scope.canvas.area.height)
                .moveShape("baseRight", $scope.canvas.area.x + $scope.canvas.area.width - baseWidth, $scope.canvas.area.y)
                .resizeShape("baseRight", baseWidth, $scope.canvas.area.height);
        };

        $scope.addVerticalColumn = function () {
            main
                .drawRect("column" + columnCount, $scope.canvas.area.x + baseWidth, $scope.canvas.area.y, baseWidth, $scope.canvas.area.height);
            columnCount++;
        };

        $scope.addHorizontalColumn = function () {
            main
                .drawRect("column" + columnCount, $scope.canvas.area.x + baseWidth, $scope.canvas.area.y, $scope.canvas.area.width - baseWidth * 2, baseWidth);
            columnCount++;
        };

        $scope.addCross = function () {
            main
                .drawCross("column" + columnCount, $scope.canvas.area.x + baseWidth, $scope.canvas.area.y, baseWidth, $scope.canvas.area.height);
            columnCount++;
        };

        $scope.createVerticalSection = function () {
            var totalCount = 0;
            var freeWidth = 0;

            do {
                totalCount = sectionBaseParams("Введите количество вертикальных столбов");
                freeWidth = (($scope.canvas.area.width - (baseWidth * 2)) - (baseWidth * totalCount)) / (totalCount * 2);

                if (freeWidth < 1) alert("Ошибка ввода!");

            } while(freeWidth < 1);

            for (var i = 0; i < totalCount; i++, columnCount++) {
                main
                    .drawRect("column" + columnCount, $scope.canvas.area.x + baseWidth, $scope.canvas.area.y, baseWidth, $scope.canvas.area.height)
                    .moveShape("column" + columnCount, freeWidth + i * (baseWidth + freeWidth * 2), 0);
            }
        };

        $scope.createHorizontalSection = function () {
            var totalCount = 0;
            var freeHeigth = 0;

            do {
                totalCount = sectionBaseParams("Введите количество горизонтальных столбов");

                freeHeigth = (($scope.canvas.area.height) - (baseWidth * totalCount)) / (totalCount * 2);

                if (freeHeigth < 1) alert("Ошибка ввода! у вас нет дыр между палками!");

            } while(freeHeigth < 1);

            for (var i = 0; i < totalCount; i++, columnCount++) {
                main
                    .drawRect("column" + columnCount, $scope.canvas.area.x + baseWidth, $scope.canvas.area.y, $scope.canvas.area.width - baseWidth * 2, baseWidth)
                    .moveShape("column" + columnCount, 0, freeHeigth + i * (baseWidth + freeHeigth * 2));
            }
        };

        $scope.createCrossSection = function () {
            var totalCount = 0;
            var freeWidth = 0;
            do {
                totalCount = sectionBaseParams("Введите количество вертикальных столбов");

                freeWidth = (($scope.canvas.area.width - ((baseWidth) * 2)) - (($scope.canvas.area.height + baseWidth) * totalCount)) / (totalCount * 2);

                if (freeWidth < 0) alert("Ошибка ввода!");

            } while(freeWidth < 0);

            for (var i = 0; i < totalCount; i++, columnCount++) {
                main
                    .drawCross("column" + columnCount, $scope.canvas.area.x + baseWidth, $scope.canvas.area.y, baseWidth, $scope.canvas.area.height)
                    .moveShape("column" + columnCount, freeWidth + i * (baseWidth + $scope.canvas.area.height + freeWidth * 2), 0);
            }
        };

        var sectionBaseParams = function (message) {
            $scope.canvas.area.x = parseFloat(prompt("x поля", $scope.canvas.area.x.toString()));
            $scope.canvas.area.y = parseFloat(prompt("y поля", $scope.canvas.area.y.toString()));
            $scope.canvas.area.height = parseFloat(prompt("Высота поля", $scope.canvas.area.height.toString()));
            $scope.canvas.area.width = parseFloat(prompt("Ширина поля", $scope.canvas.area.width.toString()));
            return parseInt(prompt(message, "1"));
        };

        $scope.updateObject = function () {
            if (!movableName) return;

            if ($scope.canvas.object.y + $scope.canvas.object.height > $scope.canvas.area.height) {
                $scope.canvas.object.y = $scope.canvas.area.height - $scope.canvas.object.height;
            }

            if ($scope.canvas.object.x + $scope.canvas.object.width > $scope.canvas.area.width - baseWidth * 2) {
                $scope.canvas.object.x = $scope.canvas.area.width - $scope.canvas.object.width - baseWidth * 2;
            }

            main
                .moveShape(movableName, $scope.canvas.object.x, $scope.canvas.object.y);
        };
    }
}

angular
    .module("ankular")
    .directive("canvas", canvas);