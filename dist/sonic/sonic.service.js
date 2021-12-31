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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SonicService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const sonic_1 = require("./sonic");
let SonicService = class SonicService {
    constructor(animeModel) {
        this.animeModel = animeModel;
    }
    async getAnimeForSonic(param) {
        const result = await sonic_1.sonicChannelSearch.query('anime-database', 'animes', param, { lang: 'eng' });
        const animeResults = [];
        for (let index = 0; index < result.length; index++) {
            animeResults.push(await this.animeModel.findById(result[index]).exec());
        }
        return animeResults;
    }
    async getSuggestForSonic(param) {
        const results = await sonic_1.sonicChannelSearch.suggest('anime-database', 'animes', param, { limit: 5 });
        const suggestResults = JSON.stringify(Object.assign({}, results));
        return suggestResults;
    }
};
SonicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Anime')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SonicService);
exports.SonicService = SonicService;
//# sourceMappingURL=sonic.service.js.map