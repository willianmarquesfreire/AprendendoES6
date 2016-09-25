(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _app = require("./src/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./src/app.js":2}],2:[function(require,module,exports){
'use strict';

var _World = require('./world/World');

var _World2 = _interopRequireDefault(_World);

var _Image = require('./elements/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Canvas = require('./elements/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Enums = require('./enums/Enums');

var _Enums2 = _interopRequireDefault(_Enums);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", function () {
    var world = new _World2.default();
    world.addToBody();
    console.log(world.getElement().getContext('2d'));
    world.drawLine(0, 0, 100, 100);
    world.drawSquare(10, 10, 20, 20);
    // world.drawTriangle(100,100,50,150,150,150)
    world.drawTriangleByDimension(100, 100, 40);

    var img = new _Image2.default("https://media.licdn.com/media/AAEAAQAAAAAAAANbAAAAJDE5NjBkNDk1LTY3ZGQtNDA0NS04YTJiLTdkNmU3NjZiNjI3Mg.png");
    world.addChild(img.getElement());

    console.log(_Enums2.default);

    // document.body.appendChild(new Canvas().getElement())
});

},{"./elements/Canvas":3,"./elements/Image":5,"./enums/Enums":6,"./world/World":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element2 = require('./Element');

var _Element3 = _interopRequireDefault(_Element2);

var _Type = require('../enums/Type');

var _Type2 = _interopRequireDefault(_Type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas = function (_Element) {
    _inherits(Canvas, _Element);

    function Canvas() {
        _classCallCheck(this, Canvas);

        var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, 'canvas'));

        _this._context = _this.getContext2D();
        return _this;
    }

    _createClass(Canvas, [{
        key: 'getContext',
        value: function getContext() {
            return this._context;
        }
    }, {
        key: 'setContext',
        value: function setContext(ctx) {
            return this._context = this.getContext(ctx);
        }
    }, {
        key: 'getContext2D',
        value: function getContext2D() {
            return this.getElement().getContext('2d');
        }
    }, {
        key: 'getContext3D',
        value: function getContext3D() {
            return this.getElement().getContext('3d');
        }
    }, {
        key: 'drawLine',
        value: function drawLine(beginX, beginY, endX, endY) {
            this.moveTo(beginX, beginY);
            this.lineTo(endX, endY);
            this.stroke();
        }
    }, {
        key: 'drawSquare',
        value: function drawSquare(x, y, width, height, type) {
            switch (type) {
                case 'stroke':
                    this.strokeRect(x, y, width, height, type);
                    break;
                case 'clear':
                    this.clearRect(x, y, width, height, type);
                    break;
                default:
                    this.fillRect(x, y, width, height, type);
            }
        }
    }, {
        key: 'drawTriangle',
        value: function drawTriangle(x, y, x1, y1, x2, y2, type) {
            this.beginPath();
            this.moveTo(x, y);
            this.lineTo(x1, y1);
            this.lineTo(x2, y2);

            switch (type) {
                case _Type2.default.STROKE:
                    this.stroke();
                    break;
                case _Type2.default.CLEAR:
                    this.clear();
                    break;
                default:
                    this.fill();
            }
        }
    }, {
        key: 'drawTriangleByDimension',
        value: function drawTriangleByDimension(x, y, dimension, type) {
            this.beginPath();
            this.moveTo(x, y);
            this.lineTo(x - dimension, y + dimension);
            this.lineTo(x + dimension, y + dimension);

            switch (type) {
                case _Type2.default.STROKE:
                    this.stroke();
                    break;
                case _Type2.default.CLEAR:
                    this.clear();
                    break;
                default:
                    this.fill();
            }
        }
    }, {
        key: 'fillRect',
        value: function fillRect(x, y, width, height, type) {
            this.getContext().fillRect(x, y, width, height, type);
        }
    }, {
        key: 'lineTo',
        value: function lineTo(x, y) {
            this.getContext().lineTo(x, y);
        }
    }, {
        key: 'moveTo',
        value: function moveTo(x, y) {
            this.getContext().moveTo(x, y);
        }
    }, {
        key: 'beginPath',
        value: function beginPath() {
            return this.getContext().beginPath();
        }
    }, {
        key: 'closePath',
        value: function closePath() {
            return this.getContext().closePath();
        }
    }, {
        key: 'stroke',
        value: function stroke() {
            return this.getContext().stroke();
        }
    }, {
        key: 'fill',
        value: function fill() {
            return this.getContext().fill();
        }
    }, {
        key: 'clear',
        value: function clear() {
            return this.getContext().clear();
        }
    }]);

    return Canvas;
}(_Element3.default);

