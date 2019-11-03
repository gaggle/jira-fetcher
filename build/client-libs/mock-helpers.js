"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const dree_1 = require("dree");
const fixturePath = path_1.join(__dirname, "..", "..", "test", "fixtures", "jira");
const api2Path = path_1.join("rest", "api", "2");
function readJson(path) {
    const basePath = path_1.join(fixturePath, api2Path);
    let fixtureBuffer;
    try {
        fixtureBuffer = fs_1.readFileSync(path_1.join(basePath, path));
    }
    catch (err) {
        const splitted = path.split(path_1.sep);
        const pathRoot = splitted[0];
        const pathMinusLast = path_1.join(...splitted.slice(0, splitted.length - 1));
        const tree = dree_1.parse(path_1.join(basePath, pathRoot), { depth: 1 });
        throw `No fixture for '${pathMinusLast}', available fixtures:\n${tree}`;
    }
    return JSON.parse(fixtureBuffer.toString());
}
exports.readJson = readJson;
//# sourceMappingURL=mock-helpers.js.map