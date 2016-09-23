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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", function () {
    var world = new _World2.default();
    // document.body.appendChild(world.getCanvas())
    var img = new _Image2.default();
    img.setSize(500, 500);
    document.body.appendChild(img.getImage());
});

},{"./elements/Image":4,"./world/World":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
    function Element(element) {
        _classCallCheck(this, Element);

        this._element = document.createElement(element);
    }

    _createClass(Element, [{
        key: "getElement",
        value: function getElement() {
            return this._element;
        }
    }, {
        key: "getAttributes",
        value: function getAttributes() {
            return this._element.attributes;
        }
    }]);

    return Element;
}();

exports.default = Element;

},{}],4:[function(require,module,exports){
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

    function Image() {
        _classCallCheck(this, Image);

        var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, 'img'));

        _this._image = _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), 'getElement', _this).call(_this);
        _this._image.style.height = 200;
        _this._image.style.width = 200;
        _this._image.src = "https://media.licdn.com/media/AAEAAQAAAAAAAANbAAAAJDE5NjBkNDk1LTY3ZGQtNDA0NS04YTJiLTdkNmU3NjZiNjI3Mg.png";
        return _this;
    }

    _createClass(Image, [{
        key: 'getImage',
        value: function getImage() {
            return this._image;
        }
    }, {
        key: 'setSize',
        value: function setSize(width, height) {
            this._image.style.height = height;
            this._image.style.width = width;
        }
    }]);

    return Image;
}(_Element3.default);

exports.default = Image;

},{"../elements/Element.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
    function Canvas() {
        _classCallCheck(this, Canvas);

        this._canvas = document.createElement('canvas');
        this._canvas.style.height = 200;
        this._canvas.style.width = 200;
        this._canvas.setAttribute('width', 200);
        this._canvas.style.border = '1px solid black';
    }

    _createClass(Canvas, [{
        key: 'setHeight',
        value: function setHeight(height) {
            this._canvas.style.height = height;
        }
    }, {
        key: 'setWidth',
        value: function setWidth(width) {
            this._canvas.style.width = width;
        }
    }, {
        key: 'setBorder',
        value: function setBorder(border) {
            this._canvas.style.border = border;
        }
    }, {
        key: 'appendCanvas',
        value: function appendCanvas(parent) {
            parent.appendChild(this.canvas);
        }
    }, {
        key: 'getCanvas',
        value: function getCanvas() {
            return this._canvas;
        }
    }]);

    return Canvas;
}();

;

exports.default = Canvas;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Canvas2 = require('../world/Canvas');

var _Canvas3 = _interopRequireDefault(_Canvas2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var World = function (_Canvas) {
    _inherits(World, _Canvas);

    function World() {
        _classCallCheck(this, World);

        console.log('World');
        return _possibleConstructorReturn(this, (World.__proto__ || Object.getPrototypeOf(World)).call(this));
    }

    return World;
}(_Canvas3.default);

exports.default = World;

},{"../world/Canvas":5}]},{},[1]);
