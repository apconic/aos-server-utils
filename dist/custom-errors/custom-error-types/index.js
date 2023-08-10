"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = exports.ResourceNotFoundError = exports.InvalidSchemaError = void 0;
var invalid_schema_error_1 = require("./invalid-schema-error");
Object.defineProperty(exports, "InvalidSchemaError", { enumerable: true, get: function () { return invalid_schema_error_1.InvalidSchemaError; } });
var resource_not_found_error_1 = require("./resource-not-found-error");
Object.defineProperty(exports, "ResourceNotFoundError", { enumerable: true, get: function () { return resource_not_found_error_1.ResourceNotFoundError; } });
var access_denied_error_1 = require("./access-denied-error");
Object.defineProperty(exports, "AccessDeniedError", { enumerable: true, get: function () { return access_denied_error_1.AccessDeniedError; } });
