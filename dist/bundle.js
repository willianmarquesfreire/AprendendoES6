(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _app = require("./src/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./src/app.js":2}],2:[function(require,module,exports){
'use strict';

var _World = require('./world/World');

var _World2 = _interopRequireDefault(_World);

var _WImage = require('./elements/WImage');

var _WImage2 = _interopRequireDefault(_WImage);

var _WCanvas = require('./elements/WCanvas');

var _WCanvas2 = _interopRequireDefault(_WCanvas);

var _WType = require('./enums/WType');

var _WType2 = _interopRequireDefault(_WType);

var _WBallon = require('./reusable_objects/WBallon');

var _WBallon2 = _interopRequireDefault(_WBallon);

var _WHeart = require('./reusable_objects/WHeart');

var _WHeart2 = _interopRequireDefault(_WHeart);

var _WClockOne = require('./reusable_objects/WClockOne');

var _WClockOne2 = _interopRequireDefault(_WClockOne);

var _WBall = require('./reusable_objects/WBall');

var _WBall2 = _interopRequireDefault(_WBall);

var _WBallShadow = require('./reusable_objects/WBallShadow');

var _WBallShadow2 = _interopRequireDefault(_WBallShadow);

var _WMoveRandomOne = require('./events/WMoveRandomOne');

var _WMoveRandomOne2 = _interopRequireDefault(_WMoveRandomOne);

var _WFallMove = require('./events/WFallMove');

var _WFallMove2 = _interopRequireDefault(_WFallMove);

var _WMouseFollow = require('./events/WMouseFollow');

var _WMouseFollow2 = _interopRequireDefault(_WMouseFollow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Parei em => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
window.addEventListener("load", function () {
    var world = new _World2.default();
    world.addToBody().createImage('src/img/rhino.jpg', 0, 0, call);

    function call() {
        world.element.addEventListener('mousemove', function (event) {
            var x = event.layerX;
            var y = event.layerY;
            var image = world.context.getImageData(x, y, 1, 1);
            document.getElementById('color').style.backgroundColor = world.getImageDataRGBA(image);
        });
    }

    // world.element.addEventListener('mousemove', pick)

});

},{"./elements/WCanvas":3,"./elements/WImage":5,"./enums/WType":6,"./events/WFallMove":7,"./events/WMouseFollow":8,"./events/WMoveRandomOne":9,"./reusable_objects/WBall":10,"./reusable_objects/WBallShadow":11,"./reusable_objects/WBallon":12,"./reusable_objects/WClockOne":13,"./reusable_objects/WHeart":14,"./world/World":15}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WElement2 = require('./WElement');

var _WElement3 = _interopRequireDefault(_WElement2);

var _WType = require('../enums/WType');

var _WType2 = _interopRequireDefault(_WType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WCanvas = function (_WElement) {
    _inherits(WCanvas, _WElement);

    function WCanvas() {
        _classCallCheck(this, WCanvas);

        var _this = _possibleConstructorReturn(this, (WCanvas.__proto__ || Object.getPrototypeOf(WCanvas)).call(this, 'canvas'));

        _this._context = _this.context2D;
        return _this;
    }

    _createClass(WCanvas, [{
        key: 'save',
        value: function save() {
            this.context.save();
            return this;
        }
    }, {
        key: 'restore',
        value: function restore() {
            this.context.restore();
            return this;
        }
    }, {
        key: 'translate',
        value: function translate(x, y) {
            this.context.translate(x, y);
            return this;
        }
    }, {
        key: 'scale',
        value: function scale(x, y) {
            this.context.scale(x, y);
            return this;
        }
    }, {
        key: 'rotate',
        value: function rotate(angle) {
            this.context.rotate(angle);
            return this;
        }
    }, {
        key: 'transform',
        value: function transform(a, b, c, d, e, f) {
            this.context.transform(a, b, c, d, e, f);
            return this;
        }
    }, {
        key: 'setTransform',
        value: function setTransform(a, b, c, d, e, f) {
            this.context.setTransform(a, b, c, d, e, f);
            return this;
        }
    }, {
        key: 'resetTransform',
        value: function resetTransform() {
            this.context.resetTransform();
            return this;
        }
    }, {
        key: 'clip',
        value: function clip() {
            this.context.clip();
            return this;
        }
    }, {
        key: 'fillStyle',
        value: function fillStyle(color) {
            this.context.fillStyle = color;
            return this;
        }
    }, {
        key: 'drawRect',
        value: function drawRect(x, y, width, height) {
            this.context.rect(x, y, width, height);
        }
    }, {
        key: 'drawLine',
        value: function drawLine(beginX, beginY, endX, endY) {
            this.moveTo(beginX, beginY);
            this.lineTo(endX, endY);
            this.stroke();
            return this;
        }
    }, {
        key: 'drawSquare',
        value: function drawSquare(x, y, width, height, type) {
            switch (type) {
                case _WType2.default.STROKE:
                    this.strokeRect(x, y, width, height, type);
                    break;
                case _WType2.default.CLEAR:
                    this.clearRect(x, y, width, height, type);
                    break;
                default:
                    this.fillRect(x, y, width, height, type);
            }
            return this;
        }
    }, {
        key: 'drawTriangle',
        value: function drawTriangle(x, y, x1, y1, x2, y2, type) {
            this.beginPath();
            this.moveTo(x, y);
            this.lineTo(x1, y1);
            this.lineTo(x2, y2);

            switch (type) {
                case _WType2.default.STROKE:
                    this.stroke();
                    break;
                case _WType2.default.CLEAR:
                    this.clear();
                    break;
                default:
                    this.fill();
            }
            return this;
        }
    }, {
        key: 'drawTriangleByDimension',
        value: function drawTriangleByDimension(x, y, dimension, type) {
            this.beginPath();
            this.moveTo(x, y);
            this.lineTo(x - dimension, y + dimension);
            this.lineTo(x + dimension, y + dimension);

            switch (type) {
                case _WType2.default.STROKE:
                    this.stroke();
                    break;
                case _WType2.default.CLEAR:
                    this.clear();
                    break;
                default:
                    this.fill();
            }
            return this;
        }
    }, {
        key: 'drawImage',
        value: function drawImage(image, x, y) {
            this.context.drawImage(image, x, y);
            return this;
        }
    }, {
        key: 'drawImage',
        value: function drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
            this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            return this;
        }
    }, {
        key: 'createImage',
        value: function createImage(url, x, y, callback) {
            var $this = this;
            var img = new Image();
            img.src = url;
            img.onload = function () {
                $this.context.drawImage(img, x, y);
                img.style.display = 'none';
                if (callback) {
                    callback(img);
                }
                return this;
            };
        }
    }, {
        key: 'stringRGBA',
        value: function stringRGBA(r, g, b, a) {
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
    }, {
        key: 'getImageData',
        value: function getImageData(x, y, width, height) {
            return this.context.getImageData(x, y, width, height);
        }
    }, {
        key: 'getImageDataRGBA',
        value: function getImageDataRGBA(imageData) {
            return 'rgba(' + imageData.data[0] + ',' + imageData.data[1] + ',' + imageData.data[2] + ',' + imageData.data[3] / 255 + ')';
        }
    }, {
        key: 'fillRect',
        value: function fillRect(x, y, width, height, type) {
            this.context.fillRect(x, y, width, height, type);
            return this;
        }
    }, {
        key: 'clearRect',
        value: function clearRect(x, y, width, height, type) {
            this.context.clearRect(x, y, width, height, type);
            return this;
        }
    }, {
        key: 'strokeRect',
        value: function strokeRect(x, y, width, height, type) {
            this.context.strokeRect(x, y, width, height, type);
            return this;
        }
    }, {
        key: 'arc',
        value: function arc(x, y, radius, startAngle, endAngle, anticlockwise) {
            this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            return this;
        }
    }, {
        key: 'quadraticCurveTo',
        value: function quadraticCurveTo(cp1x, cp1y, x, y) {
            this.context.quadraticCurveTo(cp1x, cp1y, x, y);
            return this;
        }
    }, {
        key: 'bezierCurveTo',
        value: function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
            this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            return this;
        }
    }, {
        key: 'lineTo',
        value: function lineTo(x, y) {
            this.context.lineTo(x, y);
            return this;
        }
    }, {
        key: 'moveTo',
        value: function moveTo(x, y) {
            this.context.moveTo(x, y);
            return this;
        }
    }, {
        key: 'beginPath',
        value: function beginPath() {
            this.context.beginPath();
            return this;
        }
    }, {
        key: 'closePath',
        value: function closePath() {
            this.context.closePath();
            return this;
        }
    }, {
        key: 'stroke',
        value: function stroke() {
            this.context.stroke();
            return this;
        }
    }, {
        key: 'fill',
        value: function fill() {
            this.context.fill();
            return this;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.context.clear();
            return this;
        }
        /**
         * @TODO
         * Esta função será implementada
         * Ela está aqui somente para me lembrar de como fazer animações
         */

    }, {
        key: 'requestAnimationFrame',
        value: function requestAnimationFrame(fn) {
            return window.requestAnimationFrame(draw);
        }
    }, {
        key: 'context',
        get: function get() {
            return this._context;
        },
        set: function set(ctx) {
            return this._context = this.getContext(ctx);
        }
    }, {
        key: 'context2D',
        get: function get() {
            return this.element.getContext('2d');
        }
    }, {
        key: 'context3D',
        get: function get() {
            return this.element.getContext('3d');
        }
    }]);

    return WCanvas;
}(_WElement3.default);

exports.default = WCanvas;

},{"../enums/WType":6,"./WElement":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WElement = function () {
    function WElement(element, width, height, border) {
        _classCallCheck(this, WElement);

        this.element = element;
        this.width = width;
        this.height = height;
        this.border = border;
        console.log(this.getClassName().concat(' Created!'));
    }

    _createClass(WElement, [{
        key: 'createElement',
        value: function createElement(element) {
            return document.createElement(element);
        }
    }, {
        key: 'setAttribute',
        value: function setAttribute(attr, value) {
            this.element.setAttribute(attr, value);
            return this;
        }
    }, {
        key: 'setStyle',
        value: function setStyle(attr, value) {
            this.setAttibute('style', attr + ': ' + value);
            return this;
        }
    }, {
        key: 'setSize',
        value: function setSize(width, height) {
            this.width === width;
            this.height === height;
            return this;
        }
    }, {
        key: 'addChild',
        value: function addChild(child) {
            this.element.appendChild(child);
            return this;
        }
    }, {
        key: 'addToBody',
        value: function addToBody() {
            document.body.appendChild(this.element);
            return this;
        }
    }, {
        key: 'addToElementById',
        value: function addToElementById(id) {
            document.getElementById(id).appendChild(this.element);
            return this;
        }
    }, {
        key: 'addToElementByClassName',
        value: function addToElementByClassName(className) {
            document.getElementsByClassName(className).appendChild(this.element);
            return this;
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            return this.constructor.name;
        }
    }, {
        key: 'element',
        get: function get() {
            return this._element;
        },
        set: function set(element) {
            this._element = this.createElement(element);
        }
    }, {
        key: 'attributes',
        get: function get() {
            return this.element.attributes;
        }
    }, {
        key: 'width',
        set: function set(width) {
            this.element.setAttribute('style', 'width: '.concat(width));
            return this;
        }
    }, {
        key: 'height',
        set: function set(height) {
            this.element.setAttribute('style', 'height: '.concat(height));
            return this;
        }
    }, {
        key: 'border',
        set: function set() {
            var border = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1px solid black';

            this.element.setAttribute('style', 'border: '.concat(border));
            return this;
        }
    }]);

    return WElement;
}();

exports.default = WElement;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _WElement2 = require('../elements/WElement.js');

var _WElement3 = _interopRequireDefault(_WElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WImage = function (_WElement) {
    _inherits(WImage, _WElement);

    function WImage(src) {
        _classCallCheck(this, WImage);

        var _this = _possibleConstructorReturn(this, (WImage.__proto__ || Object.getPrototypeOf(WImage)).call(this, 'img'));

        if (src) _this.setSrc(src);
        return _this;
    }

    _createClass(WImage, [{
        key: 'getImage',
        value: function getImage() {
            return this._image;
        }
    }, {
        key: 'setSrc',
        value: function setSrc(src) {
            this._src = _get(WImage.prototype.__proto__ || Object.getPrototypeOf(WImage.prototype), 'setAttribute', this).call(this, 'src', src);
        }
    }, {
        key: 'getSrc',
        value: function getSrc(src) {
            return this._src;
        }
    }]);

    return WImage;
}(_WElement3.default);

exports.default = WImage;

},{"../elements/WElement.js":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Type = {
    'FILL': 'fill',
    'STROKE': 'stroke',
    'CLEAR': 'clear'
};

exports.default = Type;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.eventFallMove = function () {
    if (this.context) {
        var $this = this;
        var ctx = $this.context;

        $this.running = false;

        var raf;

        $this.start = function () {
            $this.running = true;
            $this.draw().toX($this.x).toY($this.y);

            $this.x += $this.vx;
            $this.y += $this.vy;
            $this.vy *= .99;
            $this.vy += .25;

            if ($this.y + $this.vy > $this.element.height || $this.y + $this.vy < 0) {
                $this.vy = -$this.vy;
            }

            if ($this.x + $this.vx > $this.element.width || $this.x + $this.vx < 0) {
                $this.vx = -$this.vx;
            }
            raf = window.requestAnimationFrame($this.start);
        };

        $this.stop = function () {
            $this.running = false;
            window.cancelAnimationFrame(raf);
        };

        return $this;
    }
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Object.prototype.eventMouseFollow = function () {
    var _this = this;

    if (this.context) {
        var $this;
        var ctx;

        var _ret = function () {
            var clear = function clear() {
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fillRect(0, 0, $this.element.width, $this.element.height);
            };

            $this = _this;
            ctx = $this.context;


            $this.element.addEventListener('mousemove', function (e) {
                if (!$this.running) {
                    clear();
                    $this.x = e.clientX;
                    $this.y = e.clientY;
                    $this.draw();
                }
            });

            $this.element.addEventListener('click', function (e) {
                if (!$this.running) {
                    $this.start();
                } else {
                    $this.stop();
                }
            });

            return {
                v: $this
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
};

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Evento de objeto se movendo na tela.
 * Têm-se o x, y, vx, vy.
 * Objeto se move de acordo com x e y.
 * Utiliza-se vx e vy para somar as váriaveis de posição.
 * Quando se objeto chega ao limite do canvas, nega-se o vx e vy para
 * inverter a soma, fazendo com que o x e y decremente, e ao retornar
 * inverte-se novamente para o x e y incrementar, movendo assim o objeto
 * em sentidos opostos. 
 */
exports.default = Object.prototype.eventRandomOne = function () {
    var _this = this;

    if (this.context) {
        var $this;
        var ctx;
        var raf;

        var _ret = function () {
            var draw = function draw() {
                $this.draw().toX($this.x).toY($this.y);

                $this.x += $this.vx;
                $this.y += $this.vy;

                if ($this.y + $this.vy > $this.element.height || $this.y + $this.vy < 0) {
                    $this.vy = -$this.vy;
                }

                if ($this.x + $this.vx > $this.element.width || $this.x + $this.vx < 0) {
                    $this.vx = -$this.vx;
                }
                raf = window.requestAnimationFrame(draw);
            };

            $this = _this;
            ctx = $this.context;


            draw();
            return {
                v: $this
            };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }
};

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.createBall = function (x, y) {
    if (this.context) {
        var $this = this;
        $this.x = x;
        $this.y = y;
        $this.vx = 5;
        $this.vy = 2;
        $this.radius = 25;
        $this.color = 'blue';
        $this.draw = function () {
            $this.clearRect(0, 0, $this.element.width, $this.element.height);
            $this.context.beginPath();
            $this.context.arc($this.x, $this.y, $this.radius, 0, Math.PI * 2, true);
            $this.context.closePath();
            $this.context.fillStyle = $this.color;
            $this.context.fill();
            return $this;
        };
        $this.toX = function (x) {
            $this.x = x;
            return $this;
        };
        $this.toY = function (y) {
            $this.y = y;
            return $this;
        };

        return $this;
    }
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.createBallShadow = function (x, y) {
    if (this.context) {
        var $this = this;
        $this.x = x;
        $this.y = y;
        $this.vx = 5;
        $this.vy = 2;
        $this.radius = 25;
        $this.color = 'blue';
        $this.draw = function () {
            $this.fillStyle('rgba(255,255,255,0.3)');
            $this.fillRect(0, 0, $this.element.width, $this.element.height);
            $this.context.beginPath();
            $this.context.arc($this.x, $this.y, $this.radius, 0, Math.PI * 2, true);
            $this.context.closePath();
            $this.context.fillStyle = $this.color;
            $this.context.fill();
            return $this;
        };
        $this.toX = function (x) {
            $this.x = x;
            return $this;
        };
        $this.toY = function (y) {
            $this.y = y;
            return $this;
        };

        $this.draw();

        return $this;
    }
};

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.createBallon = function () {
    if (this.context) {
        var ctx = this.context;

        ctx.beginPath();
        ctx.moveTo(75, 25);
        ctx.quadraticCurveTo(25, 25, 25, 62.5);
        ctx.quadraticCurveTo(25, 100, 50, 100);
        ctx.quadraticCurveTo(50, 120, 30, 125);
        ctx.quadraticCurveTo(60, 120, 65, 100);
        ctx.quadraticCurveTo(125, 100, 125, 62.5);
        ctx.quadraticCurveTo(125, 25, 75, 25);
        ctx.stroke();
        return this;
    }
};

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Object.prototype.createClockOne = function () {
    var _this = this;

    if (this.context) {
        var ctx;

        var _ret = function () {
            var clock = function clock() {
                var now = new Date();
                ctx.save();
                ctx.clearRect(0, 0, 150, 150);
                ctx.translate(75, 75);
                ctx.scale(0.4, 0.4);
                ctx.rotate(-Math.PI / 2);
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.lineWidth = 8;
                ctx.lineCap = "round";

                // Hour marks
                ctx.save();
                for (var i = 0; i < 12; i++) {
                    ctx.beginPath();
                    ctx.rotate(Math.PI / 6);
                    ctx.moveTo(100, 0);
                    ctx.lineTo(120, 0);
                    ctx.stroke();
                }
                ctx.restore();

                // Minute marks
                ctx.save();
                ctx.lineWidth = 5;
                for (i = 0; i < 60; i++) {
                    if (i % 5 != 0) {
                        ctx.beginPath();
                        ctx.moveTo(117, 0);
                        ctx.lineTo(120, 0);
                        ctx.stroke();
                    }
                    ctx.rotate(Math.PI / 30);
                }
                ctx.restore();

                var sec = now.getSeconds();
                var min = now.getMinutes();
                var hr = now.getHours();
                hr = hr >= 12 ? hr - 12 : hr;

                ctx.fillStyle = "black";

                // write Hours
                ctx.save();
                ctx.rotate(hr * (Math.PI / 6) + Math.PI / 360 * min + Math.PI / 21600 * sec);
                ctx.lineWidth = 14;
                ctx.beginPath();
                ctx.moveTo(-20, 0);
                ctx.lineTo(80, 0);
                ctx.stroke();
                ctx.restore();

                // write Minutes
                ctx.save();
                ctx.rotate(Math.PI / 30 * min + Math.PI / 1800 * sec);
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(-28, 0);
                ctx.lineTo(112, 0);
                ctx.stroke();
                ctx.restore();

                // Write seconds
                ctx.save();
                ctx.rotate(sec * Math.PI / 30);
                ctx.strokeStyle = "#D40000";
                ctx.fillStyle = "#D40000";
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(-30, 0);
                ctx.lineTo(83, 0);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
                ctx.stroke();
                ctx.fillStyle = "rgba(0,0,0,0)";
                ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.restore();

                ctx.beginPath();
                ctx.lineWidth = 14;
                ctx.strokeStyle = '#325FA2';
                ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
                ctx.stroke();

                ctx.restore();

                window.requestAnimationFrame(clock);
            };

            ctx = _this.context;


            window.requestAnimationFrame(clock);
            return {
                v: _this
            };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }
};

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Object.prototype.createHeart = function () {
    if (this.context) {
        var ctx = this.context;

        ctx.beginPath();
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fill();
        return this;
    }
};

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _WCanvas2 = require('../elements/WCanvas');

var _WCanvas3 = _interopRequireDefault(_WCanvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var World = function (_WCanvas) {
    _inherits(World, _WCanvas);

    function World() {
        _classCallCheck(this, World);

        return _possibleConstructorReturn(this, (World.__proto__ || Object.getPrototypeOf(World)).call(this));
    }

    return World;
}(_WCanvas3.default);

exports.default = World;

},{"../elements/WCanvas":3}]},{},[1]);
