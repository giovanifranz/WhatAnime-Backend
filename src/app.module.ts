import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { DatabaseModule } from "./database/database.module";
import { AnimesModule } from "./http/http.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        redact: {
          remove: true,
          paths: ["pid", "responseTime", "res.headers", "req.headers"],
        },
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      },
    }),
    DatabaseModule,
    AnimesModule,
  ],
})
export class AppModule {}
