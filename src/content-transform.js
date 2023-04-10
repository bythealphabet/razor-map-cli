"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTransform = void 0;
var find_1 = require("./find");
var stream_1 = require("stream");
var ContentTransform = /** @class */ (function (_super) {
    __extends(ContentTransform, _super);
    function ContentTransform(callback) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.buffer = '';
        return _this;
    }
    ContentTransform.prototype._transform = function (chunk, encoding, callback) {
        this.buffer += chunk.toString();
        callback();
    };
    ContentTransform.prototype._flush = function (callback) {
        var partials = (0, find_1.findPartials)(this.buffer);
        this.callback(partials);
        callback();
    };
    return ContentTransform;
}(stream_1.Transform));
exports.ContentTransform = ContentTransform;
