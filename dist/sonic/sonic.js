"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sonicChannelSearch = exports.sonicChannelIngest = void 0;
const sonic_channel_1 = require("sonic-channel");
exports.sonicChannelIngest = new sonic_channel_1.Ingest({
    host: 'sonic',
    port: 1491,
    auth: 'SecretPassword',
});
exports.sonicChannelSearch = new sonic_channel_1.Search({
    host: 'sonic',
    port: 1491,
    auth: 'SecretPassword',
});
//# sourceMappingURL=sonic.js.map