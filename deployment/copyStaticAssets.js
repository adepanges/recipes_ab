/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
exports.__esModule = true;
const shell = require("shelljs");

shell.mkdir("-p", "dist/public");
shell.mkdir("-p", "dist/resources/views");

// copy all vue assets
shell.cp("-R", "src/resources/frontend/dist/*", "dist/public");

// copy for views render by express
shell.cp("src/resources/views/400.njk", "dist/resources/views");
shell.cp("src/resources/views/500.njk", "dist/resources/views");
shell.cp("src/resources/frontend/dist/index.html", "dist/resources/views");