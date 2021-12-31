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
exports.Top = exports.Ranking = exports.Quote = exports.AnimeByTitle = exports.AnimeSchema = exports.Anime = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Anime = class Anime {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Anime.prototype, "mal_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "image_url", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "synopsis", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Anime.prototype, "year", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Anime.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "title_english", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "title_japanese", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Anime.prototype, "episodes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "airedString", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "premiered", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({ name: { type: String, required: false } })),
    __metadata("design:type", Array)
], Anime.prototype, "studios", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Anime.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({ from: { type: String } })),
    __metadata("design:type", Object)
], Anime.prototype, "aired", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        Sequel: {
            type: [{ mald_id: { type: Number }, name: { type: String } }],
            required: false,
        },
        Prequel: {
            type: [{ mald_id: { type: Number }, name: { type: String } }],
            required: false,
        },
        Other: {
            type: [{ mald_id: { type: Number }, name: { type: String } }],
            required: false,
        },
        'Alternative version': {
            type: [{ mald_id: { type: Number }, name: { type: String } }],
            required: false,
        },
        'Side story': {
            type: [{ mald_id: { type: Number }, name: { type: String } }],
            required: false,
        },
    })),
    __metadata("design:type", Object)
], Anime.prototype, "related", void 0);
Anime = __decorate([
    (0, mongoose_1.Schema)()
], Anime);
exports.Anime = Anime;
exports.AnimeSchema = mongoose_1.SchemaFactory.createForClass(Anime);
class AnimeByTitle {
}
exports.AnimeByTitle = AnimeByTitle;
class Quote {
}
exports.Quote = Quote;
class Ranking {
}
exports.Ranking = Ranking;
class Top {
}
exports.Top = Top;
//# sourceMappingURL=anime.entity.js.map