"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFiles = exports.findPartials = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function findPartials(fileContent) {
    var regex = /Html.PartialAsync\("(.*?)"\)/g;
    var matches = fileContent.matchAll(regex);
    return Array.from(matches, function (m) { return m[1]; });
}
exports.findPartials = findPartials;
function findFiles(root, extension) {
    var files = [];
    var traverse = function (dir) {
        var entries = fs_1.default.readdirSync(dir, { withFileTypes: true });
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            var fullPath = path_1.default.join(dir, entry.name);
            if (entry.isDirectory()) {
                traverse(fullPath);
            }
            else if (entry.isFile() && entry.name.endsWith(extension)) {
                files.push(fullPath);
            }
        }
    };
    traverse(root);
    return files;
}
exports.findFiles = findFiles;
