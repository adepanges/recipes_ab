/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
exports.__esModule = true;
const shell = require("shelljs");

shell.mkdir("-p", "dist/public");
shell.mkdir("-p", "dist/resources/views");

shell.cp("-R", "src/resources/frontend/dist/*", "dist/public");
shell.cp("src/resources/frontend/dist/index.html", "dist/resources/views");