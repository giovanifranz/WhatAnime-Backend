"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sonicProviders = void 0;
const sonic_1 = require("./sonic");
exports.sonicProviders = [
    {
        provide: 'SONIC_CONNECTION',
        useFactory: async () => {
            sonic_1.sonicChannelIngest.connect({
                connected: () => {
                    console.log('Ingest Conectou');
                },
            });
            sonic_1.sonicChannelSearch.connect({
                connected: () => {
                    console.log('Search Conectou');
                },
            });
        },
    },
];
//# sourceMappingURL=sonic.providers.js.map