exports.default = Canvas;

},{"../enums/Type":7,"./Element":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
    function Element(element, width, height, border) {
        _classCallCheck(this, Element);

        this.setElement(element);
        this.setWidth(width);
        this.setHeight(height);
        this.setBorder(border);
        console.log(this.getClassName().concat(' Created!'));
    }

    _createClass(Element, [{
        key: 'createElement',
        value: function createElement(element) {
            return document.createElement(element);
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this._element;
        }
    }, {
        key: 'setElement',
        value: function setElement(element) {
            this._element = this.createElement(element);
        }
    }, {
        key: 'getAttributes',
        value: function getAttributes() {
            return this.getElement().attributes;
        }
    }, {
        key: 'setAttribute',
        value: function setAttribute(attr, value) {
            this.getElement().setAttribute(attr, value);
        }
    }, {
        key: 'setStyle',
        value: function setStyle(attr, value) {
            this.setAttibute('style', attr + ': ' + value);
        }
    }, {
        key: 'setSize',
        value: function setSize(width, height) {
            this.setWidth(width);
            this.setHeight(height);
        }
    }, {
        key: 'setWidth',
        value: function setWidth() {
            var width = arguments.length <= 0 || arguments[0] === undefined ? 200 : arguments[0];

            this.getElement().setAttribute('style', 'width: '.concat(width));
            return this.getElement();
        }
    }, {
        key: 'setHeight',
        value: function setHeight() {
            var height = arguments.length <= 0 || arguments[0] === undefined ? 200 : arguments[0];

            this.getElement().setAttribute('style', 'height: '.concat(height));
            return this.getElement();
        }
    }, {
        key: 'setBorder',
        value: function setBorder() {
            var border = arguments.length <= 0 || arguments[0] === undefined ? '1px solid black' : arguments[0];

            this.getElement().setAttribute('style', 'border: '.concat(border));
            return this.getElement();
        }
    }, {
        key: 'addChild',
        value: function addChild(child) {
            this.getElement().appendChild(child);
            return this.getElement();
        }
    }, {
        key: 'addToBody',
        value: function addToBody() {
            document.body.appendChild(this.getElement());
            return this.getElement();
        }
    }, {
        key: 'addToElementById',
        value: function addToElementById(id) {
            document.getElementById(id).appendChild(this.getElement());
            return this.getElement();
        }
    }, {
        key: 'addToElementByClassName',
        value: function addToElementByClassName(className) {
            document.getElementsByClassName(className).appendChild(this.getElement());
            return this.getElement();
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            return this.constructor.name;
        }
    }]);

    return Element;
}();

exports.default = Element;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Element2 = require('../elements/Element.js');

var _Element3 = _interopRequireDefault(_Element2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_Element) {
    _inherits(Image, _Element);

    function Image(src) {
        _classCallCheck(this, Image);

        var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, 'img'));

        _this.setSrc(src);
        return _this;
    }

    _createClass(Image, [{
        key: 'getImage',
        value: function getImage() {
            return this._image;
        }
    }, {
        key: 'setSrc',
        value: function setSrc(src) {
            this._src = _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), 'setAttribute', this).call(this, 'src', src);
        }
    }, {
        key: 'getSrc',
        value: function getSrc(src) {
            return this._src;
        }
    }]);

    return Image;
}(_Element3.default);

exports.default = Image;

},{"../elements/Element.js":4}],6:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Canvas2 = require('../elements/Canvas');

var _Canvas3 = _interopRequireDefault(_Canvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var World = function (_Canvas) {
    _inherits(World, _Canvas);

    function World() {
        _classCallCheck(this, World);

        return _possibleConstructorReturn(this, (World.__proto__ || Object.getPrototypeOf(World)).call(this));
    }

    return World;
}(_Canvas3.default);

exports.default = World;

},{"../elements/Canvas":3}]},{},[1]);