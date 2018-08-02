"use strict";
/**
 * Created by imamudinnaseem on 8/2/18
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
function default_1(...args) {
    if (!config_1.default.disableLogging) {
        console.log.apply(null, args);
    }
}
exports.default = default_1;
//# sourceMappingURL=log.js.map