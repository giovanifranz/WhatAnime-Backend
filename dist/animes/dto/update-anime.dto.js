"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnimeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_anime_dto_1 = require("./create-anime.dto");
class UpdateAnimeDto extends (0, mapped_types_1.PartialType)(create_anime_dto_1.CreateAnimeDto) {
}
exports.UpdateAnimeDto = UpdateAnimeDto;
//# sourceMappingURL=update-anime.dto.js.map