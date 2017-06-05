import angular = require("angular");
import ShoppingProfileService = require("./ShoppingProfileService");

angular.module("services", [])
    .service("ShoppingProfileService", ShoppingProfileService);
