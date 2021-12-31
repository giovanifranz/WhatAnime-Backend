"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("@nestjs/axios");
const redis_1 = require("../redis");
const sonic_1 = require("../sonic");
const animes_service_1 = require("./services/animes.service");
const services_1 = require("./services");
const animes_controller_1 = require("./animes.controller");
const anime_entity_1 = require("./entities/anime.entity");
let AnimesModule = class AnimesModule {
};
AnimesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            sonic_1.SonicModule,
            redis_1.RedisCacheModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Anime', schema: anime_entity_1.AnimeSchema }]),
        ],
        controllers: [animes_controller_1.AnimesController],
        providers: [animes_service_1.AnimesService, services_1.DatabaseService, services_1.ExternalApiService, sonic_1.SonicService],
    })
], AnimesModule);
exports.AnimesModule = AnimesModule;
//# sourceMappingURL=animes.module.js.map