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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimesService = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const _1 = require("./");
const sonic_1 = require("../../sonic");
const redis_1 = require("../../redis");
let AnimesService = class AnimesService {
    constructor(redisCacheService, externalService, databaseService, sonicService) {
        this.redisCacheService = redisCacheService;
        this.externalService = externalService;
        this.databaseService = databaseService;
        this.sonicService = sonicService;
    }
    async getAnimeByTitle(title) {
        const cached = await this.redisCacheService.get(title);
        if (cached) {
            return cached;
        }
        const animeResults = await this.sonicService.getAnimeForSonic(title);
        if (animeResults.length < 1) {
            return this.externalService.getAnimeByTitleOnJikan(title).pipe((0, operators_1.mergeMap)((response) => {
                return response.slice(0, 5).map((anime) => {
                    return this.externalService.getAnimeByIdOnJikan(anime.mal_id).pipe((0, operators_1.map)(async (anime) => {
                        const newAnime = await this.databaseService.createInDatabases(anime);
                        this.redisCacheService.set(title, newAnime, 60 * 60 * 24);
                        return newAnime;
                    }), (0, operators_1.concatAll)());
                });
            }), (0, operators_1.concatAll)(), (0, operators_1.toArray)());
        }
        else {
            await this.redisCacheService.set(title, animeResults, 60 * 60 * 24);
            return animeResults;
        }
    }
    async getRandomAnime() {
        const cached = await this.redisCacheService.get('random');
        if (cached) {
            return cached;
        }
        const randomAnime = this.externalService.getRandomId().pipe((0, operators_1.map)((id) => this.externalService.getAnimeByIdOnJikan(id)), (0, operators_1.concatAll)(), (0, operators_1.map)((anime) => this.databaseService.createInDatabases(anime)), (0, operators_1.concatAll)(), (0, operators_1.tap)((anime) => this.redisCacheService.set('random', anime, 36)));
        return randomAnime;
    }
};
AnimesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_1.RedisCacheService,
        _1.ExternalApiService,
        _1.DatabaseService,
        sonic_1.SonicService])
], AnimesService);
exports.AnimesService = AnimesService;
//# sourceMappingURL=animes.service.js.map