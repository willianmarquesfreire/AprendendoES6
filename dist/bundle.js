(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _app = require("./src/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./src/app.js":2}],2:[function(require,module,exports){
"use strict";

var _World = require("./world/World.js");

var _World2 = _interopRequireDefault(_World);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", function () {
    var world = new _World2.default();
    document.body.appendChild(world.getCanvas());
});

},{"./world/World.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
    function Canvas() {
        _classCallCheck(this, Canvas);

        console.log(document.body);
        this._canvas = document.createElement('canvas');
        this._canvas.style.height = 200;
        this._canvas.style.width = 200;
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Canvas2 = require('../world/Canvas.js');

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

},{"../world/Canvas.js":3}]},{},[1]);
