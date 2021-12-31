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
exports.AnimesController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const sonic_1 = require("../sonic");
let AnimesController = class AnimesController {
    constructor(animesService, sonicService, externalApiService) {
        this.animesService = animesService;
        this.sonicService = sonicService;
        this.externalApiService = externalApiService;
    }
    async getAnimeByTitle(title) {
        return await this.animesService.getAnimeByTitle(title);
    }
    async getRandomAnime() {
        return await this.animesService.getRandomAnime();
    }
    async getAnimeForSonic(reqParam) {
        return await this.sonicService.getAnimeForSonic(reqParam);
    }
    async getSuggestForSonic(reqParam) {
        return await this.sonicService.getSuggestForSonic(reqParam);
    }
    async getTopAiring() {
        return await this.externalApiService.getTopAiring();
    }
    async getTopPopular() {
        return await this.externalApiService.getTopPopular();
    }
};
__decorate([
    (0, common_1.Get)('/title/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnimesController.prototype, "getAnimeByTitle", null);
__decorate([
    (0, common_1.Get)('/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimesController.prototype, "getRandomAnime", null);
__decorate([
    (0, common_1.Get)('/sonic?'),
    __param(0, (0, common_1.Query)('param')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnimesController.prototype, "getAnimeForSonic", null);
__decorate([
    (0, common_1.Get)('/suggest?'),
    __param(0, (0, common_1.Query)('param')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnimesController.prototype, "getSuggestForSonic", null);
__decorate([
    (0, common_1.Get)('/airing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimesController.prototype, "getTopAiring", null);
__decorate([
    (0, common_1.Get)('/popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimesController.prototype, "getTopPopular", null);
AnimesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [services_1.AnimesService,
        sonic_1.SonicService,
        services_1.ExternalApiService])
], AnimesController);
exports.AnimesController = AnimesController;
//# sourceMappingURL=animes.controller.js.map