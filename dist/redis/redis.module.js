"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RedisCacheModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheModule = void 0;
const common_1 = require("@nestjs/common");
const redisStore = require("cache-manager-redis-store");
const redis_service_1 = require("./redis.service");
let RedisCacheModule = RedisCacheModule_1 = class RedisCacheModule {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
};
RedisCacheModule = RedisCacheModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.registerAsync({
                useFactory: () => {
                    return {
                        store: redisStore,
                        url: 'redis://:p8da6eb35e691d76feb1b2f2e68c121041b01a69a5eb7e3ea7bd2ff120256256c@ec2-54-208-245-31.compute-1.amazonaws.com:8490',
                    };
                },
            }),
        ],
        providers: [redis_service_1.RedisCacheService],
        exports: [RedisCacheModule_1, redis_service_1.RedisCacheService],
    }),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], RedisCacheModule);
exports.RedisCacheModule = RedisCacheModule;
//# sourceMappingURL=redis.module.js.map