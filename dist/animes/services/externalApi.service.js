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
exports.ExternalApiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
const redis_1 = require("../../redis");
const jikanAPI = 'https://api.jikan.moe/v3';
const animeChan = 'https://animechan.vercel.app/api/random';
let ExternalApiService = class ExternalApiService {
    constructor(redisCacheService, httpService) {
        this.redisCacheService = redisCacheService;
        this.httpService = httpService;
    }
    getAnimeByTitleOnJikan(title) {
        const data = this.httpService
            .get(`${jikanAPI}/search/anime?q=${title}`)
            .pipe((0, operators_1.map)((response) => {
            return response.data.results.map((anime) => {
                const year = new Date(anime.start_date).getFullYear();
                return Object.assign(Object.assign({}, anime), { year });
            });
        }));
        return data;
    }
    getAnimeByIdOnJikan(id) {
        const data = this.httpService.get(`${jikanAPI}/anime/${id}`).pipe((0, operators_1.map)((response) => {
            const result = response.data;
            const year = new Date(result.aired.from).getFullYear();
            const synopsis = result.synopsis.replace('[Written by MAL Rewrite]', '');
            const anime = Object.assign(Object.assign({}, result), { year, synopsis });
            return anime;
        }));
        return data;
    }
    getRandomId() {
        const date = Math.floor(+new Date() / 1000);
        const myRandomFunctionAnime = date.toString().slice(4, 13).split('');
        const newArray = myRandomFunctionAnime
            .slice(1, 6)
            .map((x) => parseInt(x, 10));
        const sum = newArray.reduce(function (sum, i) {
            return sum + i;
        });
        const id = this.httpService
            .get(`${jikanAPI}/top/anime/${myRandomFunctionAnime[0]}/tv`)
            .pipe((0, operators_1.map)((response) => parseInt(response.data.top[sum].mal_id.toString(), 10)));
        return id;
    }
    getQuote() {
        const data = this.httpService
            .get(animeChan)
            .pipe((0, operators_1.map)((response) => response.data));
        return data;
    }
    async getTopAiring() {
        const cached = await this.redisCacheService.get('airing');
        if (cached) {
            return cached;
        }
        const data = this.httpService.get(`${jikanAPI}/top/anime/1/airing`).pipe((0, operators_1.map)((response) => response.data.top.slice(0, 5)), (0, operators_1.tap)((ranking) => this.redisCacheService.set('airing', ranking, 60 * 60 * 24)));
        return data;
    }
    async getTopPopular() {
        const cached = await this.redisCacheService.get('popular');
        if (cached) {
            return cached;
        }
        const data = this.httpService
            .get(`${jikanAPI}/top/anime/1/bypopularity`)
            .pipe((0, operators_1.map)((response) => response.data.top.slice(0, 5)), (0, operators_1.tap)((ranking) => this.redisCacheService.set('popular', ranking, 60 * 60 * 24)));
        return data;
    }
};
ExternalApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_1.RedisCacheService,
        axios_1.HttpService])
], ExternalApiService);
exports.ExternalApiService = ExternalApiService;
//# sourceMappingURL=externalApi.service.js.map